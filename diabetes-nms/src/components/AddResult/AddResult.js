import React, { useContext, useState } from 'react';
import ApiContext from '../../contexts/ApiContext';
import { useForm } from '../../hooks/useForm';
import './AddResult.css';

export default function AddResult() {
  const { addResults } = useContext(ApiContext);
  const [ error, setError ] = useState(null);
  const initialState = { month_taken: '', meal_taken: '', result_read: '', description: '', diabetesType: '' };

  const goBack = () => {
    window.history.back()
  };

  const addNewResult = async () => {
    try {
      await addResults({ ...values });
      goBack();
    } catch(error) {
      setError(error.error);
    }
  };

  const [ values, handleChange, handleSubmit ] = useForm(initialState, addNewResult);

  return (
    <div className='addResultContainer'>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>New Result</h2>
        </div>
        <div>
          <input
            placeholder='Month'
            type="text" 
            id='add_month'
            name='month_taken'
            value={values.month_taken}
            onChange={handleChange}
            required />
        </div>
        <div>
          <input
            placeholder='Meal'
            type="text" 
            id='add_meal'
            name='meal_taken'
            value={values.meal_taken}
            onChange={handleChange}
            required />
        </div>
        <div>
          <input 
            placeholder='number'
            type="integer" 
            id='add_result_read'
            name='result_read'
            value={values.result_read}
            onChange={handleChange}
            required />
        </div>
        <div>
          <input 
            placeholder='description'
            type="text" 
            id='add_description'
            name='meal_description'
            value={values.meal_description}
            onChange={handleChange}
            required />
        </div>
        <div>
          <input 
            placeholder='Zipcode'
            type="integer" 
            id='add_restaurant_zipcode'
            name='zipcode'
            value={values.zipcode}
            onChange={handleChange}
            required />
        </div>
        <div>
          <input 
            placeholder='Cuisine Type ie. American, Italian'
            type="text" 
            id='add_restaurant_cuisine_type'
            name='cuisine_type'
            value={values.cuisine_type}
            onChange={handleChange}
            required />
        </div>
        {error && <span>{error}</span>}
        <div>
          <button type='submit' className='addResultButton'>Submit</button>
          <button onClick={goBack} className='addResultButton'>Cancel</button>
        </div>
      </form>
    </div>
  )
};