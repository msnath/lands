import styled from "styled-components";
import Image from "next/image";
import { Colors } from "@/styles/app.styled";

const S = {
  BodyContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
  `,

  Body: styled.div`
    display: grid;
    grid-template-rows: auto auto auto auto 1fr;
    row-gap: 1.5rem;
    align-items: center;
    justify-content: flex-start;

    width: 100%;
    height: 100%;
    min-height: 100vh;
    max-width: 48rem;
    padding: 1.5rem;
  `,

  Empty: styled.div`
    height: 100%;
  `,

  University: styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "logo title"
      "logo text";
    column-gap: 1.5rem;
    row-gap: 0.5rem;

    width: 100%;
    padding: 1.5rem;

    border-radius: 1.25rem;
    border: 0.25rem solid ${Colors.WhiteFAFAFA};
  `,

  LogoContainer: styled.div`
    grid-area: logo;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 0.75rem;
    border: 0.1875rem solid ${Colors.WhiteFAFAFA};
    overflow: hidden;
  `,

  Logo: styled(Image)`
    width: 3.75rem;
    height: 3.75rem;
  `,

  UniversityTitle: styled.h1`
    grid-area: title;
    color: ${Colors.Black3B3B3C};
    font-family: Montserrat;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
  `,

  UniversityText: styled.h2`
    grid-area: text;
    color: ${Colors.Black3B3B3C};
    font-family: Mulish;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
  `,

  Paragraph: styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1.5rem;

    padding: 1.5rem;
    border-radius: 0.75rem;
    background: ${Colors.WhiteFAFAFA};
  `,

  Title: styled.p`
    color: ${Colors.Black23272B};
    font-family: Montserrat;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
  `,

  Text: styled.div`
    color: ${Colors.Grey6C6C6D};
    font-family: Mulish;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
  `,

  Mandatory: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1rem;
    row-gap: 1rem;

    @media only screen and (min-width:48rem){
      grid-template-columns: 1fr 1fr;
    }
  `,

  Optional: styled.div`
    display: grid;
    row-gap: 1.125rem;
  `,

  OptionalBox: styled.div`
    color: ${Colors.Black23272B};
    font-family: Mulish;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    padding-left: 2.5rem;

    &:before {
      content: "";
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);

      width: 0.625rem;
      height: 0.625rem;
      background: ${Colors.GreyDBDFE7};
      border-radius: 0.125rem;
    }
  `,
};

export default S;
