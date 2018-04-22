import { Nameable } from './nameable.model';

interface Workout extends Nameable {
  manual: boolean;
  rest: number;
}

export interface DatabaseWorkout extends Workout {}

export interface DisplayWorkout extends Workout {}

/*

--- 1

  Exercise
  Set: > exercise
  Workout: > sets

  Fetch exercise

  Fetch set
    - Fetch referenced exercise

  Fetch workout
    - Fetch referenced sets
    - Fetch referenced exercises

  Delete exercise:
    - Delete associated sets
    - Update associated workouts

  Delete set
    - Update associated workout

  Delete workout
    - Delete referenced sets

--- 2

  Exercise
  Set: > exercise, > workout
  Workout

  Fetch exercise

  Fetch set
    - Fetch referenced exercise

  Fetch workout
    - Fetch associated sets, sorted by position
    - Fetch referenced exercises

  Delete exercise:
    - Delete associated sets
    - Update sets position for referenced workout

  Delete set
    - Update sets position for referenced workout

  Delete workout
    - Delete associated sets

*/
