import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {times} from '../../constants';
import axiosApi from '../../axios-api';
import {FormDish, SubmitDish} from '../../types';

const AddMeal = () => {
  const [dish, setDish] = useState<FormDish>({
    time: 'Breakfast',
    description: '',
    kcal: '',
  });
  const {id} = useParams();
  const navigate = useNavigate();
  const listOfOptions = times.map((item) => (
    <option key={item} value={item}>{item}</option>
  ));

  const request = useCallback(async () => {
    try {
      const response = await axiosApi.get<SubmitDish | null>(`/calories/${id}.json`);
      if (response.status === 200 && response.data) {
        setDish({
          ...response.data,
          kcal: response.data.kcal.toString(),
        });
      }
    } catch (error: Error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      void request();
    }
  }, [request]);

  const onChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    setDish(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const createMeal = async () => {
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

  const editMeal = async () => {
    try {
      const data: SubmitDish = {
        time: dish.time,
        description: dish.description,
        kcal: parseFloat(dish.kcal),
      };
      await axiosApi.put<SubmitDish>(`/calories/${id}.json`, data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (id) {
      await editMeal();
    } else {
      await createMeal();
    }
    navigate('/');
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