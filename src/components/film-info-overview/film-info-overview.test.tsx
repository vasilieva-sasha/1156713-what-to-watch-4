import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmInfoOverview from "./film-info-overview";
import {film} from "../../common/test-data";

describe(`FilmOverviewComponent`, () => {
  it(`Overview renders correctly`, () => {
    const tree = renderer.create(
        <FilmInfoOverview film={film} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
