/***** BASE IMPORTS *****/
import './_MyComponent.scss';

/***** UTILITIES *****/
import { styleMyComponent } from './_MyComponent.autogen';

/***** COMPONENT START *****/
export const MyComponent = () => {
  /***** RENDER HELPERS *****/
  const styles = {
    outer: styleMyComponent({
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
      <p>
        Markup should represent structure, not style. Minimise the use of
        multi-line classNames or inline styles within the JSX.
      </p>
    </div>
  )
};
