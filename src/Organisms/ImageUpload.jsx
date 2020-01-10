import React, { PureComponent } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropZone from '../Molecules/DropZone/DropZone';

class ImageUpload extends PureComponent {
  handleDrop = files => {
    console.log(files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = event => {
        this.setState(prev => ({
          images: [...prev.images, event.target.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <DropZone onDrop={this.handleDrop} />
      </DndProvider>
    );
  }
}

export default ImageUpload;
