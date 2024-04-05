/***** CONSTS *****/
import './App.scss'

import { MyComponent } from './myComponent/myComponent.tsx'
import { styleApp } from './_App.autogen.ts'

function App() {
  const appStyles = styleApp({}, "react")

  return (
    <div {...appStyles}>  
      <MyComponent />
    </div>
  )
}

export default App
