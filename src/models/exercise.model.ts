import { WithId } from './with-id.model';
import { WithName } from './with-name.model';
import { WithDescription } from './with-description.model';

interface Exercise extends WithId, WithName, WithDescription {}

export interface DatabaseExercise extends Exercise {}

export interface DisplayExercise extends Exercise {}
