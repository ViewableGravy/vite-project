import './_MyComponent.scss';
import { styleMyComponent } from './applyStyles';

type TClassNames = 
  | "MyComponent"
  | "MyComponent__test"
  | "MyComponent__test2"
  | "MyComponent__myComponent"
  | "MyComponent--test"

type Test = {
  MyComponent?: boolean;
  MyComponent__test?: boolean;
  MyComponent__test2?: boolean;
  MyComponent__myComponent?: boolean;
  "MyComponent--test"?: boolean;
};

const example = <T extends Test | TClassNames>( test: T ) => ({
  "yes": false
})

example({ "MyComponent--test": false, test: false })

export const MyComponent = () => {
  const styles = {
    outer: styleMyComponent({
      "--background-color": "red",
      "--color": "blue",
      "--padding": "10px"
    }, "MyComponent")
  }
  

  return (
    <div {...styles.outer}>

    </div>
  )
};
