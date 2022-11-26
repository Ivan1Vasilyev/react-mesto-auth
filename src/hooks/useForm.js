import { useState, useCallback } from 'react';

const useForm = inputValues => {
  const [values, setValues] = useState(inputValues);

  const handleChange = useCallback(
    e => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    },
    [values]
  );

  return { values, setValues, handleChange };
};

export default useForm;
