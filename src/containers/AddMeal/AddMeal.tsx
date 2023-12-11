import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {times} from '../../constants';
import axiosApi from '../../axios-api';
import Loading from '../../components/Loading/Loading';
import {FormatDate} from '../../components/FormatDate/FormatDate';
import {FormDish, FormNameType, SubmitDish} from '../../types';

interface Props {
  getError: (message: string) => void;
}

const AddMeal: React.FC<Props> = ({getError}) => {
  const current = new FormatDate(new Date().toString()).apiFormatDate();
  const [dish, setDish] = useState<FormDish>({
    time: 'Breakfast',
    date: current,
    description: '',
    kcal: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [formName, setFormName] = useState<FormNameType>({
    title: 'Add meal',
    button: 'Add',
  });
  const {id} = useParams();
  const navigate = useNavigate();
  const listOfOptions = times.map((item) => (
    <option key={item} value={item}>{item}</option>
  ));

  const request = useCallback(async () => {
    try {
      setLoading(true);
      setFormName({
        title: 'Edit form',
        button: 'Edit',
      });
      const response = await axiosApi.get<SubmitDish | null>(`/calories/${id}.json`);
      if (response.status === 200 && response.data) {
        setDish({
          ...response.data,
          kcal: response.data.kcal.toString(),
        });
      }
    } catch (error: Error) {
      getError(error.message);
    } finally {
      setLoading(false);
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
        date: dish.date,
        description: dish.description,
        kcal: parseFloat(dish.kcal),
      };
      await axiosApi.post<SubmitDish>('/calories.json', data);
    } catch (error) {
      getError(error.message);
    }
  };

  const editMeal = async () => {
    try {
      const data: SubmitDish = {
        time: dish.time,
        date: dish.date,
        description: dish.description,
        kcal: parseFloat(dish.kcal),
      };
      await axiosApi.put<SubmitDish>(`/calories/${id}.json`, data);
    } catch (error) {
      getError(error.message);
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
    <>
      {loading ? <Loading/> :
        <form onSubmit={onFormSubmit}>
          <h1>{formName.title}</h1>
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
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Description:</label>
            <input
              onChange={onChange}
              value={dish.date}
              className="form-control"
              id="date"
              name="date"
              placeholder="Description"
              type="date"
              required
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-outline-success"
          >{formName.button}</button>
        </form>}
    </>
  );
};

export default AddMeal;