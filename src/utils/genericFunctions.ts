import { AnyObject } from "mongoose";

export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const objRemoveUndefinedKeys = (obj: Record<any, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  );
