import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName: string = '';
  selectedShop: any = null;
  role: string = '';

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    try {
      const userDataString = localStorage.getItem('userData');
      const shopString = localStorage.getItem('selectedShop');

      if (userDataString) {
        const data = JSON.parse(userDataString);
        this.userName = data.user?.name || '';
        this.role = data.user?.role || '';
      }

      if (shopString) {
        this.selectedShop = JSON.parse(shopString);
      }

    } catch (err) {
      console.error('Error loading user data', err);
    }
  }

  toggleDrawer() {
    alert('Drawer button clicked - you can later add side nav here');
  }
}
