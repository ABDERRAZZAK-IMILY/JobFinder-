import { Component, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  keyword = model<string>('');
  location = model<string>('');
  search = output<void>();

  onSearch() {
    this.search.emit();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  clearKeyword() {
    this.keyword.set('');
  }

  clearLocation() {
    this.location.set('');
  }
}
