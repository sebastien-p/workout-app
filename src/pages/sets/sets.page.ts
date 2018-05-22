import { Component } from '@angular/core';
import { NavParams, AlertController, ModalController } from 'ionic-angular';
import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';
import { Dexie } from 'dexie';

import { DisplaySet } from '../../models/set.model';
import { DisplayWorkout } from '../../models/workout.model';
import { SetsService } from '../../services/sets.service';
import { WorkoutsService } from '../../services/workouts.service';
import { ListPageComponent } from '../../components/list-page.component';
import { SetPage } from '../set/set.page';

@Component({
  selector: 'page-sets',
  templateUrl: 'sets.page.html'
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

  get list(): DisplaySet[] {
    return this.item.sets;
  }

  add(...parameters: DisplaySet[keyof DisplaySet][]): void {
    super.add(this.item.id, ...parameters);
  }

  reorder($event: ReorderIndexes): void {
    super.reorder($event);
    this.workoutsService.save(this.item);
  }

  protected refresh(enter: boolean = false): Dexie.Promise<DisplaySet[]> {
    if (enter) { return null; }
    return this.workoutsService.fetch(this.item.id).then(workout => {
      this.item = workout;
      return workout.sets;
    });
  }
}
