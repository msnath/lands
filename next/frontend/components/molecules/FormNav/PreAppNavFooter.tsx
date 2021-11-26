import React from "react";
import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux.hook";
import LinkRoutes from "@/routes/LinkRoutes.route";
import S from "./PreAppNavFooter.styled";
import SvgElem, { SvgElems } from "@/components/atoms/SvgElem/SvgElem";
import { getStatusPage } from "@/validators/form.validator";
import { useRouter } from "next/dist/client/router";
import ApplicationFormAction from "@/redux/actions/ApplicationForm.action";
import useSource from "@/hooks/useSource.hook";
import useSubmitForm from "@/hooks/useSubmitForm.hook";
import useToast from "@/hooks/useToast.hook";

type PreAppNavFooterProps = {};

const PreAppNavFooter: React.FC<PreAppNavFooterProps> = () => {
  const router = useRouter();

  const { setToast } = useToast();
  const { original_source } = useSource();

  const state = useReduxSelector((state) => state.ApplicationForm);

  const dispatch = useReduxDispatch();

  const status = getStatusPage(state.pages[0]);

  const { onSubmitEnquiry } = useSubmitForm();

  const onClickFastTrack = () => {
    if (status === "COMPLETED") {
      onSubmitEnquiry(false);
      if (state.institute_id && state.level_name) {
        dispatch(ApplicationFormAction.preAppPages(state.pages));
        router.push(
          LinkRoutes.appForm(
            original_source,
            state.institute_id,
            state.level_name
          )
        );
      }
    } else {
      setToast("FAILURE", "Please fill out the form");
    }
  };

  return (
    <S.PreAppNavFooter>
      <S.FastTrackButton
        disabled={status !== "COMPLETED"}
        onClick={onClickFastTrack}
      >
        <SvgElem svg={SvgElems.IconApply} />
        <div>
          <p>Fast Track Application</p>
          <p>Submit full application (~ 10 mins)</p>
        </div>
      </S.FastTrackButton>

      <S.Texts>
        <S.GreyText>
          <span>Still Need Help? </span>
          <S.BlueSpan onClick={() => onSubmitEnquiry(true)}>
            Speak to a Counsellor
          </S.BlueSpan>
        </S.GreyText>
      </S.Texts>
    </S.PreAppNavFooter>
  );
};

export default PreAppNavFooter;
