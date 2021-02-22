export const isValidFoodChoice = (
  foodChoice: unknown,
): foodChoice is 'chicken' | 'fish' | 'veg' => {
  return foodChoice === 'chicken' || foodChoice === 'fish' || foodChoice === 'veg';
};

export type Guest = {
  firstName: string;
  lastName: string;
  foodChoice?: 'chicken' | 'fish' | 'veg';
};

export type Guests = Map<string, Guest>;
