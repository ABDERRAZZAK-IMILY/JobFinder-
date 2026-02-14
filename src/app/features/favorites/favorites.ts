import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesStore } from '../../core/store/favorites/favorites.store';
import { JobCardComponent } from '../../shared/components/jobcard/jobcard';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, JobCardComponent],
  templateUrl: './favorites.html',
})
export class FavoritesComponent {
  readonly store = inject(FavoritesStore);

  removeFromFavorites(jobId: number) {
    this.store.removeFavorite(jobId);
  }
}