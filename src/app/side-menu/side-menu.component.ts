import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService} from '../shared/dataService.service';
import { MedicalCondition } from '../shared/data.interface';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {

  public data: MedicalCondition[] = [];
  public subscription: Subscription | null  = null

  constructor( private dataService:DataService ) { }

  ngOnInit() {
    /* Subscribe to medical conditions data */
    this.subscription = this.dataService.dataSubject.subscribe(data => {
      this.data = data;
    });
  }

  /* Sets new item to be displayed for the user */
  setItem(item:MedicalCondition){
 
    this.dataService.selectItem(item);
  }

  ngOnDestroy(){
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
