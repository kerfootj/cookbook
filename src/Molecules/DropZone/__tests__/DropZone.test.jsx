import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DZ from 'react-dropzone';
import DropZone from '../DropZone';

configure({ adapter: new Adapter() });

describe('<DropZone />', () => {
  const onDrop = jest.fn();
  const getWrapper = props =>
    shallow(<DropZone onDrop={onDrop} loading={false} {...props} />);

  it('renders without crashing', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(DZ).length).toBe(1);
  });

  it('renders dropzone text content', () => {
    const wrapper = getWrapper().shallow();
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').text()).toBe(
      'Choose a file or drag it here'
    );
  });

  it('renders dropzone loading content', () => {
    const wrapper = getWrapper({ loading: true }).shallow();
    expect(
      wrapper.find('WithStyles(ForwardRef(CircularProgress))').length
    ).toBe(1);
  });

  it('gets the right class name', () => {
    const wrapper = getWrapper();
    const instance = wrapper.instance();

    expect(instance.getClassName('test', false)).toBe('test');
    expect(instance.getClassName('test', true)).toBe('test test-active');
  });
});
