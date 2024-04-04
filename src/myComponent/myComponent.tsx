import './_MyComponent.scss';
import { styledMyComponent } from './applyStyles';

export const MyComponent = () => {
  const [styles, { className }] = styledMyComponent({
    "--background-color": "red"
  })

  return (
    <div className={className} style={styles}>

    </div>
  )
};
