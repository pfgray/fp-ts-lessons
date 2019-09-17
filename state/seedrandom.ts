import { State, map } from "fp-ts/lib/State";
import { pipe } from "fp-ts/lib/pipeable";

/**
 * The Random type represents a State<number, A>
 * which represents a function, (n: number) => [A, number]
 */
export type Random<A> = State<number, A>

const a = 1839567234;
const m = 8239451023;
const c = 972348567;

/**
 * An implementation of a [Linear Congruential (pseudo-random) Generator](https://en.wikipedia.org/wiki/Linear_congruential_generator).
 * 
 * Generates a random number given a seed.
 */
export const random: State<number, number> = 
  seed => {
    const nextSeed = (a * seed + c) % m
    return [nextSeed, nextSeed];
  }

/**
 * Generates a rondom number in the specified range
 * @param max The max value, exclusive
 * @param min The minimum value, inclusive
 */
export const randomInRange: (max: number, min: number) => Random<number> =
  (max, min) =>
    pipe(
      random,
      map(num => min + Math.floor((num / 8239451023) * (max - min)))
    );

/**
 * Picks a random value from the specified array.
 * @param arr 
 */
export const randomIn = <T>(arr: T[]) =>
  pipe(
    randomInRange(0, arr.length),
    map(index => arr[index])
  )
