import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    const rolesJSON = localStorage.getItem('roles');
    return rolesJSON ? JSON.parse(rolesJSON) : [];
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    const jwtToken = localStorage.getItem('jwtToken');
    return jwtToken ? jwtToken : '';
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles().length > 0 && this.getToken() !== '';
  }
  
  public isAdmin(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'Admin';
  }

  public isUser(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'User';
  }

}

