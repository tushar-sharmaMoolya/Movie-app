// hooks/useFormInput.js
import { useState, useCallback } from 'react';

/**
 * Custom hook for managing form input state and validation
 * @param {string} initialValue - Initial value for the input
 * @param {function} validator - Optional validation function
 * @returns {object} - Object containing value, handlers, and status
 */
export const useFormInput = (initialValue = '', validator = null) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (validator && touched) {
      const validationError = validator(newValue);
      setError(validationError || '');
    }
  }, [validator, touched]);

  const handleBlur = useCallback(() => {
    setTouched(true);
    if (validator) {
      const validationError = validator(value);
      setError(validationError || '');
    }
  }, [validator, value]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError('');
    setTouched(false);
  }, [initialValue]);

  return {
    value,
    setValue,
    error,
    touched,
    bind: {
      value,
      onChange: handleChange,
      onBlur: handleBlur,
    },
    reset,
    setTouched,
  };
};

export default useFormInput;
