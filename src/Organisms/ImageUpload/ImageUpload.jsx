import React, { PureComponent } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropZone from '../../Molecules/DropZone/DropZone';
import ImageGrid from '../../Molecules/ImageGrid';
import './upload.css';

class ImageUpload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  handleDrop = files => {
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

  handleMove = (from, to) => {
    const { images } = this.state;
    const temp = [...images];
    const element = temp[from];
    temp.splice(from, 1);
    temp.splice(to, 0, element);
    this.setState({ images: temp });
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <DndProvider backend={HTML5Backend}>
          <DropZone onDrop={this.handleDrop} />
          <ImageGrid images={images} moveImage={this.handleMove} />
        </DndProvider>
      </>
    );
  }
}

export default ImageUpload;
