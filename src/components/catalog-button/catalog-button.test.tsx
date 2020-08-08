import * as React from "react";
import * as renderer from "react-test-renderer";
import CatalogButton from "./catalog-button";
import {noop} from '../../common/test-data';

describe(`CatalogButtonComponent`, () => {
  it(`button renders correctly`, () => {
    const tree = renderer.create(
        <CatalogButton onCatalogButtonClick={noop} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
