import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useDrag, useDrop } from 'react-dnd';
import './grid.css';

const type = 'Image'; // Need to pass which type element can be draggable

const Image = ({ image, index, onMove }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const from = item.index;
      const to = index;
      // Don't replace items with themselves
      if (from === to) {
        return;
      }
      // Move the content
      onMove(from, to);
      // Update the index for dragged item directly to avoid flickering when half dragged
      // eslint-disable-next-line no-param-reassign
      item.index = to;
    },
  });

  const [, drag] = useDrag({
    item: { type, id: image.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // initialize drag and drop into the element
  drag(drop(ref));

  return (
    <div ref={ref} className="file-item">
      <img
        alt=""
        src={`https://i.imgur.com/${image.id}.jpg`}
        className="file-img"
      />
    </div>
  );
};

Image.propTypes = {
  image: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  index: PropTypes.number.isRequired,
  onMove: PropTypes.func.isRequired,
};

const ImageGrid = ({ images, onMove }) => {
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        index={index}
        key={`${image.id}-image`}
        onMove={onMove}
      />
    );
  };

  const renderHelperText = () => {
    return images.length ? (
      <Typography style={{ paddingTop: '8px' }}>Drag to Move Images</Typography>
    ) : (
      undefined
    );
  };
  return (
    <>
      {renderHelperText()}
      <section className="file-list">{images.map(renderImage)}</section>
    </>
  );
};

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onMove: PropTypes.func.isRequired,
};

export default ImageGrid;
