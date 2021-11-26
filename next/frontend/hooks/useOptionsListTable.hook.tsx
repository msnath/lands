import FormContext from "@/contexts/Form.context";
import ApplicationFormAction from "@/redux/actions/ApplicationForm.action";
import ApiRoutes from "@/routes/ApiRoutes.route";
import React from "react";
import { useReduxDispatch, useReduxSelector } from "./useRedux.hook";

const useOptionsListTable = (table_name: string | undefined) => {
  const [options, setOptions] = React.useState<string[] | null>([]);
  const { pageIdx, sectionIdx } = React.useContext(FormContext);

  const state = useReduxSelector((state) => ({
    institute_id: state.ApplicationForm.institute_id,
    institute_name: state.ApplicationForm.institute_name,
    level_name: state.ApplicationForm.level_name,
    category_name: state.ApplicationForm.category_name,
    course_name: state.ApplicationForm.course_name,
    page_name: state.ApplicationForm.pages[pageIdx ?? 0]?.name,
    section:
      state.ApplicationForm.pages[pageIdx ?? 0]?.sections[sectionIdx ?? 0] ??
      null,
  }));

  const dispatch = useReduxDispatch();

  const updateOption = async (option: string) => {
    switch (table_name) {
      case "EducationLevel":
        if (state.page_name === "Pre-App") {
          dispatch(ApplicationFormAction.levelName(option));
        }
        break;

      case "EducationCategory":
        if (state.page_name === "Pre-App") {
          dispatch(ApplicationFormAction.categoryName(option));
        }
        break;

      case "Course": {
        if (state.page_name === "Pre-App") {
          dispatch(ApplicationFormAction.courseName(option));

          const res = await ApiRoutes.courses({
            format: ["fee_waiver_details"],
            filter: {
              institutes: { names: [state.institute_name] },
              courses: { names: [option] },
            },
          });

          const course_id = res[0]?.course?.id;
          dispatch(ApplicationFormAction.courseId(course_id ?? null));

          const feeWaiver = res[0]?.fee_waiver?.fee_waivers?.[0];
          if (state.page_name !== "Pre-App") break;
          dispatch(ApplicationFormAction.feeWaiverId(feeWaiver?.id ?? null));
          dispatch(ApplicationFormAction.feeWaiverName(feeWaiver?.name ?? ""));
        }
        break;
      }
    }
  };

  React.useEffect(() => {
    const searchAPI = async () => {
      switch (table_name) {
        case "EducationLevel": {
          if (state.institute_id) {
            const res = await ApiRoutes.institutes({
              format: ["course_stats"],
              filter: { institutes: { ids: [state.institute_id] } },
            });
            if (res[0]) {
              const levels = (res[0].course?.stats?.level_count ?? []).map(
                (l) => l.level.name
              );
              setOptions(levels);
            }
          } else {
            setOptions([]);
          }
          break;
        }

        case "EducationCategory": {
          if (state.institute_id) {
            const res = await ApiRoutes.institutes({
              format: ["course_stats"],
              filter: { institutes: { ids: [state.institute_id] } },
            });
            if (res[0]) {
              const categories = (
                res[0].course?.stats?.category_count ?? []
              ).map((l) => l.category.name);
              setOptions(categories);
            }
          } else {
            setOptions([]);
          }
          break;
        }

        case "Country": {
          const res = await ApiRoutes.countries();
          const countries = res.map((c) => c.country.name);
          setOptions(countries);
          break;
        }

        case "Course": {
          if (state.institute_id && state.level_name) {
            const res = await ApiRoutes.courses({
              filter: {
                institutes: { ids: [state.institute_id] },
                education_levels: { names: [state.level_name] },
                course_categories: state.category_name
                  ? { names: [state.category_name] }
                  : undefined,
              },
              pagination: { limit: "ALL" },
            });
            const courses = res.map((c) => c.course.name);
            setOptions(courses);
          } else {
            setOptions([]);
          }
          break;
        }

        default:
          setOptions(null);
      }
    };
    searchAPI();
  }, [
    table_name,
    state.institute_id,
    state.level_name,
    state.category_name,
    state.course_name,
    state.section,
  ]);

  let country_name = "";
  for (const row of state.section?.fields ?? []) {
    for (const field of row) {
      if (field.name.toLowerCase().includes("country")) {
        country_name = field.values[0];
      }
    }
  }

  React.useEffect(() => {
    const searchAPI = async () => {
      switch (table_name) {
        case "Cities": {
          if (country_name) {
            const cities = await ApiRoutes.cities(country_name);
            setOptions(cities);
          }
          break;
        }
      }
    };
    searchAPI();
  }, [country_name, table_name]);

  return [options, updateOption] as const;
};

export default useOptionsListTable;
