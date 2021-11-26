import SvgElem, { SvgElems } from "@/components/atoms/SvgElem/SvgElem";
import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux.hook";
import ApplicationFormAction from "@/redux/actions/ApplicationForm.action";
import { getStatusPage } from "@/validators/form.validator";
import React from "react";
import S from "./FormNavFooter.styled";
import useDimensions from "@/hooks/useDimensions.hook";
import useSubmitForm from "@/hooks/useSubmitForm.hook";
type FormNavFooterProps = {};

const FormNavFooter: React.FC<FormNavFooterProps> = () => {
  const state = useReduxSelector((state) => state.ApplicationForm);

  const currentPage = state.pages[state.currentPage + 0];
  const prevPage = state.pages[state.currentPage - 1]?.name ?? null;
  const nextPage = state.pages[state.currentPage + 1]?.name ?? null;
  const isLastPage = state.currentPage === state.pages.length - 1;

  const dispatch = useReduxDispatch();

  const status = getStatusPage(currentPage);

  const { is480 } = useDimensions();

  const onClickPrev = () => {
    dispatch(ApplicationFormAction.Pagination.prev());
  };

  const { onSubmitApplication } = useSubmitForm();

  const onClickNext = () => {
    if (status === "COMPLETED") {
      dispatch(ApplicationFormAction.Pagination.next());
      onSubmitApplication(false);
    }
  };

  return (
    <S.FormNavFooter>
      {prevPage ? (
        <S.PrevButton onClick={onClickPrev}>
          {is480 ? <S.GreyText>Go To Previous Page</S.GreyText> : null}
          <S.PrevIcon>
            <SvgElem svg={SvgElems.IconArrowRightCircle} />
          </S.PrevIcon>
          <S.Text>{prevPage}</S.Text>
        </S.PrevButton>
      ) : (
        <div />
      )}

      {isLastPage ? (
        <S.SubmitButton
          disabled={status !== "COMPLETED"}
          onClick={() => onSubmitApplication(true)}
        >
          <S.WhiteText>Submit Application</S.WhiteText>
        </S.SubmitButton>
      ) : nextPage ? (
        <S.NextButton disabled={status !== "COMPLETED"} onClick={onClickNext}>
          {is480 ? <S.GreyText>Go To Next Page</S.GreyText> : null}
          <S.NextIcon>
            <SvgElem svg={SvgElems.IconArrowRightCircle} />
          </S.NextIcon>
          <S.Text>{nextPage}</S.Text>
        </S.NextButton>
      ) : (
        <div />
      )}
    </S.FormNavFooter>
  );
};

export default FormNavFooter;
