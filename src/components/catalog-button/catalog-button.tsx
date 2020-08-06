import * as React from "react";

interface Props {
  onCatalogButtonClick: () => void;
}

const CatalogButton: React.FunctionComponent<Props> = (props: Props) => {
  const {onCatalogButtonClick} = props;
  return (
    <div className="catalog__more">
      <button className="catalog__button"
        type="button"
        onClick={onCatalogButtonClick}>Show more</button>
    </div>
  );
};

export default CatalogButton;
