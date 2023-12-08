import React from 'react';

const AddMeal = () => {
  return (
    <form>
      <div className="mb-3">
        <select
          name="time"
          className="form-select"
        >
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <input
          className="form-control"
          id="description"
          name="description"
          placeholder="Description"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control w-25 d-inline-block me-2"
          id="kcal"
          name="kcal"
          placeholder="kcal"
        />
        <label htmlFor="kcal" className="form-label">kcal</label>
      </div>
    </form>
  );
};

export default AddMeal;