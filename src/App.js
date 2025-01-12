import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Logo from './components/Logo';
import Menu, {getMenuItems} from './components/Menu';
import Drivers from './components/Drivers';

function App() {
  const menuItems = getMenuItems();
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Logo />
        </header>
        
        <div className="App-body">
          <Menu />
          <Routes>
            {menuItems
              .filter(menu => menu.url !== "/")
              .map(menu => (
                <Route 
                  key={menu.title} 
                  path={menu.url} 
                  element={React.createElement(require(`./components/${menu.title}`).default)} 
                />
            ))}
            
            <Route path="/" exact element={<Drivers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;