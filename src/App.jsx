import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/Sidebar";

library.add(fas);

const lightTheme = {
  mode: 'light',
  sidebarBg: '#fff',
  sidebarBgHover: '#f0f2ff',
  sidebarBgActive: '#f0f2ff',
  text: '#97a5b9',
  textHover: '#091b31',
  textActive: '#0000b5',
  logo: '#0000b5',
  buttonBg: '#fff',
  buttonBgActive: '#e2e8f0',
};
const darkTheme = {
  mode: 'dark',
  sidebarBg: '#202127',
  sidebarBgHover: '#2D2E34',
  sidebarBgActive: '#393A3F',
  text: '#f0f2ff',
  textHover: '#f0f2ff',
  textActive: '#f0f2ff',
  logo: '#3B82F6',
  buttonBg: '#202127',
  buttonBgActive: '#4B5966',
};

const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);
  const themeObj = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeObj}>
      <Sidebar color={theme} onToggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export default App;
