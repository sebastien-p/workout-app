import { Component, Input } from '@angular/core';

import { DisplayWorkout } from '../../models/workout.model';

@Component({
  selector: 'app-workout',
  templateUrl: 'workout.component.html'
})
export class WorkoutComponent {
  @Input()
  workout: DisplayWorkout;
}
