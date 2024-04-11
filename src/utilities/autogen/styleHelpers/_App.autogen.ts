/***** FILE GENERATED BY SCSS-PLUGIN FOR VITE *****/
  
/***** BASE IMPORTS *****/
import classNames from "classnames";
import React from "react";

/***** TYPE DEFINITIONS *****/
type TStyledAppProps = React.CSSProperties & {
  "--test"?: string;
};

type TClassNames = 
  | "logo"
  | "react"
  | "card"

type TClassNamesObject = {
  [key in TClassNames]?: boolean;
}

type TStyledApp = (args: TStyledAppProps, className?: TClassNamesObject | TClassNames) => { 
  style: React.CSSProperties, 
  className: string
};

type TClassNamesApp = (className?: TClassNamesObject | TClassNames) => string;

/***** STYLED FUNCTION *****/
//@ts-ignore
export const styleApp: TStyledApp = (style, className = "logo") => ({ 
  style, 
  //@ts-ignore
  className: classNames(className)
});

export const classNamesApp: TClassNamesApp = (className) => classNames(className);