export interface ApiDishes {
  [id: string]: TypeDish;
}

export interface TypeDish {
  id: string;
  isDeleting: boolean;
  time: 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner';
  date: string;
  description: string;
  kcal: number;
}

export interface FormDish {
  time: 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner';
  date: string;
  description: string;
  kcal: string;
}

export type SubmitDish = Omit<TypeDish, 'id' | 'isDeleting'>



