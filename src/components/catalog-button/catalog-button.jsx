import React from "react";
import PropTypes from "prop-types";

const CatalogButton = (props) => {
  const {onCatalogButtonClick} = props;
  return (
    <div className="catalog__more">
      <button className="catalog__button"
        type="button"
        onClick={onCatalogButtonClick}>Show more</button>
    </div>
  );
};

CatalogButton.propTypes = {
  onCatalogButtonClick: PropTypes.func.isRequired
};

export default CatalogButton;
