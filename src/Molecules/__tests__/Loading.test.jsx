import React from 'react';
import { configure } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import Loading from '../Loading';

configure({ adapter: new Adapter() });

describe('<Loading />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('renders the loading img', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.find('img').length).toBe(1);
  });
});
