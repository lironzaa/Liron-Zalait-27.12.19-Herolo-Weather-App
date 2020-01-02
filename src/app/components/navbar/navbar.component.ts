import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isShown: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log('test');
    console.log(this.isShown);
  }

}