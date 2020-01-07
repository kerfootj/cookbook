import React from 'react';
import { configure } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import { Redirect } from 'react-router-dom';
import { InputBase } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Search from '../Search';

configure({ adapter: new Adapter() });

describe('<Search />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  const getWrapper = () => shallow(<Search />);

  it('renders without crashing', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(InputBase).length).toBe(1);
    expect(wrapper.find(MenuIcon).length).toBe(1);
    expect(wrapper.find(SearchIcon).length).toBe(1);
    expect(wrapper.find(Redirect).length).toBe(0);
  });

  it('handles changing focus', () => {
    const wrapper = getWrapper();
    const instance = wrapper.instance();

    expect(wrapper.state().focused).toBe(false);
    instance.handleFocus(true)();
    expect(wrapper.state().focused).toBe(true);
  });

  it('handles input value changes', () => {
    const wrapper = getWrapper();
    const instance = wrapper.instance();

    expect(wrapper.state().search).toBe('');
    instance.handleChange({ target: { value: 'test' } });
    expect(wrapper.state().search).toBe('test');
    expect(wrapper.find(InputBase).prop('value')).toBe('test');
  });

  it('handles submitting the search', () => {
    const wrapper = getWrapper();
    const instance = wrapper.instance();

    wrapper.setState({ search: 'test' });
    instance.handleSubmit();

    // componentDidUpdate clears search after redirect
    expect(wrapper.state().search).toBe('');
  });
});
