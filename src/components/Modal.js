import React from "react";
import PropTypes from "prop-types";
import s from "components/styles.module.css";

const Modal = ({ image, onClose }) => {
  return (
    <div className={s.Overlay} onClick={onClose}>
      <div className={s.Modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
