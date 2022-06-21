import { isValidFoodChoice } from './guest';

it('should validate a food choice', () => {
  expect(isValidFoodChoice('test')).toEqual(false);
  expect(isValidFoodChoice('chicken')).toEqual(true);
  expect(isValidFoodChoice('fish')).toEqual(true);
  expect(isValidFoodChoice('veg')).toEqual(true);
});
