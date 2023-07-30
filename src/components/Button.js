import React from "react";
import PropTypes from "prop-types";
import s from "components/styles.module.css";


const Button = ({ onClick, showButton }) => {
  return (
    showButton && (
      <button className={s.Buttonload} onClick={onClick}>
        Load more
      </button>
    )
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
