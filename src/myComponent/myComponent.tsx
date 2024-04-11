/***** BASE IMPORTS *****/
import './_MyComponent.scss';

/***** UTILITIES *****/
import { styleMyComponent as styler, classNamesMyComponent as cn } from 'src/utilities/autogen/styleHelpers/_MyComponent.autogen.ts';

/***** COMPONENT START *****/
export const MyComponent = () => {
  /***** RENDER HELPERS *****/
  const styles = {
    outer: styler({
      "--background-color": "red",
      "--color": "blue",
      "--padding": "10px",
    }, {
      "MyComponent__myComponent": true,
      "MyComponent--test": true,
    })
  }

  /***** RENDER *****/
  return (
    <div {...styles.outer}>
      <p className={cn("MyComponent")}>
        Markup should  represent structure, not style. Minimise the use of
        multi-line classNames or inline styles within the JSX.
      </p>
    </div>
  )
};
