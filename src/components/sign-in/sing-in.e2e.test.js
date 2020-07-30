import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in";

Enzyme.configure({
  adapter: new Adapter()
});

const mock = {
  login: `example@mail.ru`,
  password: `fhhjg`
};

describe(`singInComponent`, () => {
  it(`Submit login`, () => {
    const onSubmit = jest.fn();
    const singIn = mount(
        <SignIn onSubmit={onSubmit} singInError={false} />
    );

    const {loginRef} = singIn.instance();
    loginRef.current.value = mock.login;

    const {passwordRef} = singIn.instance();
    passwordRef.current.value = mock.password;

    const form = singIn.find(`form`);

    form.simulate(`submit`);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(mock);
  });

});
