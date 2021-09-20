import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '../shared/dataService.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss']
})
export class PopupModalComponent implements OnInit, OnDestroy {

  public closeModal: string = '';
  public isModalOpen: boolean = false;
  public modalReference: any;
  public subscription: Subscription | null  = null
  @ViewChild('modalData', {static: false}) modalData!: ElementRef;

  constructor( 
    private dataService: DataService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    /* subscribe to subject to get open modal trigger */
    this.dataService.toggleModalSubject.subscribe(() =>{
        this.triggerModal(); 
    })
  }

  /* Documentation - https://ng-bootstrap.github.io/#/home
    Open the popup modal and catch the closing reasons
  */
  triggerModal() {
    this.modalReference = this.modalService.open(this.modalData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  /* Handle the closing modal reasons */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnDestroy(){
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
