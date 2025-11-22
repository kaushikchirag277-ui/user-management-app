// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../services/user.service';

// @Component({
//   selector: 'app-user-list',
//   templateUrl: './user-list.component.html',
//   styleUrls: ['./user-list.component.css']
// })
// export class UserListComponent implements OnInit {
//   users: any[] = [];

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.userService.getUsers().subscribe({
//       next: (data) => {
//         this.users = data;
//       },
//       error: (error) => {
//         console.error('Error fetching users', error);
//       }
//     });
//   }

//   // 👇 This is the placeholder for adding edit logic later
//   editUser(user: any) {
//     console.log('Selected user for edit:', user);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SharedService } from '../services/shared.service'; // Import SharedService

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(
    private userService: UserService,
    private sharedService: SharedService // Inject SharedService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users', error);
      }
    });
  }

  // ✅ Send selected user to shared service
  editUser(user: any) {
    this.sharedService.setUserToEdit(user);
  }
}

