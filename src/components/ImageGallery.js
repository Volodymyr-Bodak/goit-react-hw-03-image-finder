
import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import s from "components/styles.module.css";
import PropTypes from "prop-types";


const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => onImageClick(image.id)}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;

