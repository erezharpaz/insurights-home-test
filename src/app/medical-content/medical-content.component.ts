import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService} from '../shared/dataService.service';
import { MedicalCondition } from '../shared/data.interface';

@Component({
  selector: 'app-medical-content',
  templateUrl: './medical-content.component.html',
  styleUrls: ['./medical-content.component.scss']
})
export class MedicalContentComponent implements OnInit, OnDestroy {
  public medicalItem:MedicalCondition | null = null;
  public subscription: Subscription | null  = null
  public noDesMessage: string = `Sorry, we couldn't find a description for this medical condition`;

  constructor( private dataService:DataService ) { }

  ngOnInit(): void {
    /* Subscribe to subject to get medical conditions data */
    this.dataService.itemSubject.subscribe(item => {
      this.medicalItem = (Object.keys(item).length != 0) ? item : null;
    });
  }

  ngOnDestroy(){
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
