import React, {ChangeEvent, FormEvent, useState} from 'react';
import {times} from '../../constants';
import {FormDish, SubmitDish} from '../../types';
import axiosApi from '../../axios-api';

const AddMeal = () => {
  const [dish, setDish] = useState<FormDish>({
    time: 'Breakfast',
    description: '',
    kcal: '',
  });
  const listOfOptions = times.map((item) => (
    <option key={item} value={item}>{item}</option>
  ));

  const onChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    setDish(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data: SubmitDish = {
        time: dish.time,
        description: dish.description,
        kcal: parseFloat(dish.kcal),
      };
      await axiosApi.post<SubmitDish>('/calories.json', data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div className="mb-3">
        <select
          onChange={onChange}
          value={dish.time}
          name="time"
          className="form-select"
        >
          {listOfOptions}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <input
          onChange={onChange}
          value={dish.description}
          className="form-control"
          id="description"
          name="description"
          placeholder="Description"
          required
        />
      </div>
      <div className="mb-3">
        <input
          onChange={onChange}
          value={dish.kcal}
          className="form-control w-25 d-inline-block me-2"
          id="kcal"
          name="kcal"
          type="number"
          placeholder="kcal"
          required
        />
        <label htmlFor="kcal" className="form-label">kcal</label>
      </div>
      <button type="submit" className="btn btn-outline-success">Add</button>
    </form>
  );
};

export default AddMeal;