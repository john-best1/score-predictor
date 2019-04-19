import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService : UserService, private router: Router){
  userService.user$.subscribe(user => {
    if(!user) return;
    userService.save(user);
    
    let returnUrl = localStorage.getItem('returnUrl');
    console.log(returnUrl)
    if (!returnUrl)return

    localStorage.removeItem('returnUrl');
    router.navigateByUrl(returnUrl);
      
  })
}
}
