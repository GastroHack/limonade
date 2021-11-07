import React, { useState } from 'react';
import { Menu } from './Menu';
import { Questionnaire } from './Questionnaire';


export const App = () => {

  const [menuToggled, toggleMenu] = useState(false);
  return (
    menuToggled ? <Menu /> :
    <Questionnaire toggleMenu={toggleMenu as () => {}}/>
    );
}
    
export default App;
