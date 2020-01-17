import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Compress from 'compress.js';
import DropZone from '../Molecules/DropZone/DropZone';
import ImageGrid from '../Molecules/ImageGrid/ImageGrid';

class ImageUpload extends PureComponent {
  static propTypes = {
    onUpload: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleDrop = async files => {
    const { onUpload } = this.props;

    this.setState({ loading: true });

    const compress = new Compress();
    const compressed = await compress.compress(files, {
      size: 10,
      quality: 0.8,
    });

    const images = [];
    compressed.forEach(file => {
      images.push(this.uploadToImgur(file.data));
    });

    onUpload(await Promise.all(images));
    this.setState({ loading: false });
  };

  uploadToImgur = async file => {
    const body = new FormData();
    body.append('image', file);

    const key = process.env.REACT_APP_IMGUR_CLIENT_ID;

    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: new Headers({
          Authorization: `Client-ID ${key}`,
        }),
        body,
      });
      const { data } = await response.json();
      return { id: data.id, deleteHash: data.deletehash };
    } catch (error) {
      return undefined;
    }
  };

  render() {
    const { images, onMove } = this.props;
    const { loading } = this.state;
    return (
      <>
        <DropZone onDrop={this.handleDrop} loading={loading} />
        <DndProvider backend={HTML5Backend}>
          <ImageGrid images={images} onMove={onMove} />
        </DndProvider>
      </>
    );
  }
}

export default ImageUpload;
