import { Component, OnInit } from '@angular/core';
import { MicroApp } from '../micro-app';

@Component({
  selector: 'knowist-app-host',
  templateUrl: './app-host.component.html',
  styleUrls: ['./app-host.component.css']
})
export class AppHostComponent implements OnInit {
  appCatalog: MicroApp[] = new Array<MicroApp>(); 
  
  constructor() { 
    // this.appCatalog.push(); this goes in top level main app module,
    // where we decide which microapps an app host has. 
  }

  ngOnInit(): void {
  }

}
