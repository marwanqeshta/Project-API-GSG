import React, { useState, useEffect } from 'react';

const inputsArray = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    id: 'cities',
    name: 'cities',
    type: 'textarea',
    label: 'Cities',
  },
];

const StoreForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    cities: '',
    isGetFirstTimeData: true,
  });

  useEffect(() => {
    if (props.store && formData.isGetFirstTimeData) {
      setFormData({
        name: props.store.name,
        cities: props.store.cities,
        isGetFirstTimeData: false,
      });
    }
  },// eslint-config-react-app
   [props.store]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      cities: formData.cities,
    };

    props.handleSubmit(data);
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputsArray.map((input) => (
        <div className='inputForm' key={input.id}>
          <label htmlFor={input.id}>{input.label}</label>
          {input.type === 'textarea' ? (
            <textarea
              id={input.id}
              name={input.name}
              value={formData[input.id]}
              onChange={handleChangeInput}
              style={{
                padding: 10,
                width: 300,
              }}
            />
          ) : (
            <input
              type={input.type}
              id={input.id}
              name={input.name}
              value={formData[input.id]}
              onChange={handleChangeInput}
              style={{
                padding: 10,
                width: 300,
              }}
            />
          )}
        </div>
      ))}

      <button type='submit'>
        {props.isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}

export default StoreForm;
