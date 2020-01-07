import React from 'react';
import { configure } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import { Typography } from '@material-ui/core';
import NotFound from '../NotFound';

configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('renders the recipe not found page', () => {
    const wrapper = shallow(<NotFound search="test" />);
    expect(wrapper.find(Typography).text()).toBe('0 recipe results for "test"');
    expect(wrapper.find('img').length).toBe(1);
  });
});
