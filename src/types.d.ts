export interface ApiDishes {
  [id: string]: TypeDish;
}

export interface TypeDish {
  id: string;
  time: 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner';
  description: string;
  kcal: number;
}

export interface FormDish {
  time: 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner';
  description: string;
  kcal: string;
}

export type SubmitDish = Omit<TypeDish, 'id'>

