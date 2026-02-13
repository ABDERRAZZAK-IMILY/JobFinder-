import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FavoriteOffer } from '../../models/favorite.model';

type FavoritesState = {
  items: FavoriteOffer[];
  isLoading: boolean;
};

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
};

export const FavoritesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  
  withComputed(({ items }) => ({
    count: computed(() => items().length),
  })),

  withMethods((store, http = inject(HttpClient)) => ({
    isFavorite(offerId: string | number): boolean {
      return store.items().some(item => item.offerId === offerId);
    },

    async loadFavorites(userId: number) {
      patchState(store, { isLoading: true });
      try {
        const favorites = await firstValueFrom(
          http.get<FavoriteOffer[]>(`http://localhost:3000/favoritesOffers?userId=${userId}`)
        );
        patchState(store, { items: favorites, isLoading: false });
      } catch (error) {
        patchState(store, { isLoading: false });
      }
    },

    async addFavorite(favorite: FavoriteOffer) {
      if (this.isFavorite(favorite.offerId)) return;

      const newFavorite = await firstValueFrom(
        http.post<FavoriteOffer>(`http://localhost:3000/favoritesOffers`, favorite)
      );
      patchState(store, (state) => ({ items: [...state.items, newFavorite] }));
    },

    async removeFavorite(id: number) {
      await firstValueFrom(http.delete(`http://localhost:3000/favoritesOffers/${id}`));
      patchState(store, (state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    },
  }))
);