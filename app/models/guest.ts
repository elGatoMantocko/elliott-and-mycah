import { UUIDv4 } from './uuid';

export const isValidFoodChoice = (
  foodChoice: unknown,
): foodChoice is 'chicken' | 'fish' | 'veg' => {
  return foodChoice === 'chicken' || foodChoice === 'fish' || foodChoice === 'veg';
};

export type Guest = {
  id: UUIDv4;
  firstName: string;
  lastName: string;
  foodChoice?: 'chicken' | 'fish' | 'veg';
};

export type Guests = Guest[];
