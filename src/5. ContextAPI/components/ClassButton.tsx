import { Component, type Context, type ReactNode } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class ClassButton extends Component {
  static contextType?:
    | Context<{
        theme: string;
        toggleTheme: () => void;
      }>
    | undefined = ThemeContext;

  declare context: React.ContextType<typeof ThemeContext>;

  render(): ReactNode {
    const { theme, toggleTheme } = this.context;
    return (
      <div style={{ padding: '10px', background: '#eee', color: '#000' }}>
        <h4>Level 2 Class Button</h4>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>

        <button onClick={toggleTheme}>Change theme</button>
      </div>
    );
  }
}

export default ClassButton;
