import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

import { MedicalCondition} from './data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public dataSubject = new BehaviorSubject<MedicalCondition[]>([]);
  public itemSubject = new Subject<MedicalCondition>();
  public toggleModalSubject = new Subject<boolean>();
  private data: any; 

  constructor( private http: HttpClient ) { }

  /* API call for the medical conditions */
  private fetchData() {
    return this.http.get<MedicalCondition[]>('http://dev.insurights.com:3000/test/medical')
    .subscribe(data => {
      this.data = data;
      this.dataSubject.next(this.data);
    });
  }

  /* get data of all medical conditions with a subject observable */
  getData(){
    if (!this.data) 
      this.fetchData();
    else 
      this.dataSubject.next(this.data);
  }

  /* get data of specific item with a subject observable */
  selectItem(item:MedicalCondition){
    const allItems:HTMLCollectionOf<Element> = document.getElementsByClassName("medical-condition-item");
    for (let item of allItems ){
      item.classList.remove("active");
    }

    const selectedItem: HTMLElement = document.getElementById(item._id)!;
    selectedItem.classList.add('active');
    this.itemSubject.next(item);
  }

  openModal(){
    this.toggleModalSubject.next();
  }
  
}
