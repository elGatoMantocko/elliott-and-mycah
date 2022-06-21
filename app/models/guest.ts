import { UUIDv4 } from './uuid';

/**
 * Type of valid food options.
 */
type FoodChoice = 'chicken' | 'fish' | 'veg';

/**
 * Determine if the user selected a valid food choice and type guard it.
 *
 * @param foodChoice the choice a user selected
 * @returns type guarded food choice
 */
export function isValidFoodChoice(foodChoice: string): foodChoice is FoodChoice {
  return foodChoice === 'chicken' || foodChoice === 'fish' || foodChoice === 'veg';
}

export type Guest = {
  /**
   * Id of the guest that was added.
   */
  id: UUIDv4;

  /**
   * First name of the guest.
   */
  firstName: string;

  /**
   * Last name of the guest.
   */
  lastName: string;

  /**
   * The food option that the user selected.
   */
  foodChoice?: FoodChoice;
};

export type Guests = Guest[];
