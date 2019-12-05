import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TextField as MUITextField } from '@material-ui/core';
import TextField, {
  EmailTextField,
  NumberTextField,
  PasswordTextField,
  RecipeTextField,
  TimeTextField,
} from '../TextFields';

configure({ adapter: new Adapter() });

describe('<TextFields />', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a EmailTextField', () => {
    const wrapper = mount(
      <EmailTextField email="test@example.com" onChange={mockOnChange} />
    );
    expect(wrapper.find(MUITextField).length).toBe(1);
  });

  it('renders a NumberTextField', () => {
    const wrapper = mount(
      <NumberTextField title="number" onChange={mockOnChange} />
    );
    expect(wrapper.find(MUITextField).length).toBe(1);
  });

  it('renders a PasswordTextField', () => {
    const wrapper = mount(<PasswordTextField onChange={mockOnChange} />);
    expect(wrapper.find(MUITextField).length).toBe(1);
  });

  it('renders a RecipeTextField', () => {
    const wrapper = mount(
      <RecipeTextField title="time" onChange={mockOnChange} />
    );
    expect(wrapper.find(MUITextField).length).toBe(1);
  });

  it('renders a TimeTextField', () => {
    const wrapper = mount(
      <TimeTextField title="time" onChange={mockOnChange} onBlur={mockOnBlur} />
    );
    expect(wrapper.find(MUITextField).length).toBe(1);
  });

  it('renders a TextField', () => {
    const wrapper = mount(<TextField onChange={mockOnChange} />);
    expect(wrapper.find(MUITextField).length).toBe(1);
  });
});
