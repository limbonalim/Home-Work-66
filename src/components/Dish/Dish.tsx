import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  id: string;
  isDeleting: boolean;
  time: string;
  description: string;
  kcal: number;
  onDelete: (id: string) => void;
}

const Dish: React.FC<Props> = ({id, time, description, kcal, onDelete, onEdit, isDeleting}) => {
  const link = `/edit-meal/${id}`;
  return (
    <div className="border border-2 rounded d-flex gap-5 p-3">
      <div>
        <p className="fs-5 text-secondary">{time}</p>
        <p className="fs-3">{description}</p>
      </div>
      <span className="fw-medium ms-auto">{kcal} kcal</span>
      <div className="d-flex gap-2 align-items-start">
        <Link
          to={link}
          className="btn btn-outline-primary"
          type="button"
        >Edit</Link>
        <button
          onClick={() => onDelete(id)}
          disabled={isDeleting}
          className="btn btn-outline-danger"
          type="button"
        >Delete
        </button>
      </div>
    </div>
  );
};

export default Dish;