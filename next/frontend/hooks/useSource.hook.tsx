import { useRouter } from "next/dist/client/router";

const useSource = () => {
  const { query } = useRouter();
  const { source } = query;

  const original_source = typeof source === "string" ? source ?? "" : "";

  let application_source = "";

  switch (source) {
    case "securemyscholarship":
      application_source = "SecureMyScholarship";
      break;

    case "lockandstock":
      application_source = "Lock&Stock";
      break;

    case "prep":
      application_source = "Prep";
      break;
  }

  return { original_source, application_source };
};

export default useSource;
