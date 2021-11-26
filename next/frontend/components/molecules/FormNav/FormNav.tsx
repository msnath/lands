import Divider from "@/components/atoms/Divider/Divider.styled";
import { StatusText, StatusIcon } from "@/components/atoms/Status/Status";
import SvgElem, { SvgElems } from "@/components/atoms/SvgElem/SvgElem";
import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux.hook";
import useSubmitForm from "@/hooks/useSubmitForm.hook";
import ApplicationFormAction from "@/redux/actions/ApplicationForm.action";
import { getStatusPage, getStatusSection } from "@/validators/form.validator";
import React from "react";
import S from "./FormNav.styled";

type FormNavProps = {
  logo_img: string;
  institute_name: string;
};

const FormNav: React.FC<FormNavProps> = ({ logo_img, institute_name }) => {
  const state = useReduxSelector((state) => state.ApplicationForm);
  const prevPage = state.pages[state.currentPage - 1]?.name ?? null;
  const nextPage = state.pages[state.currentPage + 1]?.name ?? null;

  const { onSubmitApplication } = useSubmitForm();

  const dispatch = useReduxDispatch();

  const status = getStatusPage(state.pages[state.currentPage]);

  const onClickPrev = () => {
    dispatch(ApplicationFormAction.Pagination.prev());
  };

  const onClickNext = () => {
    onSubmitApplication(false);
    if (status === "COMPLETED") {
      dispatch(ApplicationFormAction.Pagination.next());
    }
  };

  const currentPage = state.pages[state.currentPage];

  const pageStatus = getStatusPage(currentPage);

  return (
    <>
      <S.FormNav>
        <S.University>
          <S.LogoContainer>
            {logo_img && (
              <S.Logo
                width={60}
                height={60}
                src={decodeURIComponent(logo_img ?? "")}
              />
            )}
          </S.LogoContainer>

          <S.UniversityDetails>
            <S.Title>{institute_name}</S.Title>
            {state.course_name && <S.Text>{state.course_name}</S.Text>}
            {state.fee_waiver_name && <S.Text>{state.fee_waiver_name}</S.Text>}
          </S.UniversityDetails>
        </S.University>

        {state.pages.length > 1 && (
          <S.Progress>
            <S.ProgressText>
              Application Progress: {state.currentPage + 1}/{state.pages.length}{" "}
              pages
            </S.ProgressText>
            <S.ProgressSegments>
              {[...new Array(state.pages.length).fill(null)].map((_, i) => (
                <S.ProgressSegment
                  key={i}
                  highlighted={state.currentPage >= i ? 1 : 0}
                  fraction={state.pages.length}
                />
              ))}
            </S.ProgressSegments>
          </S.Progress>
        )}
      </S.FormNav>

      <S.ProgressBar
        percentage={(state.currentPage + 1) / state.pages.length}
      />

      <S.PageNav>
        <S.Arrow disabled={!prevPage} onClick={onClickPrev}>
          <SvgElem svg={SvgElems.IconChevronLeft} />
        </S.Arrow>

        <S.PageContainer>
          <S.Page>
            <p>page</p>
            <p>{state.currentPage + 1}</p>
          </S.Page>

          <S.PageName>
            <p>{currentPage?.name ?? ""}</p>
            <Divider width={1} />
            {pageStatus === "NOT_STARTED" && <StatusText notStarted />}
            {pageStatus === "MISSING_INFO" && <StatusText missingInfo />}
            {pageStatus === "COMPLETED" && <StatusText completed />}
          </S.PageName>
        </S.PageContainer>

        <S.Arrow
          disabled={!nextPage || status !== "COMPLETED"}
          onClick={onClickNext}
        >
          <SvgElem svg={SvgElems.IconChevronRight} />
        </S.Arrow>
      </S.PageNav>

      <S.SectionNavContainer>
        <S.SectionNav>
          <p>Sections in this page</p>

          <S.Sections>
            {(currentPage?.sections ?? []).map((section, i) => {
              const status = getStatusSection(section);
              return (
                <StatusIcon
                  key={i}
                  page={i + 1}
                  notStarted={status === "NOT_STARTED"}
                  completed={status === "COMPLETED"}
                  missingInfo={status === "MISSING_INFO"}
                />
              );
            })}
          </S.Sections>

          <S.SectionButtons>
            {/* <S.Arrow>
              <SvgElem svg={SvgElems.IconChevronLeft} />
            </S.Arrow>
            <S.Arrow>
              <SvgElem svg={SvgElems.IconChevronRight} />
            </S.Arrow> */}
          </S.SectionButtons>
        </S.SectionNav>
      </S.SectionNavContainer>
    </>
  );
};

export default FormNav;
