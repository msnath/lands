import React from "react";
import FilesContext from "@/contexts/Files.context";
import ApiRoutes from "@/routes/ApiRoutes.route";
import { updateFilesToS3Url } from "@/helpers/form.helper";
import { useReduxSelector } from "@/hooks/useRedux.hook";
import useToast from "@/hooks/useToast.hook";
import useSource from "@/hooks/useSource.hook";
import { isCompletedForm } from "@/validators/form.validator";

const useSubmitForm = () => {
  const { files } = React.useContext(FilesContext);
  const { setToast } = useToast();
  const { application_source } = useSource();

  const state = useReduxSelector((state) => state.ApplicationForm);

  const onSubmitApplication = async (notify: boolean) => {
    let email = "";

    for (const section of state.preAppPages[0]?.sections ?? [])
      for (const row of section.fields)
        for (const field of row)
          if (field.type === "Email") email = field.values[0];

    if (!email) {
      if (notify) setToast("FAILURE", "Email not found");
      return;
    }

    if (notify) setToast("LOADING", "We're uploading your application");

    const res1 = await ApiRoutes.Next.uploadFiles(files);

    if (res1.json.success) {
      const uploads = res1.json.response ?? [];

      const copiedPreAppPages = updateFilesToS3Url(uploads, state.preAppPages);
      const copiedPages = updateFilesToS3Url(uploads, state.pages);
      const res2 = await ApiRoutes.Next.submitForm({
        application_source,
        email,
        institute_id: state.institute_id,
        institute_name: state.institute_name,
        course_id: state.course_id,
        course_name: state.course_name,
        fee_waiver_id: state.fee_waiver_id,
        fee_waiver_name: state.fee_waiver_name,
        level_name: state.level_name,
        pre_app_pages: copiedPreAppPages,
        pages: copiedPages,
        completed: notify,
        notify,
      });

      if (res2.json.success) {
        if (notify) setToast("SUCCESS", "Upload success!");
      } else {
        if (notify) setToast("FAILURE", "An error occurred");
      }
    } else {
      if (notify) setToast("FAILURE", "Failed to upload files");
    }
  };

  const onSubmitEnquiry = async (notify: boolean) => {
    let email = "";

    if (!isCompletedForm(state.pages)) {
      if (notify) setToast("FAILURE", "Please fill out the form");
      return;
    }

    for (const section of state.pages[0]?.sections ?? [])
      for (const row of section.fields)
        for (const field of row)
          if (field.type === "Email") email = field.values[0];

    if (!email) {
      if (notify) setToast("FAILURE", "Email not found");
      return;
    }

    if (notify) setToast("LOADING", "We're uploading your application");

    const res1 = await ApiRoutes.Next.uploadFiles(files);

    if (res1.json.success) {
      const uploads = res1.json.response ?? [];

      const copiedPreAppPages = updateFilesToS3Url(uploads, state.pages);

      const res2 = await ApiRoutes.Next.submitForm({
        application_source,
        email,
        institute_id: state.institute_id,
        institute_name: state.institute_name,
        course_id: state.course_id,
        course_name: state.course_name,
        fee_waiver_id: state.fee_waiver_id,
        fee_waiver_name: state.fee_waiver_name,
        level_name: state.level_name,
        pre_app_pages: copiedPreAppPages,
        pages: [],
        completed: false,
        notify,
      });

      if (res2.json.success) {
        if (notify)
          setToast("SUCCESS", "Upload success! A counsellor will be in touch");
      } else {
        if (notify) setToast("FAILURE", "An error occurred");
      }
    } else {
      if (notify) setToast("FAILURE", "Failed to upload files");
    }
  };

  return { onSubmitApplication, onSubmitEnquiry };
};

export default useSubmitForm;
