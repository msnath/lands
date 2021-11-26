import { Codes, Exception } from "$/types/error.type";
import ApiRoutes from "@/routes/ApiRoutes.route";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Layout from "@/components/atoms/Layout/Layout.styled";
import Section from "@/components/molecules/Section/Section";
import S from "@/styles/ApplicationFormPage.styled";
import Divider from "@/components/atoms/Divider/Divider.styled";
import FieldRow from "@/components/molecules/FieldRow/FieldRow";
import { TApiFormPage } from "$/types/form.type";
import FormContext, { initFormContext } from "@/contexts/Form.context";
import { getStatusSection } from "@/validators/form.validator";
import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux.hook";
import ApplicationFormAction from "@/redux/actions/ApplicationForm.action";
import FormNav from "@/components/molecules/FormNav/FormNav";
import { formatPagesToRedux } from "@/helpers/form.helper";
import PreAppNavFooter from "@/components/molecules/FormNav/PreAppNavFooter";
import Head from "next/head";

type PreApplicationPageProps = {
  institute_name: string;
  logo_img: string;
  preAppPages: TApiFormPage[];
};

const PreApplicationPage: React.FC<PreApplicationPageProps> = ({
  institute_name,
  logo_img,
  preAppPages,
}) => {
  const router = useRouter();
  const { institute_id } = router.query;

  const state = useReduxSelector((state) => state.ApplicationForm);
  const dispatch = useReduxDispatch();

  const currentPage = state.pages[state.currentPage];

  React.useEffect(() => {
    if (typeof institute_id === "string") {
      dispatch(ApplicationFormAction.instituteId(+institute_id));
      dispatch(ApplicationFormAction.instituteName(institute_name));
    }
  }, [dispatch, institute_id, institute_name]);

  React.useEffect(() => {
    if (typeof institute_id === "string")
      dispatch(ApplicationFormAction.instituteId(+institute_id));

    const reduxPages = formatPagesToRedux(preAppPages, null);

    dispatch(ApplicationFormAction.preAppPages([]));
    dispatch(ApplicationFormAction.institutePages(reduxPages));
  }, [dispatch, institute_id, preAppPages]);

  const title = `${institute_name} | Application Form`;

  return (
    <Layout.Centered maxWidth={864}>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
      </Head>

      <FormNav institute_name={institute_name} logo_img={logo_img} />

      <S.Container>
        {(preAppPages[0]?.sections ?? []).map((section, s) => (
          <Section
            key={s}
            position={s}
            visible
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
                    pageIdx: 0,
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
        <Divider height={10} />
      </S.Container>

      <PreAppNavFooter />
    </Layout.Centered>
  );
};

export default PreApplicationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<PreApplicationPageProps> = async (
  context
) => {
  try {
    if (!context.params) {
      throw Exception.details(Codes.BAD_REQUEST, "No parameters found");
    }

    const { institute_id } = context.params;

    if (!institute_id || typeof institute_id !== "string") {
      throw Exception.details(Codes.BAD_REQUEST, "No university id found");
    }

    const { form } = await ApiRoutes.preAppForm();

    const institutes = await ApiRoutes.institutes({
      format: ["institute_images"],
      filter: { institutes: { ids: [+institute_id] } },
    });

    const institute = institutes ? institutes[0] : null;

    return {
      props: {
        institute_name: institute?.institute.name ?? "",
        logo_img: institute?.institute.images?.logo_img ?? "",
        preAppPages: form.pages,
      },
      notFound: false,
      revalidate: 1 * 60,
    };
  } catch (err) {
    return {
      props: { institute_name: "", logo_img: "", preAppPages: [] },
      notFound: false,
      revalidate: 1 * 60,
    };
  }
};
