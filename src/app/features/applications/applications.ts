import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsStore } from '../../core/store/applications/applications.store';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Application } from '../../core/models/application.model';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applications.html'
})
export class ApplicationsComponent implements OnInit {
  readonly store = inject(ApplicationsStore);
  private authService = inject(AuthService);

  ngOnInit() {
    const user = this.authService.getUser();
    if (user && user.id !== undefined) {
      this.store.loadApplications(user.id.toString());
    }
  }

  updateStatus(app: Application, event: any) {
    const newStatus = event.target.value;
    const updatedApp = { ...app, status: newStatus };
    this.store.updateStatus(updatedApp);
  }

  updateNotes(app: Application, notes: string) {
    const updatedApp = { ...app, notes: notes };
    this.store.updateStatus(updatedApp);
  }
}