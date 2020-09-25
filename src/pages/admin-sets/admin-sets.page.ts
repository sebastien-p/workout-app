import { Component } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';

import { FullSet } from '../../models/set.model';
import { FullWorkout } from '../../models/workout.model';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { SetsService } from '../../services/sets.service';
import { WorkoutsService } from '../../services/workouts.service';
import { ListEditPage } from '../list-edit.page';
import { AdminSetPage } from '../admin-set/admin-set.page';

@Component({
  selector: 'app-admin-sets-page',
  templateUrl: 'admin-sets.page.html'
})
export class AdminSetsPage extends ListEditPage<
  FullSet,
  SetsService,
  FullWorkout
> {
  constructor(
    private readonly workoutsService: WorkoutsService,
    alertService: AlertService,
    modalService: ModalService,
    setsService: SetsService
  ) {
    super(AdminSetPage, modalService, alertService, setsService);
  }

  get list(): FullSet[] {
    return this.item.sets;
  }

  set list(sets: FullSet[]) {
    this.item.sets = sets;
  }

  add(...parameters: FullSet[keyof FullSet][]): Promise<void> {
    return super.add(
      { ...this.item, sets: this.list.map(set => set.id) },
      ...parameters
    );
  }

  reorder(detail: ItemReorderEventDetail): Promise<number> {
    super.reorder(detail);
    return this.workoutsService.save(this.item);
  }

  protected async refresh(enter: boolean = false): Promise<void> {
    if (!enter) {
      const { sets } = await this.workoutsService.fetch(this.item.id);
      this.list = sets;
    }
  }
}
