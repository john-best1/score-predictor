import { UserService } from './../user.service';
import { Component} from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private userService: UserService) { }

  loginWithGoogle(){
    this.userService.loginWithGoogle();
  }
  //loginWithFacebook(){
  //  this.userService.loginWithFacebook();
  //}
}
