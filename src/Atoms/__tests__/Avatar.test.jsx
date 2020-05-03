import React from 'react';
import { configure } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import { Avatar as MUIAvatar, Typography } from '@material-ui/core';
import Adapter from 'enzyme-adapter-react-16';
import Avatar from 'Atoms/Avatar';

configure({ adapter: new Adapter() });

const PROFILE_URL =
  'https://upload.wikimedia.org/wikipedia/commons/4/44/FA-18C_desert_refueling.jpg';

const DEFAULT_URL = 'https://i.imgur.com/oTPg6oz.jpg';

describe('<Avatar />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  const getWrapper = props =>
    shallow(
      <Avatar
        src={PROFILE_URL}
        name="Obi Wan Kenobi"
        nameProps={{ display: 'right' }}
        {...props}
      />
    );

  it('renders an avatar', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(MUIAvatar).prop('src')).toBe(PROFILE_URL);
    expect(wrapper.find(Typography).text()).toBe('Obi Wan Kenobi');
  });

  it('renders a default avatar', () => {
    const wrapper = getWrapper({ src: undefined });

    expect(wrapper.find(MUIAvatar).prop('src')).toBe(DEFAULT_URL);
    expect(wrapper.find(Typography).text()).toBe('Obi Wan Kenobi');
  });

  it('handles clicking the avatar', () => {
    const onClickHandler = jest.fn();
    const wrapper = getWrapper({ onClick: onClickHandler });

    wrapper.find(Typography).simulate('click');
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    wrapper
      .find('div')
      .at(1)
      .simulate('click');
    expect(onClickHandler).toHaveBeenCalledTimes(2);
  });
});
