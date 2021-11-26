import FilesContext, { TFilesContextFile } from "@/contexts/Files.context";
import useToast from "@/hooks/useToast.hook";
import { useUpdateForm } from "@/hooks/useUpdateForm.hook";
import React from "react";
import SvgElem, { SvgElems } from "../SvgElem/SvgElem";
import S from "./FileUpload.styled";

const FileExtensions = ["png", "jpg", "jpeg", "pdf"];

type FileUploadProps = {
  size: number;
  count: number;
};

const FileUpload: React.FC<FileUploadProps> = ({ size, count }) => {
  const { setFiles } = React.useContext(FilesContext);
  const [_files, _setFiles] = React.useState<TFilesContextFile[]>([]);

  const ref = React.useRef<HTMLInputElement>(null);

  useUpdateForm(
    _files.map((file) => file.id),
    [_files]
  );

  const getFileExtension = (file: File) => {
    return file.name.split(".").pop() ?? "";
  };

  const { setToast } = useToast();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    try {
      if (e.target.files) {
        const _fileList = Array.from(e.target.files);
        const fileList: TFilesContextFile[] = [];

        if (_fileList.length + _files.length > count) {
          setToast("FAILURE", `You can upload a maximum of ${count} files`);
          throw Error(`You can upload a maximum of ${count} files`);
        }

        for (const file of _fileList) {
          const extension = getFileExtension(file);

          if (!FileExtensions.includes(extension ?? "")) {
            setToast(
              "FAILURE",
              `Only JPG, JPEG, PNG and PDF files are allowed`
            );
            throw Error(`Only JPG, JPEG, PNG and PDF files are allowed`);
          }

          const sizeInMb = parseFloat((file.size / 1024 / 1024).toFixed(4));

          if (sizeInMb > size) {
            setToast("FAILURE", `Each file must be ${size}MB or less`);
            throw Error(`Each file must be ${size}MB or less`);
          }

          const objectURL = URL.createObjectURL(file);
          fileList.push({ id: objectURL, file });
        }

        _setFiles([..._files, ...fileList]);
        setFiles((prev) => [...prev, ...fileList]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onClickUpload = () => {
    if (ref?.current?.type === "file") ref.current.click();
  };

  const onClickRemoveFile = (idx: number) => {
    const newFiles = Array.from(_files);
    newFiles.splice(idx, 1);
    _setFiles(newFiles);
  };

  const showUploadFileButton = _files.length < count;

  return (
    <>
      <S.FileInput
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        onChange={onChange}
        multiple={count > 1}
      />

      <S.Files>
        {_files.map((file, i) => {
          const fileExtension = getFileExtension(file.file).toUpperCase();
          const fileSizeInMb = parseFloat(
            (file.file.size / 1024 / 1024).toFixed(3)
          );
          const fileSizeInKb = parseFloat((file.file.size / 1024).toFixed(3));
          const fileSize =
            fileSizeInMb >= 1 ? fileSizeInMb + "MB" : fileSizeInKb + "KB";
          return (
            <S.File key={i}>
              <S.FileName>{file.file.name}</S.FileName>
              <S.FileDetails>{`${fileExtension} - ${fileSize}`}</S.FileDetails>
              <S.FileRemoveButton onClick={() => onClickRemoveFile(i)}>
                <SvgElem svg={SvgElems.IconRemove} />
              </S.FileRemoveButton>
            </S.File>
          );
        })}

        {showUploadFileButton && (
          <S.FileUploadButton onClick={onClickUpload}>
            <SvgElem svg={SvgElems.IconUpload} />
            <p>Upload a File</p>
          </S.FileUploadButton>
        )}
      </S.Files>
    </>
  );
};

export default FileUpload;
