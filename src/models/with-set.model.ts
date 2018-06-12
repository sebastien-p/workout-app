import { LightSet, FullSet } from './set.model';

type Set = LightSet | FullSet;

export interface WithSetId {
  set: number;
}

export interface WithSet<T extends Set = FullSet> {
  set: T;
}

export interface WithSetIds {
  sets: number[];
}

export interface WithSets<T extends Set = FullSet> {
  sets: T[];
}
