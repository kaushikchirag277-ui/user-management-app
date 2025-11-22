import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userToEdit = new BehaviorSubject<any>(null);
  userToEdit$ = this.userToEdit.asObservable();

  setUserToEdit(user: any) {
    this.userToEdit.next(user);
  }
}
