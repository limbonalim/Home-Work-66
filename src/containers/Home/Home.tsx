import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axiosApi from '../../axios-api';
import MemoDish from '../../components/Dish/Dish';
import Loading from '../../components/Loading/Loading';
import {ApiDishes, TypeDish} from '../../types';
import {FormatDate} from '../../components/FormatDate/FormatDate';

const Home = () => {
  const [total, setTotal] = useState<number>(0);
  const [dishes, setDishes] = useState<TypeDish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const request = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<ApiDishes | null>('/calories.json');
      if (response.status === 200 && response.data) {
        const keys: string[] = Object.keys(response.data);
        const today = new FormatDate(new Date());
        const current: TypeDish[] = keys.map((id) => {
          return {
            ...response.data[id],
            isDeleting: false,
            id
          };
        });
        const sorted = current.sort((prev, next) => prev.date > next.date ? 1 : -1);
        setDishes(sorted);
        setTotal(current.reduce((accumulator, item) => {
          if (item.date === today.apiFormatDate()) {
            return accumulator + item.kcal;
          }
          return accumulator;
        }, 0));
      } else {
        setTotal(0);
        setDishes([]);
        return;
      }
    } catch (error: Error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void request();
  }, []);

  const onDelete = async (id: string) => {
    try {
      setDishes(prevState => {
        return prevState.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isDeleting: true,
            };
          }
          return item;
        });
      });
      await axiosApi.delete(`/calories/${id}.json`);
      await request();
    } catch (error: Error) {
      console.log(error);
    }
  };

  const listOfDishes = dishes.map((item) => (
    <MemoDish
      key={item.id}
      id={item.id}
      time={item.time}
      date={item.date}
      description={item.description}
      kcal={item.kcal}
      onDelete={onDelete}
      isDeleting={item.isDeleting}
    />
  ));

  return (
    <>
      <div className="d-flex justify-content-between p-2">
        <span>Total calories: <span className="fw-medium">{total} kcal</span></span>
        <Link to="/add-meal" className="btn btn-outline-success">Add new meal</Link>
      </div>
      <div className="d-flex flex-column-reverse gap-3">
        {loading ? <Loading/> : listOfDishes}
      </div>
    </>
  );
};

export default Home;