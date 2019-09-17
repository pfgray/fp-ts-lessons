import { random, randomInRange, Random, randomIn } from "./seedrandom"
import { pipe, pipeable } from "fp-ts/lib/pipeable"
import { State, state, chain, map, of, ap, apFirst } from "fp-ts/lib/State"
import { sequenceT, sequenceS } from "fp-ts/lib/Apply"

/**
 * Pick a random first name
 */
const randomFirstName: Random<string> =
  randomIn(['Paul', 'Nicole', 'Zane', 'Ellie'])

/**
 * Pick a random last name
 */
const randomLastName: Random<string> =
  randomIn(['Gray', 'Smith', 'Jones', 'Williams'])

/**
 * Build a random full name by composing a
 * random first name and last name
 */
const randomFullName =
  pipe(
    sequenceT(state)(randomFirstName, randomLastName),
    map(([first, last]) => `${first} ${last}`)
  )

/**
 * Pick a random Hockey team from the list
 */
const randomHockeyTeam: Random<string> = randomIn([
  'Maple Leafs', 'Canadiens', 'Flyers', 'Bruins'
])

/**
 * Pick a random Football team from the list
 */
const randomFootballTeam: Random<string> = randomIn([
  'Steelers', 'Eagles', 'Jaguars',
])

/**
 * Generate a ranom value that's either true or false
 */
const randomBoolean: Random<boolean> =
  pipe(
    randomInRange(0, 2),
    map(n => n === 1) // return true if it is 1, false if it is 0
  )

/**
 * Pick a random Hockey or Football team with an equal chance for both sports 
 */
const randomSportsTeam: Random<string> =
  pipe(
    randomBoolean,
    chain(bool => bool ? randomHockeyTeam : randomFootballTeam)
  )

type User = {
  name: string,
  age: number,
  favoriteTeam: string
}

/**
 * Generate a random user by composing a random fullname,
 * age, and sports team. 
 */
const randomUser: Random<User> = sequenceS(state)({
  name: randomFullName,
  age: randomInRange(18, 100),
  favoriteTeam: randomSportsTeam
})


const seed = 1337

// Generate a random user using a predetermined seed
const [user] = randomUser(seed)

