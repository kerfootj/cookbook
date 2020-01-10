import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import './dropzone.css';
import { Typography } from '@material-ui/core';

class DropZone extends PureComponent {
  getClassName = (className, isActive) =>
    isActive ? `${className} ${className}-active` : className;

  render() {
    const { onDrop } = this.props;
    return (
      <Dropzone accept="image/*" onDrop={onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section className="container">
            <div
              {...getRootProps({
                className: this.getClassName('dropzone', isDragActive),
              })}
            >
              <input {...getInputProps()} />
              <Typography>
                <b>Choose a file </b>
                or drag it here
              </Typography>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default DropZone;
