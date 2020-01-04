import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Dialog } from '@material-ui/core';
import DeleteRecipe from '../DeleteRecipe';

configure({ adapter: new Adapter() });

describe('<DeleteRecipe />', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  const getWrapper = props =>
    shallow(<DeleteRecipe classes={{}} title="test" recipeId={0} {...props} />);

  it('renders without crashing', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(Dialog).length).toBe(1);
    expect(wrapper.find(Dialog).prop('open')).toBe(false);
    expect(wrapper.find(Button).length).toBe(3);
  });

  it('handles opening and closing the dialog', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(Dialog).prop('open')).toBe(false);
    wrapper
      .find(Button)
      .at(0)
      .simulate('click');
    expect(wrapper.find(Dialog).prop('open')).toBe(true);
    wrapper
      .find(Button)
      .at(2)
      .simulate('click');
    expect(wrapper.find(Dialog).prop('open')).toBe(false);
  });
});
