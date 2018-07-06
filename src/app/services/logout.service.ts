import { Injectable } from '@angular/core';

@Injectable()
export class LogoutService {

  constructor() { }

  logout(){
    localStorage.clear();
    location.reload();
  }
}
