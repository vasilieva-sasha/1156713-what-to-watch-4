import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withActivePlayer from './with-active-player';
import {noop, film} from "../../common/test-data";

interface Props {
  onArticleHover: () => void;
  onCardLeave: () => void;
}

configure({
  adapter: new Adapter()
});

describe(`WithActivePalyer`, () => {
  it(`Should video play with delay`, () => {
    const MockComponent: React.FunctionComponent<Props> = ({onArticleHover, onCardLeave}: Props) => {
      return <div onMouseEnter={onArticleHover} onMouseLeave={onCardLeave}></div>;
    };

    const MockComponentWrapped = withActivePlayer(MockComponent);

    const wrapper = mount(
        <MockComponentWrapped film={film} onArticleHover={noop} onCardLeave={noop}/>
    );

    jest.useFakeTimers();

    wrapper.simulate(`mouseenter`);

    expect(wrapper.state().isPlaying).toBe(false);
    expect(setTimeout).toHaveBeenCalledTimes(1);

    jest.runAllTimers();

    expect(wrapper.state().isPlaying).toBe(true);

    wrapper.simulate(`mouseleave`);
    expect(wrapper.state().isPlaying).toBe(false);
  });
});
