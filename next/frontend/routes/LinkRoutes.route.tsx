const LinkRoutes = {
  preAppForm: (source: string, institute_id: number) =>
    `/${source}/${institute_id}`,

  appForm: (source: string, institute_id: number, level_name: string) =>
    `/${source}/${institute_id}/${level_name}`,
};

export default LinkRoutes;
