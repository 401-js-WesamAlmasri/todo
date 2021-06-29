import { useState } from 'react';

const useForm = (cb, initialState = {}, reset=true) => {
  const [items, setItems] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(reset) e.target.reset();
    cb(items);
  };

  const handleChange = (e) => {
    if(e.target.type === 'checkbox') e.target.value = e.target.checked ? true : false;  
    setItems({ ...items, [e.target.name]: e.target.value });
  };
  return [handleSubmit, handleChange, items];
};

export default useForm;
