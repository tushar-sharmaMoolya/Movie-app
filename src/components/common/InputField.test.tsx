// src/components/common/InputField.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from './InputField';

describe('InputField Component', () => {
  test('renders input with label', () => {
    render(<InputField label="Test Label" name="test" value="" onChange={() => {}} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('renders input with placeholder', () => {
    render(
      <InputField
        placeholder="Enter text"
        name="test"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  test('shows required indicator when required', () => {
    render(
      <InputField
        label="Required Field"
        name="test"
        value=""
        onChange={() => {}}
        required
      />
    );
    const requiredSpan = screen.getByText('*');
    expect(requiredSpan).toBeInTheDocument();
  });

  test('displays error message when touched and has error', () => {
    render(
      <InputField
        label="Test"
        name="test"
        value=""
        onChange={() => {}}
        error="This is an error"
        touched
      />
    );
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  test('does not display error when not touched', () => {
    render(
      <InputField
        label="Test"
        name="test"
        value=""
        onChange={() => {}}
        error="Error message"
        touched={false}
      />
    );
    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });

  test('calls onChange handler', () => {
    const handleChange = jest.fn();
    render(
      <InputField
        name="test"
        value=""
        onChange={handleChange}
      />
    );
    const input = screen.getByDisplayValue('');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('calls onBlur handler', () => {
    const handleBlur = jest.fn();
    render(
      <InputField
        name="test"
        value=""
        onChange={() => {}}
        onBlur={handleBlur}
      />
    );
    const input = screen.getByDisplayValue('');
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  test('applies error class when error and touched', () => {
    render(
      <InputField
        name="test"
        value=""
        onChange={() => {}}
        error="Error"
        touched
      />
    );
    const input = screen.getByDisplayValue('');
    expect(input).toHaveClass('input-error');
  });

  test('renders with different input types', () => {
    const { rerender } = render(
      <InputField type="email" name="test" value="" onChange={() => {}} />
    );
    expect(screen.getByDisplayValue('') as HTMLInputElement).toHaveAttribute('type', 'email');

    rerender(<InputField type="password" name="test" value="" onChange={() => {}} />);
    expect(screen.getByDisplayValue('') as HTMLInputElement).toHaveAttribute('type', 'password');
  });
});
