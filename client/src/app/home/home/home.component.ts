/**import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}**/
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user'
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService, DatePipe]
})

export class HomeComponent implements OnInit {
  public current_date=new Date();
  constructor(private authService: AuthService , private router: Router, private datePipe: DatePipe) {}
  user: UserI;
  
  
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if(!this.user){
     this.router.navigateByUrl('/');
    }
    console.log(this.user);
    this.datePipe.transform(this.current_date, "yyyy-MM-dd")
    console.log(this.current_date);

  }
  
}
