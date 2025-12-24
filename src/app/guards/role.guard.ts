import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'];

    const userData = localStorage.getItem('userData');
    if (!userData) {
      this.router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userData);
    const role = user.role?.toLowerCase();

    if (!expectedRoles.includes(role)) {
      alert('Access denied!');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
