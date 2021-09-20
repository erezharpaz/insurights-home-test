import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService} from '../shared/dataService.service';
import { MedicalCondition } from '../shared/data.interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {

  public data:MedicalCondition[] = [];
  public sortedData: MedicalCondition[][] = [];
  public searchInput: string = '';
  public searchInputCounter: number = 0;
  public searchInputTimer:any;
  public subscription: Subscription | null  = null
  @Output() closePopup = new EventEmitter<void>();

  constructor(
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    /* Subscribe to medical conditions data */
    this.subscription = this.dataService.dataSubject.subscribe(data => {
      this.data = data;
      this.sortItems(this.data);
    });
  }

  /* Select new item from the popup list and closes the popup */
  setItem(item:MedicalCondition){
    this.dataService.selectItem(item);
    this.closePopup.emit();
  }

  /* Sort the medical conditons in an alphabetical order
    data param = medical conditions array
  */
  sortItems(data:MedicalCondition[], isFilterd: boolean = false){
    this.sortedData = [];
    const firstSort = data.sort((a, b) => a.name.localeCompare(b.name));
    let firstLetter = 'a';
    let num = 0;

    firstSort.forEach(item => {
      num = (firstLetter == item.name.charAt(0)) ? num : num+1;
      num = (isFilterd && this.searchInput != '') ? 0 : num;

      firstLetter = item.name.charAt(0);

      /* Create new index for all letters*/
      if(!this.sortedData[num])
        this.sortedData[num] = [];

      this.sortedData[num].push(item);
    });
  }

  /* Filter the medical conditions array to suit input from user */
  refreshSearch(){
    const sortedArray = this.data.filter( item => item.name.startsWith(this.searchInput))
    this.sortItems(sortedArray, true);
  }

  ngOnDestroy(){
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
