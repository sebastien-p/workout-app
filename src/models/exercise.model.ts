import { WithId } from './with-id.model';
import { WithName } from './with-name.model';
import { WithDescription } from './with-description.model';

interface Exercise extends WithId, WithName, WithDescription {}

export interface LightExercise extends Exercise {}

export interface FullExercise extends Exercise {}
