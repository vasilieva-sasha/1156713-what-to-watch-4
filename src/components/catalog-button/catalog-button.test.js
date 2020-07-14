import React from "react";
import renderer from "react-test-renderer";
import CatalogButton from "./catalog-button";

describe(`CatalogButtonComponent`, () => {
  it(`button renders correctly`, () => {
    const tree = renderer.create(
        <CatalogButton onCatalogButtonClick={() => {}} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
