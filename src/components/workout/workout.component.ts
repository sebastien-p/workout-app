import { Component, Input } from '@angular/core';

import { FullWorkout } from '../../models/workout.model';

@Component({
  selector: 'app-workout',
  templateUrl: 'workout.component.html'
})
export class WorkoutComponent {
  @Input()
  readonly workout: FullWorkout;
}
