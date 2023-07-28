
import React from "react";
import PropTypes from "prop-types";
import s from "components/styles.module.css";

const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img src={src} alt={alt} className={s.ImageGalleryItemimage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;