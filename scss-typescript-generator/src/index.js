/***** BASE IMPORTS *****/
import fs from 'fs';
import path from 'path';
import sass from 'sass';

function extractCssVariables(content) {
  const regex = /(--[a-zA-Z0-9_-]+)\s*:/g;
  const matches = content.matchAll(regex);
  const variables = {};

  for (const match of matches) {
    const variableName = match[1];
    variables[variableName] = '';
  }

  return variables;
}

function extractFirstCssClassName(content) {
  const regex = /\.([a-zA-Z0-9_-]+)/;
  const matches = content.match(regex);

  return matches ? matches[1] : '';
}

function extractAllClassNames(content) {
  const regex = /\.([\w-]+)/g;
  const matches = content.matchAll(regex);
  const classNames = [];

  for (const match of matches) {
    const className = match[1];

    // skip if there was a number before or after the dot
    if (/^\d+\.\d+$/.test(className)) {
      continue;
    }

    // skip if the class name is a number (since classnames cannot be numbers)
    if (!isNaN(Number(className))) {
      continue;
    }

    // skip if the class name (not actually a className) is a unit (e.g. 1px, 2em, 3rem, etc.)
    if (/(em|px|rem|vh|vw|ch|ex|cm|mm|in|pt|pc|vmin|vmax|deg|grad|rad|turn|s|ms|Hz|kHz|%|fr|dpi|dpcm|dppx)$/.test(className)) {
      continue;
    }

    classNames.push(className.replace('.', ''));
  }

  return classNames;
}

function generateFunction(variables, fileName, className = '', allClassnames = []) {
  const typeName = `TStyled${fileName}`;
  const typeClassName = `TClassNames${fileName}`;

  const content = `
/***** FILE GENERATED BY SCSS-PLUGIN FOR VITE *****/
  
/***** BASE IMPORTS *****/
import classNames from "classnames";
import React from "react";

/***** TYPE DEFINITIONS *****/
type ${typeName}Props = React.CSSProperties & {
  ${Object.keys(variables).map((variable) => `"${variable}"?: string;`).join('\n  ')}
};

type TClassNames = \n  | ${[...new Set(allClassnames)].map((element) => `"${element}"`).join('\n  | ')}

type TClassNamesObject = {
  [key in TClassNames]?: boolean;
}

type ${typeName} = (args: ${typeName}Props, className?: TClassNamesObject | TClassNames) => { 
  style: React.CSSProperties, 
  className: string
};

type ${typeClassName} = (className?: TClassNamesObject | TClassNames) => string;

/***** STYLED FUNCTION *****/
//@ts-ignore
export const style${fileName}: ${typeName} = (style, className = "${className}") => ({ 
  style, 
  //@ts-ignore
  className: classNames(className)
});

export const classNames${fileName}: ${typeClassName} = (className) => classNames(className);
  `.trim() + '\n';

  return content;
}

/**
 * Generates a vite plugin that generates TypeScript files from SCSS files. The TypeScript files
 * will contain a function that can be used to style React components and provides intellisense
 * for CSS variables as well as possible classNames that can be applied
 */
export function scssTypescriptGenerator({ 
  outdir = 'src/utilities/autogen/styleHelpers',
} = {}) {
  return {
    name: 'scss-typescript-generator',
    async transform(code, id) {
      if (id.endsWith('.scss')) {
        const cssString = sass.renderSync({ data: code }).css.toString();
        const variables = extractCssVariables(cssString);
        const className = extractFirstCssClassName(cssString);
        const AllClassnames = extractAllClassNames(cssString);
        const currentDir = process.cwd();
        const outputDirectory = currentDir + '/' + outdir
        const functionName = id
          .replace('.scss', '')
          .split('/')
          .pop()
          .replace(/^_/, '');
        const fileName = `_${functionName}.autogen.ts`;
        const functionContent = generateFunction(variables, functionName, className, AllClassnames);
        const outputFile = path.join(currentDir + '/' + outdir, fileName);

        fs.mkdirSync(outputDirectory, { recursive: true });
        fs.writeFileSync(outputFile, functionContent);

        return {
          code,
          map: null,
        };
      }
    },
  };
}
