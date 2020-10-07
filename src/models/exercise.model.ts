import { WithId } from './with-id.model';
import { WithName } from './with-name.model';
import { WithDescription } from './with-description.model';

interface Exercise extends WithId, WithName, WithDescription {
  doubled: boolean;
  image?: File;
}

// tslint:disable-next-line: no-empty-interface
export interface LightExercise extends Exercise {}

// tslint:disable-next-line: no-empty-interface
export interface FullExercise extends Exercise {}
