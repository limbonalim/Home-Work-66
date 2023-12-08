import React from 'react';

interface Props {
  time: string;
  description: string;
  kcal: number;
}

const Dish: React.FC<Props> = ({time, description, kcal}) => {
  return (
    <div className="border border-2 rounded d-flex gap-5 p-3">
      <div>
        <p className="fs-5 text-secondary">{time}</p>
        <p className="fs-3">{description}</p>
      </div>
      <span className="fw-medium ms-auto">{kcal} kcal</span>
      <div className="d-flex gap-2 align-items-start">
        <button className="btn btn-outline-primary" type="button">Edit</button>
        <button className="btn btn-outline-danger" type="button">Delete</button>
      </div>
    </div>
  );
};

export default Dish;