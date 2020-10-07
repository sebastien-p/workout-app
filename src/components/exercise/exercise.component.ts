import { Component, Input } from '@angular/core';

import { FullExercise } from '../../models/exercise.model';

@Component({
  selector: 'app-exercise',
  templateUrl: 'exercise.component.html'
})
export class ExerciseComponent {
  @Input()
  readonly exercise: FullExercise;

  @Input()
  readonly compact: boolean = false;
}
