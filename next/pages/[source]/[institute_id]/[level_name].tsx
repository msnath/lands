import { Codes, Exception } from "$/types/error.type";
import ApiRoutes from "@/routes/ApiRoutes.route";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Layout from "@/components/atoms/Layout/Layout.styled";
import { TApiFormPage } from "$/types/form.type";
import Section from "@/components/molecules/Section/Section";
import FieldRow from "@/components/molecules/FieldRow/FieldRow";
import S from "@/styles/ApplicationFormPage.styled";
import Divider from "@/components/atoms/Divider/Divider.styled";
import FormNav from "@/components/molecules/FormNav/FormNav";
import { useRouter } from "next/dist/client/router";
import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux.hook";
import ApplicationFormAction from "@/redux/actions/ApplicationForm.action";
import FormContext, { initFormContext } from "@/contexts/Form.context";
import { getStatusSection } from "@/validators/form.validator";
import FormNavFooter from "@/components/molecules/FormNav/FormNavFooter";
import LinkRoutes from "@/routes/LinkRoutes.route";
import { formatPages, formatPagesToRedux } from "@/helpers/form.helper";
import ApplicationFormDocuments from "@/components/organisms/ApplicationFormDocuments";
import Head from "next/head";
import { removeDuplicates } from "@/helpers/app.helper";
import useSource from "@/hooks/useSource.hook";

type ApplicationFormPageProps = {
  institute_name: string;
  logo_img: string;
  mandatoryFiles: string[];
  optionalFiles: string[];
  pages: TApiFormPage[];
};
const ApplicationFormPage: React.FC<ApplicationFormPageProps> = ({
  institute_name,
  logo_img,
  mandatoryFiles,
  optionalFiles,
  pages,
}) => {
  const router = useRouter();
  const { institute_id, level_name } = router.query;
  const { original_source } = useSource();

  const [showPages, setShowPages] = React.useState(
    true
    // mandatoryFiles.length === 0 && optionalFiles.length === 0
  );

  const state = useReduxSelector((state) => state.ApplicationForm);
  const dispatch = useReduxDispatch();

  const currentPage = state.pages[state.currentPage];

  React.useEffect(() => {
    if (state.preAppPages.length === 0) {
      if (institute_id && typeof institute_id === "string") {
        router.push(LinkRoutes.preAppForm(original_source, +institute_id));
      }
    }
  }, [state.preAppPages.length, original_source, institute_id, router]);

  React.useEffect(() => {
    if (typeof institute_id === "string")
      dispatch(ApplicationFormAction.instituteId(+institute_id));
    if (typeof level_name === "string")
      dispatch(ApplicationFormAction.levelName(level_name));

    dispatch(ApplicationFormAction.instituteName(institute_name));

    const reduxPages = formatPagesToRedux(
      pages,
      (level_name ?? "")?.toString()
    );

    dispatch(ApplicationFormAction.institutePages(reduxPages));
  }, [dispatch, institute_id, level_name, institute_name, pages]);

  const title = `${institute_name} | ${level_name} Pre-Application Form`;

  return showPages ? (
    <Layout.Centered maxWidth={864}>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
      </Head>

      <FormNav institute_name={institute_name} logo_img={logo_img} />

      <S.Container>
        {pages.map((page, p) => (
          <React.Fragment key={p}>
            {page.sections.map((section, s) => (
              <Section
                key={s}
                position={s}
                visible={state.currentPage === p}
                name={section.section?.section.name ?? ""}
                status={
                  currentPage?.sections[s]
                    ? getStatusSection(currentPage.sections[s])
                    : "NOT_STARTED"
                }
              >
                {section.fields.map((row, r) => {
                  return (
                    <FormContext.Provider
                      key={r}
                      value={{
                        ...initFormContext(),
                        pageIdx: p,
                        sectionIdx: s,
                        rowIdx: r,
                      }}
                    >
                      <FieldRow
                        key={r}
                        field1={row[0]?.field}
                        field2={row[1]?.field}
                        field1Optional={row[0]?.is_optional}
                        field2Optional={row[1]?.is_optional}
                      />
                    </FormContext.Provider>
                  );
                })}
              </Section>
            ))}
          </React.Fragment>
        ))}
        <Divider height={10} />
      </S.Container>

      <FormNavFooter />
    </Layout.Centered>
  ) : (
    <Layout.Centered maxWidth={864}>
      <ApplicationFormDocuments
        institute_name={institute_name}
        logo_img={logo_img}
        level_name={state.level_name}
        mandatoryFiles={mandatoryFiles}
        optionalFiles={optionalFiles}
        setShowPages={setShowPages}
      />
    </Layout.Centered>
  );
};

export default ApplicationFormPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<ApplicationFormPageProps> = async (
  context
) => {
  try {
    if (!context.params) {
      throw Exception.details(Codes.BAD_REQUEST, "No parameters found");
    }

    const { institute_id, level_name } = context.params;

    if (!institute_id || typeof institute_id !== "string") {
      throw Exception.details(Codes.BAD_REQUEST, "No university id found");
    }
    if (!level_name || typeof level_name !== "string") {
      throw Exception.details(Codes.BAD_REQUEST, "No education level found");
    }

    const institutes = await ApiRoutes.institutes({
      format: ["institute_images"],
      filter: { institutes: { ids: [+institute_id] } },
    });

    const institute = institutes ? institutes[0] : null;

    const { form } = await ApiRoutes.instituteForm(+institute_id, level_name);
    const pages: TApiFormPage[] = form.pages;

    const mandatoryFiles: string[] = [];
    const optionalFiles: string[] = [];

    for (const page of pages) {
      for (const section of page.sections) {
        for (const row of section.fields) {
          for (const field of row) {
            if (
              (field.field?.levels ?? []).find((l) => l.name === level_name)
            ) {
              if (field.field?.field.type.type === "File Upload") {
                if (field.is_optional)
                  optionalFiles.push(field.field.field.name);
                else mandatoryFiles.push(field.field.field.name);
              }

              for (const subform of field.field?.subform_fields ?? []) {
                if (subform.field.type.type === "File Upload") {
                  if (field.is_optional)
                    mandatoryFiles.push(subform.field.name);
                  else optionalFiles.push(subform.field.name);
                }
              }

              for (const conField of field.field?.conditions ?? []) {
                if (conField.field.type.type === "File Upload")
                  optionalFiles.push(conField.field.name);

                for (const conSubform of conField.subform_fields ?? []) {
                  if (conSubform.field.type.type === "File Upload")
                    optionalFiles.push(conSubform.field.name);
                }
              }
            }
          }
        }
      }
    }

    return {
      props: {
        institute_name: institute?.institute.name ?? "",
        logo_img: institute?.institute.images?.logo_img ?? "",
        mandatoryFiles: removeDuplicates(mandatoryFiles),
        optionalFiles: removeDuplicates(optionalFiles),
        pages: formatPages(form.pages, level_name as string),
      },
      notFound: false,
      revalidate: 1 * 60,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        institute_name: "",
        logo_img: "",
        mandatoryFiles: [],
        optionalFiles: [],
        pages: [],
      },
      notFound: false,
      revalidate: 1 * 60,
    };
  }
};
