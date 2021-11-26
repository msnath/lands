import { ApiResponse } from "$/types/api.type";
import { TApiCountry, TApiCourse, TApiInstitute } from "$/types/ucp.type";
import { TFilesContextFile } from "@/contexts/Files.context";
import axios from "axios";
import Env from "frontend/configs/env.config";
import { TNextApiFileUpload } from "$/types/api.type";

const ApiRoutes = {
  Next: {
    uploadFiles: async (files: TFilesContextFile[]) => {
      try {
        const formData = new FormData();
        for (const file of files) {
          formData.append(file.id, file.file);
        }

        const res = await axios.post<any>("/apply/api/upload-files", formData);
        console.log(res.data);

        return ApiResponse.success<TNextApiFileUpload[]>(
          res.data.response ?? []
        );
      } catch (err) {
        console.error(err);
        return ApiResponse.failure([]);
      }
    },

    submitForm: async (req: any) => {
      try {
        const res = await axios.post<any>("/apply/api/submit-form", req);
        console.log(res.data);
        return ApiResponse.success();
      } catch (err) {
        console.error(err);
        return ApiResponse.failure();
      }
    },
  },

  countries: async () => {
    try {
      const res = await axios.post<any>(Env.UCP_API_URL + "/search/countries", {
        pagination: { limit: "ALL" },
      });
      console.log(res.data);
      return res.data.results as TApiCountry[];
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  cities: async (country_name: string) => {
    try {
      const res = await axios.post<any>(Env.UCP_API_URL + "/search/countries", {
        format: ["country_cities"],
        filter: { countries: { names: [country_name] } },
      });
      console.log(res.data);
      return (res.data.results[0]?.country.cities ?? [])
        .map((o: any) => o.name)
        .sort();
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  institutes: async (req: any) => {
    try {
      const res = await axios.post<any>(
        Env.UCP_API_URL + "/search/institutes",
        req
      );
      console.log(res.data);
      return res.data.results as TApiInstitute[];
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  courses: async (req: any) => {
    try {
      const res = await axios.post<any>(
        Env.UCP_API_URL + "/search/courses",
        req
      );
      console.log(res.data);
      return res.data.results as TApiCourse[];
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  preAppForm: async () => {
    try {
      const res = await axios.post<any>(
        Env.UCP_API_URL + "/search/applications/forms",
        {
          format: ["application_form_details"],
          filter: { application_forms: { types: ["Pre-App"] } },
        }
      );
      console.log(res.data);

      if (res.data.results.length !== 1) {
        throw Error("Pre App Form Not Found");
      }

      return res.data.results[0] as any;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  defaultForm: async () => {
    try {
      const res = await axios.post<any>(
        Env.UCP_API_URL + "/search/applications/forms",
        {
          format: ["application_form_details"],
          filter: { application_forms: { types: ["Default"] } },
        }
      );
      console.log(res.data);

      if (res.data.results.length !== 1) {
        throw Error("Default Form Not Found");
      }

      return res.data.results[0] as any;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  instituteForm: async (institute_id: number, level_name: string) => {
    try {
      const res = await axios.post<any>(
        Env.UCP_API_URL + "/search/applications/forms",
        {
          format: ["application_form_details"],
          filter: {
            institutes: { ids: [institute_id] },
            education_levels: { names: [level_name] },
          },
        }
      );
      console.log(res.data);

      if (res.data.results.length !== 1) {
        throw Error("Institute Form Not Found");
      }

      return res.data.results[0] as any;
    } catch (err) {
      console.error(err);
      return await ApiRoutes.defaultForm();
    }
  },
};

export default ApiRoutes;
