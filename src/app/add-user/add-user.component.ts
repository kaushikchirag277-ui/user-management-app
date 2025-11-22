// import { Component } from '@angular/core';
// import { UserService } from '../services/user.service';


// @Component({
//   selector: 'app-add-user',
//   templateUrl: './add-user.component.html',
//   styleUrls: ['./add-user.component.css']
// })
// export class AddUserComponent {
//   user = {
//     userId: '',
//     name: '',
//     email: '',
//     mobileNumber: '',
//     age: '',
//     gender: ''
//   };

//   submitted = false;
//   errorMessage = '';

//   constructor(private userService: UserService) {}

// onSubmit() {
//   console.log('Submitting user:', this.user);
//   this.userService.addUser(this.user).subscribe({
//     next: (response: any ) => {
//       console.log('User saved response:', response);
//       this.submitted = true;
//       this.errorMessage = '';
//       this.resetForm();
//     },
//     error: (error: any) => {  
//       console.error('Error saving user:', error);
//       this.errorMessage = 'Failed to save user. Please try again.';
//       this.submitted = false;
//     }
//   });
// }


//   resetForm() {
//     this.user = {
//       userId: '',
//       name: '',
//       email: '',
//       mobileNumber: '',
//       age: '',
//       gender: ''
//     };
//   }
// }
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user = {
    userId: '',
    name: '',
    email: '',
    mobileNumber: '',
    gender: '',
    age: ''
  };

  isEditMode = false;
  submitted = false;
  errorMessage = '';

  constructor(private userService: UserService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.userToEdit$.subscribe((data) => {
      if (data) {
        this.user = { ...data };
        this.isEditMode = true;
      }
    });
  }

  onSubmit(): void {
    this.submitted = false;
    this.errorMessage = '';

    if (this.isEditMode) {
      // Update user
      this.userService.updateUser(this.user).subscribe({
        next: (response : any) => {
          this.submitted = true;
          this.isEditMode = false;
          this.user = this.resetForm();
          alert('User updated successfully!');
        },
        error: (error: any) => {
          this.errorMessage = 'Failed to update user.';
          console.error(error);
        }
      });
    } else {
      // Add user
      this.userService.addUser(this.user).subscribe({
        next: (response) => {
          this.submitted = true;
          this.user = this.resetForm();
          alert('User added successfully!');
        },
        error: (error) => {
          this.errorMessage = 'Failed to save user.';
          console.error(error);
        }
      });
    }
  }

  resetForm() {
    return {
      userId: '',
      name: '',
      email: '',
      mobileNumber: '',
      gender: '',
      age: ''
    };
  }
}
