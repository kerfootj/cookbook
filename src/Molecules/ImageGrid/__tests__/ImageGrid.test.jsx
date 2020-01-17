import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageGrid from '../ImageGrid';

configure({ adapter: new Adapter() });

const IMAGES = [{ id: '123abc', deleteHash: '00psi3z' }];

describe('<ImageGrid />', () => {
  const onMove = jest.fn();
  const getWrapper = props =>
    shallow(<ImageGrid images={IMAGES} onMove={onMove} {...props} />);

  it('renders without crashing', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('WithStyles(ForwardRef(Typography))').text()).toBe(
      'Drag to Move Images'
    );
    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('Image').prop('image')).toBe(IMAGES[0]);
    expect(wrapper.find('Image').prop('onMove')).toBe(onMove);
  });

  it('renders properly without any images', () => {
    const wrapper = getWrapper({ images: [] });

    expect(wrapper.find('WithStyles(ForwardRef(Typography))').length).toBe(0);
    expect(wrapper.find('Image').length).toBe(0);
  });
});
