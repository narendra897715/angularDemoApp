import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent implements OnInit {

  @Input() my_modal_title;
  @Input() my_modal_content;

  constructor(public activeModal: NgbActiveModal, private router : Router) { }

  ngOnInit() {
  }

  Logout() {
    this.activeModal.close();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
