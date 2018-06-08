import { Component } from '@angular/core';
import { NavParams, AlertController, ModalController } from 'ionic-angular';
import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';
import Dexie from 'dexie';

import { FullSet } from '../../models/set.model';
import { FullWorkout } from '../../models/workout.model';
import { SetsService } from '../../services/sets.service';
import { WorkoutsService } from '../../services/workouts.service';
import { ListEditPage } from '../list-edit.page';
import { AdminSetPage } from '../admin-set/admin-set.page';

@Component({
  selector: 'page-admin-sets',
  templateUrl: 'admin-sets.page.html'
})
export class AdminSetsPage
extends ListEditPage<FullSet, SetsService, FullWorkout> {
  constructor(
    navParams: NavParams,
    alertController: AlertController,
    modalController: ModalController,
    setsService: SetsService,
    private readonly workoutsService: WorkoutsService
  ) {
    super(
      alertController,
      modalController,
      AdminSetPage,
      setsService,
      navParams
    );
  }

  get list(): FullSet[] {
    return this.item.sets;
  }

  add(...parameters: FullSet[keyof FullSet][]): void {
    super.add(this.item, ...parameters);
  }

  reorder($event: ReorderIndexes): void {
    super.reorder($event);
    this.workoutsService.save(this.item);
  }

  protected refresh(enter: boolean = false): Dexie.Promise<FullSet[]> {
    if (enter) { return null; }
    return this.workoutsService.fetch(this.item.id).then(workout => {
      this.item = workout;
      return workout.sets;
    });
  }
}
