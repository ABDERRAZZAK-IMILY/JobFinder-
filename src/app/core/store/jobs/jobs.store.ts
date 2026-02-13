import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { JobService } from '../../services/job.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type JobsState = {
  jobs: any[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
};

const initialState: JobsState = {
  jobs: [],
  isLoading: false,
  error: null,
  currentPage: 1,
};

export const JobsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, jobService = inject(JobService)) => ({
    
    searchJobs: rxMethod<{ keyword: string; location: string; page?: number }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(({ keyword, location, page = 1 }) => {
          const params = new HttpParams()
            .set('page', page.toString())
            .set('items_per_page', '12');

          return jobService.getJobs(params).pipe(
            tap({
              next: (response) => {
                let results = response.data || [];

                if (keyword?.trim()) {
                  const searchTerm = keyword.toLowerCase().trim();
                  results = results.filter((job: any) => 
                    job.title?.toLowerCase().includes(searchTerm)
                  );
                }

                if (location?.trim()) {
                  const searchLocation = location.toLowerCase().trim();
                  results = results.filter((job: any) => 
                    job.location?.toLowerCase().includes(searchLocation)
                  );
                }

                results.sort((a: any, b: any) => {
                  const dateA = new Date(a.published_at || a.created_at || 0).getTime();
                  const dateB = new Date(b.published_at || b.created_at || 0).getTime();
                  return dateB - dateA;
                });

                patchState(store, { 
                  jobs: results, 
                  isLoading: false, 
                  currentPage: page 
                });
              },
              error: (err) => patchState(store, { 
                isLoading: false, 
                error: 'Failed to load jobs. Please try again later.'
              })
            })
          );
        })
      )
    ),
  }))
);
