import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from 'prop-types';
import withInputHandlers from './with-input-handlers';

const film = {
  title: ``,
  posterInfo: ``,
  background: ``,
  backgroundColor: ``
};

Enzyme.configure({
  adapter: new Adapter()
});

describe(`WithInputHandlers`, () => {
  it(`Text value work correctly`, () => {
    const MockComponent = ({onCommentType}) => {
      return (
        <textarea onChange={onCommentType} value="comment"></textarea>
      );
    };

    MockComponent.propTypes = {
      onCommentType: PropTypes.func.isRequired
    };

    const MockComponentWrapped = withInputHandlers(MockComponent);

    const onCommentType = jest.fn();

    const wrapper = mount(
        <MockComponentWrapped film={film} onReviewSubmit={() => {}} onCommentType={onCommentType}/>
    );

    const input = wrapper.find(`textarea`);

    expect(wrapper.state().comment).toEqual(null);

    input.simulate(`change`);

    expect(wrapper.state().comment).toEqual(`comment`);
  });

  it(`Rating select work correctly`, () => {
    const MockComponent = ({onRatingSelect}) => {
      return (
        <input value="2" onChange={onRatingSelect}/>
      );
    };

    MockComponent.propTypes = {
      onRatingSelect: PropTypes.func.isRequired
    };

    const MockComponentWrapped = withInputHandlers(MockComponent);

    const onRatingSelect = jest.fn();

    const wrapper = mount(
        <MockComponentWrapped film={film} onReviewSubmit={() => {}} onRatingSelect={onRatingSelect}/>
    );

    const input = wrapper.find(`input`);

    expect(wrapper.state().rating).toEqual(0);

    input.simulate(`change`);

    expect(wrapper.state().rating).toEqual(`2`);
  });
});
