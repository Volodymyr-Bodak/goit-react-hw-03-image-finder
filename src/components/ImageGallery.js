
import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import s from "components/styles.module.css";


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

export default ImageGallery;

