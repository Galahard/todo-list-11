import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "./modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string


  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.closeModal()
  }


}
