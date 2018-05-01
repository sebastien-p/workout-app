import { Component } from '@angular/core';
import { NavParams, AlertController, ModalController } from 'ionic-angular';
import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';
import { Dexie } from 'dexie';

import { DisplaySet } from '../../models/set.model';
import { SetsService } from '../../services/sets.service';
import { WorkoutsService } from '../../services/workouts.service';
import { ListPageComponent } from '../list-page.component';
import { SetPage } from '../set/set';
import { DisplayWorkout } from '../../models/workout.model';

@Component({
  selector: 'page-sets',
  templateUrl: 'sets.html',
})
export class SetsPage
  extends ListPageComponent<DisplaySet, SetsService> {
  constructor(
    navParams: NavParams,
    alertController: AlertController,
    modalController: ModalController,
    setsService: SetsService,
    protected readonly workoutsService: WorkoutsService
  ) {
    super(
      alertController,
      modalController,
      SetPage,
      setsService,
      navParams
    );
  }

  get workout(): DisplayWorkout { // FIXME + get item in ListPage?
    return this.data.item as DisplayWorkout;
  }

  add(...parameters: DisplaySet[keyof DisplaySet][]): void {
    super.add(this.workout.id, ...parameters);
  }

  reorder($event: ReorderIndexes): void { // FIXME + move to ListPage?
    $event.applyTo(this.list);
    $event.applyTo(this.workout.sets);
    this.workoutsService.save(this.workout);
  }

  protected refresh(): Dexie.Promise<DisplaySet[]> {
    return this.workoutsService.fetch(this.workout.id)
      .then(workout => this.list = workout.sets);
  }
}
