import { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import IntermediateLayout from './IntermediateLayout';

class ClassLayout extends Component<
  Record<string, never>,
  {
    theme: string;
  }
> {
  state: Readonly<{
    theme: string;
  }> = {
    theme: 'light',
  };

  toggleTheme = () => {
    this.setState((prev) => ({
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  };
  render() {
    const { theme } = this.state;
    const appStyle = {
      backgroundColor: theme === 'dark' ? '#222' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      minHeight: '100vh',
      padding: '20px',
    };
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme: this.toggleTheme }}>
        <div style={appStyle}>
          <h3>Class parent component</h3>
          <IntermediateLayout />
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default ClassLayout;
