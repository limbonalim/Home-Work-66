import React from 'react';
import {Link} from 'react-router-dom';
import {FormatDate} from '../FormatDate/FormatDate';

interface Props {
  id: string;
  isDeleting: boolean;
  time: string;
  date: string;
  description: string;
  kcal: number;
  onDelete: (id: string) => void;
}

const MemoDish: React.FC<Props> = React.memo(function Dish({id, time, date, description, kcal, onDelete, isDeleting}) {
  const link = `/edit-meal/${id}`;
  const currentDate = new FormatDate(date);

  return (
    <div className="border border-2 rounded d-flex gap-5 p-3">
      <div>
        <p className="fs-5 text-secondary">{time}</p>
        <p className="fs-3">{description}</p>
        <p className="text-secondary">{currentDate.toStringFormatDate()}</p>
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
}, (prevProps, nextProps) => {
  return (prevProps.date === nextProps.date && prevProps.id === nextProps.id && prevProps.description === nextProps.description);
});

export default MemoDish;