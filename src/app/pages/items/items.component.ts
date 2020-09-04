import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item-service'
import { Item } from 'src/app/constants/item';
import { NgbModal, ModalDismissReasons, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import {v4 as uuidv4} from 'uuid'
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Array<Item>;
  editItem: Item;
  addItem: Item;
  closeResult = '';
  dpick;
  dpickAdd;
  constructor(private itemService: ItemService, private modalService: NgbModal) {

    this.addItem = new Item;
    this.editItem = new Item;

  }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this.itemService.getItems().subscribe(d => {
      this.items = d;

      console.log(d);
    })
  }

  openModalEdit(content, item) {
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static'
    });
    this.editItem.id = item.id
    this.editItem.name = item.name
    this.editItem.expiredDate = item.expiredDate
    this.editItem.typeItem = item.typeItem
    this.editItem.uuid = item.uuid
    let dat = new Date(this.editItem.expiredDate * 1000);
    const newDate = {year : dat.getFullYear(),
      month : dat.getMonth()+1,
      day   : dat.getDate()}
    this.dpick = newDate
      console.log(dat, this.dpick);
    
  }




  openModalAdd(content) {
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static'
    });
  }

  openModalDelete(content, item) {
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static'
    });
    this.editItem.id = item.id
    this.editItem.name = item.name
    this.editItem.expiredDate = item.expiredDate
    this.editItem.typeItem = item.typeItem
    this.editItem.uuid = item.uuid
  }



  updateItem() {
    this.editItem.expiredDate = (new Date(this.dpick.year, this.dpick.month-1, this.dpick.day )).getTime() / 1000;
    console.log(this.dpick,this.editItem.expiredDate)
    this.itemService.updateItem(this.editItem).subscribe((d) => {
      this.getItem();
      this.modalService.dismissAll();
    });
  }

  saveItem() {
    this.addItem.expiredDate = new Date(this.dpick).getTime() / 1000;
    this.addItem.uuid = uuidv4();
   
    this.itemService.addItem(this.addItem).subscribe((d) => {
      this.getItem();
      this.modalService.dismissAll();
    });
  }

  deleteItem(){
    this.itemService.deleteItem(this.editItem).subscribe((d)=>{
      this.getItem()
      this.modalService.dismissAll();
    })
  }



}
