import React from "react";

export const useFilesContext = () => {
  const [files, setFiles] = React.useState<TFilesContextFile[]>([]);
  return { files, setFiles };
};

export type TFilesContextFile = {
  id: string;
  file: File;
};

export type TFilesContext = {
  files: TFilesContextFile[];
  setFiles: React.Dispatch<React.SetStateAction<TFilesContextFile[]>>;
};

const FilesContext = React.createContext<TFilesContext>({
  files: [],
  setFiles: () => {},
});

export default FilesContext;
