import * as React from "react";
import * as renderer from "react-test-renderer";
import VideoPlayer from "./video-player";
import {film} from "../../common/test-data";


describe(`VideoPlayer`, () => {
  it(`Video player renders correctly`, () => {
    const tree = renderer.create(
        <VideoPlayer isPlaying={false} film={film} />
    );

    expect(tree).toMatchSnapshot();
  });
});
