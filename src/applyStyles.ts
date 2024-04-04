
    type TGenerateAppStyles = (params: React.CSSProperties & {
      "--test"?: string;
    }) => React.CSSProperties

    export const generateAppStyles: TGenerateAppStyles = (params) => params
  