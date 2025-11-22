// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent {
//   userName: string = '';
//   selectedShop: string = '';

//   constructor(private router: Router) {
//     const nav = this.router.getCurrentNavigation();
//     const state = nav?.extras.state as { userName: string, selectedShop: string };
//     if (state) {
//       this.userName = state.userName;
//       this.selectedShop = state.selectedShop;
//     }
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userName: string = '';
  selectedShop: string = '';
  role : string='';
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;

    if (state) {
      this.userName = state['userName'] || 'User';
      this.selectedShop = state['selectedShop'] || 'Unknown Shop';
      this.role = state['role']
    }
  }
  toggleDrawer() {
  alert('Drawer button clicked - you can later add side nav here');
}

}

