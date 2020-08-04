import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActivePlayer from './with-active-player';
import PropTypes from 'prop-types';

const mock = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: {
    score: `8,9`,
    level: `Very good`,
    count: 240
  },
  text: [``, ``],
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
};


Enzyme.configure({
  adapter: new Adapter()
});

describe(`WithActivePalyer`, () => {
  it(`Should click happen`, () => {
    const MockComponent = ({onCardClick}) => <div><a onClick={onCardClick}/></div>;

    MockComponent.propTypes = {
      onCardClick: PropTypes.func.isRequired,
    };

    const MockComponentWrapped = withActivePlayer(MockComponent);

    const onCardClick = jest.fn();

    const wrapper = mount(
        <MockComponentWrapped film={mock} onCardClick={onCardClick} onMouseEnter={() => {}} onMouseLeave={() => {}}/>
    );

    const link = wrapper.find(`a`);

    link.simulate(`click`);

    expect(onCardClick).toHaveBeenCalledTimes(1);
  });

  it(`Should video play with delay`, () => {
    const MockComponent = ({onArticleHover, onCardLeave}) => <div onMouseEnter={onArticleHover} onMouseLeave={onCardLeave}></div>;

    MockComponent.propTypes = {
      onArticleHover: PropTypes.func.isRequired,
      onCardLeave: PropTypes.func.isRequired
    };

    const MockComponentWrapped = withActivePlayer(MockComponent);

    const wrapper = mount(
        <MockComponentWrapped film={mock} onCardClick={() => {}} onArticleHover={() => {}} onCardLeave={() => {}}/>
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
