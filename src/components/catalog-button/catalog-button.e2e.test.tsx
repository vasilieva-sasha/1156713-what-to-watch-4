import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import CatalogButton from "./catalog-button";

configure({
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

