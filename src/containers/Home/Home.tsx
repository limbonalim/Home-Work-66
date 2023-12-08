import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axiosApi from '../../axios-api';
import Dish from '../../components/Dish/Dish';
import {ApiDishes, TypeDish} from '../../types';

const Home = () => {
  const [total, setTotal] = useState<number>(0);
  const [dishes, setDishes] = useState<TypeDish[]>([]);

  const request = async () => {
    try {
      const response = await axiosApi.get<ApiDishes | null>('/calories.json');
      if (response.status === 200 && response.data) {
        const keys: string[] = Object.keys(response.data);
        const current: TypeDish[] = keys.map((id) => {
          return {
            ...response.data[id],
            id
          };
        });
        setDishes(current);
        setTotal(current.reduce((accumulator, item) => {
          return accumulator + item.kcal;
        }, 0));
      } else {
        return;
      }
    } catch (error: Error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void request();
  }, []);

  const listOfDishes = dishes.map((item) => (
    <Dish key={item.id} time={item.time} description={item.description} kcal={item.kcal}/>
  ));

  return (
    <>
      <div className="d-flex justify-content-between p-5">
        <span>Total calories: <span className="fw-medium">{total} kcal</span></span>
        <Link to="/add-meal" className="btn btn-outline-success">Add new meal</Link>
      </div>
      <div className="d-flex flex-column gap-3">
        {listOfDishes}
      </div>
    </>
  );
};

export default Home;