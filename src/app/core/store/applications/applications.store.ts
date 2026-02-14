import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Application } from '../../models/application.model';
import { inject } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export const ApplicationsStore = signalStore(
  { providedIn: 'root' },
  withState({
    items: [] as Application[],
    loading: false
  }),
  withMethods((store, appService = inject(ApplicationService)) => ({
    loadApplications: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((userId) => appService.getApplications(userId).pipe(
          tap((items) => patchState(store, { items, loading: false }))
        ))
      )
    ),
    applyForJob: async (app: Application) => {
        const alreadyApplied = store.items().some(
          (i) => i.jobId === app.jobId && i.userId === app.userId
        );
        if (alreadyApplied) return;

        appService.addApplication(app).subscribe(newApp => {
            patchState(store, { items: [...store.items(), newApp] });
        });
    },
    removeApplication: (id: string) => {
        appService.deleteApplication(id).subscribe(() => {
            patchState(store, {
                items: store.items().filter(i => i.id !== id)
            });
        });
    },
    updateStatus: (app: Application) => {
        appService.updateApplication(app).subscribe(updated => {
            patchState(store, {
                items: store.items().map(i => i.id === updated.id ? updated : i)
            });
        });
    }
  }))
);