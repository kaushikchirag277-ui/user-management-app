import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-management-app';
  showUserList = false;  // Initial state: hidden

  toggleUserList(): void {
    this.showUserList = !this.showUserList;
  }
}
