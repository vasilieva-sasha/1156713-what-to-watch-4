import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";

const mock = {
  poster: ``,
  preview: ``
};

describe(`VideoPlayer`, () => {
  it(`Video player renders correctly`, () => {
    const tree = renderer.create(
        <VideoPlayer isPlaying={false} film={mock} />
    );

    expect(tree).toMatchSnapshot();
  });
});
