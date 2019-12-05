import React from 'react';
import { configure } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import { Typography, CardMedia, Avatar } from '@material-ui/core';
import RecipeCard from '../RecipeCard';

configure({ adapter: new Adapter() });

const IMAGE_URL =
  'https://upload.wikimedia.org/wikipedia/commons/8/89/Grilled_cheese_sandwich.jpg';
const PROFILE_URL =
  'https://upload.wikimedia.org/wikipedia/commons/4/44/FA-18C_desert_refueling.jpg';

describe('<RecipeCard />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  const getWrapper = props =>
    shallow(
      <RecipeCard
        imageUrl={IMAGE_URL}
        title="Grilled Cheese"
        description="A grilled cheese sandwich is a hot sandwich made with one or more varieties of cheese on bread"
        name="Joel Kerfoot"
        profilePic={PROFILE_URL}
        {...props}
      />
    );

  it('renders a recipe card with a custom avatar', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(CardMedia).prop('image')).toEqual(IMAGE_URL);
    expect(
      wrapper
        .find(Typography)
        .at(0)
        .text()
    ).toBe('Grilled Cheese');
    expect(wrapper.find(Avatar).prop('src')).toEqual(PROFILE_URL);
    expect(
      wrapper
        .find(Typography)
        .at(2)
        .text()
    ).toBe('Joel Kerfoot');
  });

  it('renders a recipe card without a custom avatar', () => {
    const wrapper = getWrapper({ profilePic: null });

    expect(wrapper.find(Avatar).prop('src')).toEqual(
      'https://i.imgur.com/oTPg6oz.jpg'
    );
  });
});
