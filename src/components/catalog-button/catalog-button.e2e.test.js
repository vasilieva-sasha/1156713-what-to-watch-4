import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CatalogButton from "./catalog-button";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`CatalogButtonComponent`, () => {
  it(`Click on button happens`, () => {
    const onCatalogButtonClick = jest.fn();

    const catalogButton = mount(
        <CatalogButton onCatalogButtonClick={onCatalogButtonClick}/>
    );

    const button = catalogButton.find(`button`);

    button.simulate(`click`);

    expect(onCatalogButtonClick).toBeCalledTimes(1);
  });
});

