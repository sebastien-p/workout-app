import { Component, Input } from '@angular/core';

import { DisplayExercise } from '../../models/exercise.model';

@Component({
  selector: 'app-exercise',
  templateUrl: 'exercise.component.html'
})
export class ExerciseComponent {
  @Input()
  exercise: DisplayExercise;
}
