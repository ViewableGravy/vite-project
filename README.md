
# scss-typescript-vite-plugin

A Vite plugin for automatically generating typescript helper functions relating to corresponding .scss within a [React](https://react.dev/) project. The primary function generated from the .scss file will provide functionality to apply styling and classNames that are typed according to the .scss file.

The standard format of the exported helper function is as follows:

```ts
type TStyledMyComponent = (args: TStyledMyComponentProps, className?: TClassNamesObject | TClassNames) => { 
  style: React.CSSProperties, 
  className: string
};
```

In the above example, the TStyledMyComponent type (and correlating implementation) are automatically generated from the file: `MyComponent.scss` and is generated inside a new file named `MyComponent.autogen.ts`. Future version of this package will provide customization relating to the naming and folder structure.

The primary purpose of this library is to provide correct types for using css variables within a component in React. For example, take the following scenario:
```scss
//MyComponent.scss
.MyComponent {
  --background-color: red; //default to red

  &__element {
    background-color: var(--background-color)
  }
}
```
```tsx
//myComponent.tsx
const MyComponent = ({ color }: { color: string }) => {
  return (
    <div style={{ '--background-color': color }} className="MyComponent__element">
      <div>Hi there 👋</div>
    </div>
  )
}
```

In this example, we are unfortunately going to get a type error for the style. This can be resolved using the `as` keyword but this is ugly, repetitive, prone to error (since you will be overriding the type) and does not restrict the variables, meaning that you could then provide any css variable even if it doesn't exist.

To tackle this, we now have the automatically generated helpers from this plugin. With this we can solve this problem easily and cleanly:
```tsx
//myComponent.tsx
import { elementStyling } from 'myComponent.autogen.ts'

const MyComponent = ({ color }: { color: string }) => {
  const elementStyling = styleMyComponent({ '--background-color': color }, "MyComponent__element")
  return (
    <div {...elementStyling}>
      <div>Hi there 👋</div>
    </div>
  )
}
```

Because our helper function is typed based on the file, we get intellisense for both the styles (first argument) as well as the className (second argument) and are returned an object with the style and className attribute which we can destructure into our div. If we only needed on of this parameters, we could also just destructure the corresponding value and pass that directly to the div.

One extra benefit that we get from this approach is that changes to an scss file will propagate the types to the typescript components, meaning that we will instantly get a typescript error if we attempt to remove a className that is in use by an element. In larger code, over larger periods of time, this becomes extremely useful as it helps ensure that modifications to the styling will not trigger unwanted side effects.

## Expected Features

1. Customization
I am looking at updating this package in the near future with more customization, this includes file naming formats, exclusion directories, etc. One thing I have encountered so far is conflicts with tools like TanstackRouter and NextJS, where the files are used to generate route files, and with this tool, conflicts can occur, so tackling these issues will be first on the list
2. Extra Helpers
At a minimum, I would like to provide two functions, one for styles and one for classNames. I think this is beneficial because the classNames being typed in typescript is very useful, but having the extra style functionality seems unnecessary
3. Anything Else
This is a small package, that aimed at making my life easier in my personal projects, I don't expect it to change the world, but if you have any suggestions that fit within the scope of this library, let me know and I can consider it. Feel free to contact me at contact@gravy.cc and I'll get back to you
