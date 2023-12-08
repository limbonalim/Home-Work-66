import React, {useCallback, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axiosApi from '../../axios-api';
import Dish from '../../components/Dish/Dish';

const Home = () => {
  const [total, setTotal] = useState<number>(0);
  const [dishes, setDishes] = useState([]);

  const request = async () => {
    try {
      const response = await axiosApi.get('/calorie-tracker.json');
      if (response.status === 200) {
        const keys = Object.keys(response.data);
        setDishes(keys.map((id) => {
          return {
            ...response.data[id],
            id
          };
        }));
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
        <span>Total calories: <span>{total} kcal</span></span>
        <Link to="/add-meal" className="btn btn-outline-success">Add new meal</Link>
      </div>
      <div>
        {listOfDishes}
      </div>
    </>
  );
};

export default Home;