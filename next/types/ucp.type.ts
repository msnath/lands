export type TApiCountry = {
  country: {
    id: number;
    name: string;
    flag_img: string;
    flag_svg: string;
    currency: string;
  };
};

export type TApiInstitute = {
  institute: {
    id: number;
    name: string;
    images?: {
      id: number;
      logo_img: string;
      banner_img: string;
    };
  };
  course?: {
    stats?: {
      level_count: { level: { id: number; name: string } }[];
      category_count: { category: { id: number; name: string } }[];
    };
    courses?: { id: number; name: string }[];
  };
};

export type TApiCourse = {
  course: {
    id: number;
    name: string;
    details?: {
      level: { name: string };
      category: { name: string };
    };
  };
  fee_waiver?: { fee_waivers: { id: number; name: string }[] };
};
