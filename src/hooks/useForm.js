import { useState } from 'react';

const useForm = (cb) => {
  const [item, setItem] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    cb(item);
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  return [handleSubmit, handleChange, item];
};

export default useForm;
