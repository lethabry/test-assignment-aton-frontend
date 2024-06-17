import { useState } from 'react';

type TypeInputValues = {
  [key: string]: string;
};

type TypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

function useForm(inputValues: TypeInputValues = {}) {
  const [values, setValues] = useState<TypeInputValues>(inputValues);
  const [errors, setErrors] = useState<TypeInputValues>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange: TypeChangeHandler = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest('form')?.checkValidity() || false);
  };
  return {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    setErrors,
    setIsValid,
  };
}

export default useForm;
