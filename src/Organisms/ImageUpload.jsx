import React, { PureComponent } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class ImageUpload extends PureComponent {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <></>
      </DndProvider>
    );
  }
}

export default ImageUpload;
