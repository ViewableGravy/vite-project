// kawaii-scss-vars-plugin.js

import fs from 'fs';
import path from 'path';
import sass from 'sass';

function extractCssVariables(content) {
  // UwU Here, we're using a regex to find CSS variables in the SCSS content!
  const regex = /(--[a-zA-Z0-9_-]+)\s*:/g;
  const matches = content.matchAll(regex);
  const variables = {};

  for (const match of matches) {
    const variableName = match[1];
    variables[variableName] = ''; // You can put a default value or leave it empty~
  }

  return variables;
}

function generateFunction(variables, scssName = "styles.scss") {
  const fileName = scssName.replace('.scss', '').split('/').pop();
  const typeName = `TGenerate${fileName}Styles`;

  const content = `
    type ${typeName} = (params: React.CSSProperties & {
      ${Object.keys(variables).map((variable) => `"${variable}"?: string;`).join('\n')}
    }) => React.CSSProperties

    export const generate${fileName}Styles: ${typeName} = (params) => params
  `

  return content;
}

export function kawaiiScssVarsPlugin() {
  return {
    name: 'kawaii-scss-vars-plugin',
    // UwU The transform hook allows us to modify the content of each file!
    async transform(code, id) {
      console.log('here')
      if (id.endsWith('.scss')) {
        const result = sass.renderSync({ data: code }); // Compile SCSS to CSS
        const variables = extractCssVariables(result.css.toString());
        const directory = path.dirname(id);
        const functionName = 'applyStyles'; // You can change this if you want!

        const functionContent = generateFunction(variables, id);
        const outputFile = path.join(directory, `${functionName}.ts`);

        fs.writeFileSync(outputFile, functionContent); // Write the function file

        // UwU We return the modified code without any changes~
        return {
          code,
          map: null,
        };
      }
    },
  };
}
