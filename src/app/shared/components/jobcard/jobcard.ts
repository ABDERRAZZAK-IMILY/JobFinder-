import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesStore } from '../../../core/store/favorites/favorites.store';
import { AuthService } from '../../../core/services/auth.service';
import { ApplicationsStore } from '../../../core/store/applications/applications.store';
import { Application } from '../../../core/models/application.model';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobcard.html',
  styleUrls: ['./jobcard.css']
})
export class JobCardComponent {
  @Input() job: any;
  @Input() isFavorite = false;

  store = inject(FavoritesStore);
  auth = inject(AuthService);
  appstore = inject(ApplicationsStore);

  hasApplied(): boolean {
    const user = this.auth.getUser();
    if (!user) return false;
    const jobId = this.job.slug || this.job.id;
    return this.appstore.items().some(
      (i: Application) => i.jobId === jobId && i.userId === String(user.id)
    );
  }

  toggleApplication() {
    const user = this.auth.getUser();
    if (!user) {
      alert('Please login to apply');
      return;
    }

    const jobId = this.job.slug || this.job.id;
    const existing = this.appstore.items().find(
      (i: Application) => i.jobId === jobId && i.userId === String(user.id)
    );

    if (existing?.id) {
      this.appstore.removeApplication(existing.id);
    } else {
      const application: Application = {
        jobId: this.job.slug,
        userId: String(user.id),
        jobTitle: this.job.title,
        companyName: this.job.company_name,
        status: 'Pending',
        notes: '',
        appliedDate: new Date().toISOString()
      };
      this.appstore.applyForJob(application);
    }
  }

  toggleFavorite() {
    const user = this.auth.getUser();
    if (!user?.id) return;

    if (this.isFavorite) {
      if (this.job.id) this.store.removeFavorite(this.job.id);
      return;
    }

    const jobId = this.job.id || this.job.slug;
    const isFav = this.store.isFavorite(jobId);

    if (isFav) {
      const item = this.store.items().find((i: any) => i.offerId === jobId);
      if (item?.id) this.store.removeFavorite(item.id);
    } else {
      this.store.addFavorite({
        userId: user.id,
        offerId: jobId,
        title: this.job.title,
        company: this.job.company_name || this.job.company,
        location: this.job.location
      });
    }
  }
}