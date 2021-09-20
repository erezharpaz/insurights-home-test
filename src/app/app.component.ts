import { Component, OnInit} from '@angular/core';

import { DataService } from './shared/dataService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public openDrawer: boolean = false;

  constructor( 
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.dataService.getData();
  }

  openModal(){
    this.dataService.openModal();
  }

}

