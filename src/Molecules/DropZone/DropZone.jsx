import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import './dropzone.css';
import { CircularProgress, Typography } from '@material-ui/core';

class DropZone extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
  };

  getClassName = (className, isActive) =>
    isActive ? `${className} ${className}-active` : className;

  renderContent = () => {
    const { loading } = this.props;
    return loading ? (
      <CircularProgress size={25} />
    ) : (
      <Typography>
        <b>Choose a file </b>
        or drag it here
      </Typography>
    );
  };

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
              {this.renderContent()}
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default DropZone;
