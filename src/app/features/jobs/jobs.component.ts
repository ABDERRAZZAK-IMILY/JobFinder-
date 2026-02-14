import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsStore } from '../../core/store/jobs/jobs.store';
import { JobCardComponent } from '../../shared/components/jobcard/jobcard';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, JobCardComponent, SearchBarComponent],
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit {
  readonly store = inject(JobsStore);

  keyword = '';
  location = '';
  currentPage = 1;
  pageSize = 9;

  ngOnInit() {
    this.onSearch();
  }

  onSearch() {
    this.currentPage = 1;
    this.store.searchJobs({ 
      keyword: this.keyword, 
      location: this.location, 
      page: 1 
    });
  }

  get totalPages(): number {
    return Math.ceil(this.store.jobs().length / this.pageSize);
  }

  get paginatedJobs() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.store.jobs().slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
