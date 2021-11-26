import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

const S = {
  FileInput: styled.input`
    display: none;
  `,

  FileUploadButton: styled.button`
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 1.5rem;
    align-items: center;
    justify-content: center;

    width: 100%;
    background: ${Colors.WhiteFFFFFF};
    border-radius: 0.75rem;
    border: 2px solid ${Colors.WhiteF0F0F0};
    padding: 0.75rem 1rem;

    & > p {
      color: ${Colors.Black3B3B3C};
      font-family: Montserrat;
      font-size: 1rem;
      font-weight: 600;
      text-align: left;
    }
  `,

  Files: styled.div`
    width: 100%;
    display: grid;
    row-gap: 1rem;
  `,

  File: styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "file-name file-remove"
      "file-details file-remove";
    background: ${Colors.WhiteFFFFFF};

    color: ${Colors.Black3B3B3C};
    font-family: Mulish;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;

    border-radius: 0.75rem;
    border: 2px solid ${Colors.WhiteF0F0F0};
    padding: 0.75rem 1rem;
    width: 100%;
  `,

  FileName: styled.p`
    grid-area: file-name;

    color: ${Colors.Black3B3B3C};
    font-family: Mulish;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
  `,

  FileDetails: styled.p`
    grid-area: file-details;

    color: ${Colors.Grey6C6C6D};
    font-family: Mulish;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-align: left;
  `,

  FileRemoveButton: styled.button`
    grid-area: file-remove;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    border: 0.25rem solid ${Colors.WhiteFAFAFA};
  `,
};

export default S;
