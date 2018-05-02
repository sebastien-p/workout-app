import { Component } from '@angular/core';
import { NavParams, AlertController, ModalController } from 'ionic-angular';
import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';
import { Dexie } from 'dexie';

import { DisplaySet } from '../../models/set.model';
import { DisplayWorkout } from '../../models/workout.model';
import { SetsService } from '../../services/sets.service';
import { WorkoutsService } from '../../services/workouts.service';
import { ListPageComponent } from '../list-page.component';
import { SetPage } from '../set/set';

@Component({
  selector: 'page-sets',
  templateUrl: 'sets.html',
})
export class SetsPage
extends ListPageComponent<DisplaySet, SetsService, DisplayWorkout> {
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

  add(...parameters: DisplaySet[keyof DisplaySet][]): void {
    super.add(this.item.id, ...parameters);
  }

  reorder($event: ReorderIndexes): void {
    super.reorder($event);
    $event.applyTo(this.item.sets);
    this.workoutsService.save(this.item);
  }

  protected refresh(): Dexie.Promise<DisplaySet[]> {
    return this.workoutsService.fetch(this.item.id)
      .then(workout => this.list = workout.sets);
  }
}
