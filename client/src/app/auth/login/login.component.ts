import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  public isError = false;
  ngOnInit() {
  }

  onLogin(form: NgForm): void {
    //console.log(form)
    if(form.valid){
      this.authService.login(form.value).subscribe(res => {
        console.log("cuando hay error",res)
        if(res.dataUser){
          this.router.navigateByUrl('/home');
        }else{
          console.log("Error!")
        }
         
      });
    }else{
      console.log("No se enviaron datos")
      this.isError= true;
    }
    
  }

}
