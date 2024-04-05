
# scss-typescript-vite-plugin


A simple vite plugin that will automatically generate a helper function for each .scss file in a project that provides types relating to available classNames and styles that can be applied to 
elements.


The returned helper function has the following signature:


```ts
type TStyledMyComponent = (args: TStyledMyComponentProps, className?: TClassNamesObject | TClassNames) => { 
  style: React.CSSProperties, 
  className: string
};
```


Where the className is typed according to classes in the .scss file and the styles include any css variables available in the code. This is particularly helpful when needing to apply refined styling to an element without wanting to apply an actual, unoverrideable style.