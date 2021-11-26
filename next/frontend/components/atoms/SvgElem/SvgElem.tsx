import React from "react";

export enum SvgElems {
  IconChevronUp,
  IconChevronLeft,
  IconChevronRight,

  IconTriangleDown,
  IconArrowRightCircle,

  IconCalendar,
  IconUpload,
  IconSubform,

  IconDelete,
  IconRemove,
  IconAddCircle,

  IconStatusComplete,
  IconStatusMissingInfo,
  IconStatusNotStarted,
  IconStatusCheck,
  IconStatusCross,

  IconApply,
  IconSmileyFace,
}

export type SvgElemProps = React.SVGProps<SVGSVGElement> & {
  svg: SvgElems;
};

const SvgElem = React.forwardRef<SVGSVGElement, SvgElemProps>(
  ({ svg, ...props }, ref) => {
    const propsWithRef = { ...props, ref };

    let SVG = (() => {
      switch (svg) {
        case SvgElems.IconChevronUp:
          return (
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L5 1L1 5"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconChevronLeft:
          return (
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 7L7 1"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconChevronRight:
          return (
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13L7 7L1 1"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconTriangleDown:
          return (
            <svg
              width="9"
              height="7"
              viewBox="0 0 9 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.838272 1.49026C0.463308 0.823658 0.945021 0 1.70985 0H7.29015C8.05498 0 8.53669 0.823657 8.16173 1.49026L5.37158 6.45053C4.98927 7.13018 4.01073 7.13018 3.62842 6.45053L0.838272 1.49026Z"
                fill="#8F8F90"
              />
            </svg>
          );

        case SvgElems.IconArrowRightCircle:
          return (
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16.5L16 12.5L12 8.5"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12.5H16"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconCalendar:
          return (
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18C10.1978 18 10.3911 17.9414 10.5556 17.8315C10.72 17.7216 10.8482 17.5654 10.9239 17.3827C10.9996 17.2 11.0194 16.9989 10.9808 16.8049C10.9422 16.6109 10.847 16.4327 10.7071 16.2929C10.5673 16.153 10.3891 16.0578 10.1951 16.0192C10.0011 15.9806 9.80004 16.0004 9.61732 16.0761C9.43459 16.1518 9.27841 16.28 9.16853 16.4444C9.05865 16.6089 9 16.8022 9 17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18ZM15 18C15.1978 18 15.3911 17.9414 15.5556 17.8315C15.72 17.7216 15.8482 17.5654 15.9239 17.3827C15.9996 17.2 16.0194 16.9989 15.9808 16.8049C15.9422 16.6109 15.847 16.4327 15.7071 16.2929C15.5673 16.153 15.3891 16.0578 15.1951 16.0192C15.0011 15.9806 14.8 16.0004 14.6173 16.0761C14.4346 16.1518 14.2784 16.28 14.1685 16.4444C14.0586 16.6089 14 16.8022 14 17C14 17.2652 14.1054 17.5196 14.2929 17.7071C14.4804 17.8946 14.7348 18 15 18ZM15 14C15.1978 14 15.3911 13.9414 15.5556 13.8315C15.72 13.7216 15.8482 13.5654 15.9239 13.3827C15.9996 13.2 16.0194 12.9989 15.9808 12.8049C15.9422 12.6109 15.847 12.4327 15.7071 12.2929C15.5673 12.153 15.3891 12.0578 15.1951 12.0192C15.0011 11.9806 14.8 12.0004 14.6173 12.0761C14.4346 12.1518 14.2784 12.28 14.1685 12.4444C14.0586 12.6089 14 12.8022 14 13C14 13.2652 14.1054 13.5196 14.2929 13.7071C14.4804 13.8946 14.7348 14 15 14ZM10 14C10.1978 14 10.3911 13.9414 10.5556 13.8315C10.72 13.7216 10.8482 13.5654 10.9239 13.3827C10.9996 13.2 11.0194 12.9989 10.9808 12.8049C10.9422 12.6109 10.847 12.4327 10.7071 12.2929C10.5673 12.153 10.3891 12.0578 10.1951 12.0192C10.0011 11.9806 9.80004 12.0004 9.61732 12.0761C9.43459 12.1518 9.27841 12.28 9.16853 12.4444C9.05865 12.6089 9 12.8022 9 13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8946 9.73478 14 10 14ZM17 2H16V1C16 0.734784 15.8946 0.48043 15.7071 0.292893C15.5196 0.105357 15.2652 0 15 0C14.7348 0 14.4804 0.105357 14.2929 0.292893C14.1054 0.48043 14 0.734784 14 1V2H6V1C6 0.734784 5.89464 0.48043 5.70711 0.292893C5.51957 0.105357 5.26522 0 5 0C4.73478 0 4.48043 0.105357 4.29289 0.292893C4.10536 0.48043 4 0.734784 4 1V2H3C2.20435 2 1.44129 2.31607 0.87868 2.87868C0.316071 3.44129 0 4.20435 0 5V19C0 19.7956 0.316071 20.5587 0.87868 21.1213C1.44129 21.6839 2.20435 22 3 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V5C20 4.20435 19.6839 3.44129 19.1213 2.87868C18.5587 2.31607 17.7956 2 17 2ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V10H18V19ZM18 8H2V5C2 4.73478 2.10536 4.48043 2.29289 4.29289C2.48043 4.10536 2.73478 4 3 4H4V5C4 5.26522 4.10536 5.51957 4.29289 5.70711C4.48043 5.89464 4.73478 6 5 6C5.26522 6 5.51957 5.89464 5.70711 5.70711C5.89464 5.51957 6 5.26522 6 5V4H14V5C14 5.26522 14.1054 5.51957 14.2929 5.70711C14.4804 5.89464 14.7348 6 15 6C15.2652 6 15.5196 5.89464 15.7071 5.70711C15.8946 5.51957 16 5.26522 16 5V4H17C17.2652 4 17.5196 4.10536 17.7071 4.29289C17.8946 4.48043 18 4.73478 18 5V8ZM5 14C5.19778 14 5.39112 13.9414 5.55557 13.8315C5.72002 13.7216 5.84819 13.5654 5.92388 13.3827C5.99957 13.2 6.01937 12.9989 5.98079 12.8049C5.9422 12.6109 5.84696 12.4327 5.70711 12.2929C5.56725 12.153 5.38907 12.0578 5.19509 12.0192C5.00111 11.9806 4.80004 12.0004 4.61732 12.0761C4.43459 12.1518 4.27841 12.28 4.16853 12.4444C4.05865 12.6089 4 12.8022 4 13C4 13.2652 4.10536 13.5196 4.29289 13.7071C4.48043 13.8946 4.73478 14 5 14ZM5 18C5.19778 18 5.39112 17.9414 5.55557 17.8315C5.72002 17.7216 5.84819 17.5654 5.92388 17.3827C5.99957 17.2 6.01937 16.9989 5.98079 16.8049C5.9422 16.6109 5.84696 16.4327 5.70711 16.2929C5.56725 16.153 5.38907 16.0578 5.19509 16.0192C5.00111 15.9806 4.80004 16.0004 4.61732 16.0761C4.43459 16.1518 4.27841 16.28 4.16853 16.4444C4.05865 16.6089 4 16.8022 4 17C4 17.2652 4.10536 17.5196 4.29289 17.7071C4.48043 17.8946 4.73478 18 5 18Z"
                fill="#8F90A6"
              />
            </svg>
          );

        case SvgElems.IconUpload:
          return (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 8L12 3L7 8"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 3V15"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconSubform:
          return (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.26953 6.96094L11.9995 12.0109L20.7295 6.96094"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22.08V12"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconDelete:
          return (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H5H21"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 11V17"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 11V17"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconRemove:
          return (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconAddCircle:
          return (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12H16"
                stroke="#3B3B3C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconStatusComplete:
          return (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#56D39E"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5 8L10 16.01L7 13.01"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconStatusMissingInfo:
          return (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#FF4C4C"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16H12.01"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconStatusNotStarted:
          return (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#BCC5D3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.08984 8.99862C9.32495 8.33028 9.789 7.76672 10.3998 7.40775C11.0106 7.04878 11.7287 6.91755 12.427 7.03733C13.1253 7.1571 13.7587 7.52014 14.2149 8.06214C14.6712 8.60415 14.9209 9.29014 14.9198 9.99862C14.9198 11.9986 11.9198 12.9986 11.9198 12.9986"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17H12.0092"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconStatusCheck:
          return (
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 8.81039V9.50039C16.4991 11.1177 15.9754 12.6914 15.007 13.9868C14.0386 15.2821 12.6775 16.2297 11.1265 16.6883C9.57557 17.1469 7.91794 17.0918 6.40085 16.5313C4.88376 15.9708 3.58849 14.935 2.70822 13.5782C1.82795 12.2214 1.40984 10.6164 1.51626 9.00262C1.62267 7.38881 2.24791 5.85263 3.29871 4.62319C4.34951 3.39375 5.76959 2.53692 7.34714 2.1805C8.92469 1.82407 10.5752 1.98714 12.0525 2.64539"
                stroke="#56D39E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5 3.5L9 11.0075L6.75 8.7575"
                stroke="#56D39E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconStatusCross:
          return (
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17C13.1421 17 16.5 13.6421 16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17Z"
                stroke="#FF4C4C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.25 7.25L6.75 11.75"
                stroke="#FF4C4C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.75 7.25L11.25 11.75"
                stroke="#FF4C4C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        case SvgElems.IconApply:
          return (
            <svg
              width="35"
              height="20"
              viewBox="0 0 35 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.48438 7.49934H2.15104C1.70901 7.49934 1.28509 7.67493 0.97253 7.98749C0.65997 8.30006 0.484375 8.72398 0.484375 9.16601C0.484375 9.60803 0.65997 10.032 0.97253 10.3445C1.28509 10.6571 1.70901 10.8327 2.15104 10.8327H5.48438C5.9264 10.8327 6.35033 10.6571 6.66289 10.3445C6.97545 10.032 7.15104 9.60803 7.15104 9.16601C7.15104 8.72398 6.97545 8.30006 6.66289 7.98749C6.35033 7.67493 5.9264 7.49934 5.48438 7.49934ZM33.451 2.76601V2.66601C32.9735 2.08232 32.3702 1.61421 31.6861 1.29673C31.0021 0.979238 30.2551 0.820595 29.501 0.832673H16.2844C15.0597 0.821673 13.8736 1.26053 12.951 2.06601C12.0894 2.82523 11.5229 3.86384 11.351 4.99934L9.88438 13.3327C9.75825 14.0523 9.79138 14.7909 9.98143 15.4964C10.1715 16.2018 10.5138 16.8571 10.9844 17.416C11.4525 17.9731 12.0365 18.4212 12.6957 18.7293C13.3549 19.0373 14.0734 19.1977 14.801 19.1993H28.0344C29.2231 19.2173 30.3794 18.8111 31.2957 18.0536C32.212 17.2961 32.8284 16.2369 33.0344 15.066L34.501 6.73267C34.6166 6.03484 34.5827 5.32044 34.4017 4.63667C34.2207 3.95289 33.8967 3.3153 33.451 2.76601ZM28.8844 4.16601L23.2177 8.76601C22.8827 9.03603 22.4562 9.16601 22.0275 9.12873C21.5988 9.09145 21.2011 8.88981 20.9177 8.56601L17.0344 4.16601H28.8844ZM29.6844 14.4493C29.6169 14.8407 29.4119 15.195 29.1064 15.4487C28.8008 15.7023 28.4148 15.8384 28.0177 15.8327H14.801C14.559 15.8306 14.3203 15.7759 14.1016 15.6723C13.8828 15.5687 13.6893 15.4187 13.5344 15.2327C13.3791 15.0477 13.2659 14.8311 13.2025 14.598C13.1392 14.3649 13.1273 14.1208 13.1677 13.8827L14.501 6.33267L18.4177 10.766C19.2702 11.735 20.4644 12.3367 21.7504 12.4454C23.0364 12.5542 24.3146 12.1614 25.3177 11.3493L31.051 6.66601L29.6844 14.4493ZM7.15104 0.832673H2.15104C1.70901 0.832673 1.28509 1.00827 0.97253 1.32083C0.65997 1.63339 0.484375 2.05731 0.484375 2.49934C0.484375 2.94137 0.65997 3.36529 0.97253 3.67785C1.28509 3.99041 1.70901 4.16601 2.15104 4.16601H7.15104C7.59307 4.16601 8.01699 3.99041 8.32955 3.67785C8.64211 3.36529 8.81771 2.94137 8.81771 2.49934C8.81771 2.05731 8.64211 1.63339 8.32955 1.32083C8.01699 1.00827 7.59307 0.832673 7.15104 0.832673Z"
                fill="white"
              />
            </svg>
          );

        case SvgElems.IconSmileyFace:
          return (
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
                stroke="#56D39E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 15.5C10 18 13.5 18.5 16 15.5"
                stroke="#56D39E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 9.5H9.01"
                stroke="#56D39E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 9.5H15.01"
                stroke="#56D39E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

        default:
          return null;
      }
    })();

    if (SVG) SVG = React.cloneElement(SVG, { ...propsWithRef });

    return SVG;
  }
);

SvgElem.displayName = "SvgElem";

export default SvgElem;
