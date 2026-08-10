import { Component, type ReactNode } from 'react';
import ClassButton from './ClassButton';

class IntermediateLayout extends Component {
  render(): ReactNode {
    return (
      <div style={{ border: '1px dashed gray', padding: '10px' }}>
        <h2>Level 1</h2>
        <ClassButton />
      </div>
    );
  }
}

export default IntermediateLayout;
