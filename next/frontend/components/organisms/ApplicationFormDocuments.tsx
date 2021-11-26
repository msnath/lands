import { removeDuplicates } from "@/helpers/app.helper";
import React from "react";
import Checkbox from "../atoms/Checkbox/Checkbox";
import Divider from "../atoms/Divider/Divider.styled";
import SvgElem, { SvgElems } from "../atoms/SvgElem/SvgElem";
import S from "./ApplicationFormDocuments.styled";
import S2 from "@/components/molecules/FormNav/PreAppNavFooter.styled";

type ApplicationFormDocumentsProps = {
  institute_name: string;
  logo_img: string;
  level_name: string;
  mandatoryFiles: string[];
  optionalFiles: string[];
  setShowPages: React.Dispatch<React.SetStateAction<boolean>>;
};

const ApplicationFormDocuments: React.FC<ApplicationFormDocumentsProps> = ({
  institute_name,
  logo_img,
  level_name,
  mandatoryFiles,
  optionalFiles,
  setShowPages,
}) => {
  const [checked, setChecked] = React.useState<string[]>([]);

  return (
    <>
      <S.BodyContainer>
        <S.Body>
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
            <S.UniversityTitle>{institute_name}</S.UniversityTitle>
            <S.UniversityText>{level_name} Application Form</S.UniversityText>
          </S.University>

          <S.Paragraph>
            <SvgElem svg={SvgElems.IconSmileyFace} />
            <p>
              We want to ensure you have a smooth application experience, make
              sure you have the required documents before you start!
            </p>
          </S.Paragraph>

          <div>
            <S.Title>Mandatory Documents</S.Title>
            <Divider height={0.5} />
            <S.Text>
              We made it easy for you. When you’re ready with your documents,
              check them off and we can start on your application!
            </S.Text>
            <Divider height={1.5} />
            <S.Mandatory>
              {mandatoryFiles.map((m, i) => (
                <Checkbox
                  key={i}
                  text={m}
                  checked={checked.includes(m)}
                  onClick={() =>
                    checked.includes(m)
                      ? setChecked(
                          removeDuplicates(checked.filter((v) => v !== m))
                        )
                      : setChecked((prev) => removeDuplicates([...prev, m]))
                  }
                />
              ))}
            </S.Mandatory>
          </div>

          <div>
            <S.Title>Optional Documents</S.Title>
            <Divider height={0.5} />
            <S.Optional>
              {optionalFiles.map((o, i) => (
                <S.OptionalBox key={i}>{o}</S.OptionalBox>
              ))}
            </S.Optional>
          </div>
        </S.Body>
      </S.BodyContainer>

      <S.Empty />

      <S2.PreAppNavFooter>
        <S2.FastTrackButton
          disabled={checked.length !== mandatoryFiles.length}
          onClick={() => setShowPages(true)}
        >
          <SvgElem svg={SvgElems.IconApply} />
          <div>
            <p>Fast Track Application</p>
            <p>Submit full application (~ 10 mins)</p>
          </div>
        </S2.FastTrackButton>
      </S2.PreAppNavFooter>
    </>
  );
};

export default ApplicationFormDocuments;
