import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActivePlayer from './with-active-player';
import PropTypes from 'prop-types';

const mock = {
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

const MockComponent = ({onCardClick}) => <div><a onClick={onCardClick}/></div>;

MockComponent.propTypes = {
  onCardClick: PropTypes.func.isRequired
};

const MockComponentWrapped = withActivePlayer(MockComponent);

Enzyme.configure({
  adapter: new Adapter()
});

describe(`WithActivePalyer`, () => {
  it(`Should click happen`, () => {
    const onCardClick = jest.fn();

    const wrapper = mount(
        <MockComponentWrapped film={mock} onCardClick={onCardClick}/>
    );

    const link = wrapper.find(`a`);

    link.simulate(`click`);
    expect(onCardClick).toHaveBeenCalledTimes(1);
  });
});
