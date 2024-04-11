type ScssTypescriptGeneratorOptions = {
    outdir?: string
}

/**
 * Generates a vite plugin that generates TypeScript files from SCSS files. The TypeScript files
 * will contain a function that can be used to style React components and provides intellisense
 * for CSS variables as well as possible classNames that can be applied
 */
export function scssTypescriptGenerator(args?: ScssTypescriptGeneratorOptions): {
    name: string;
    transform(code: any, id: any): Promise<{
        code: any;
        map: any;
    }>;
};
