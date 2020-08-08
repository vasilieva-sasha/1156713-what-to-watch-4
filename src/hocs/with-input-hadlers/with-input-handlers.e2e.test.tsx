import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withInputHandlers from './with-input-handlers';
import {noop, film} from "../../common/test-data";

interface PropsOne {
  onCommentType: () => void;
}

interface PropsTwo {
  onRatingSelect: () => void;
}

configure({
  adapter: new Adapter()
});

describe(`WithInputHandlers`, () => {
  it(`Text value work correctly`, () => {
    const MockComponent: React.FunctionComponent<PropsOne> = ({onCommentType}: PropsOne) => {
      return (
        <textarea onChange={onCommentType} value=""></textarea>
      );
    };

    const MockComponentWrapped = withInputHandlers(MockComponent);

    const onCommentType = jest.fn();

    const wrapper = mount(
        <MockComponentWrapped film={film} onReviewSubmit={noop} onCommentType={onCommentType}/>
    );

    const input = wrapper.find(`textarea`);

    input.simulate(`change`, {
      target: {
        value: `comment`,
      },
    });

    expect(wrapper.state().comment).toEqual(`comment`);
  });

  it(`Rating select work correctly`, () => {
    const MockComponent: React.FunctionComponent<PropsTwo> = ({onRatingSelect}: PropsTwo) => {
      return (
        <input value="2" onChange={onRatingSelect}/>
      );
    };

    const MockComponentWrapped = withInputHandlers(MockComponent);

    const onRatingSelect = jest.fn();

    const wrapper = mount(
        <MockComponentWrapped film={film} onReviewSubmit={noop} onRatingSelect={onRatingSelect}/>
    );

    const input = wrapper.find(`input`);

    expect(wrapper.state().rating).toEqual(5);

    input.simulate(`change`);

    expect(wrapper.state().rating).toEqual(`2`);
  });
});
