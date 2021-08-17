import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  @Input()
  contactList!: any[];
  @Output() emitSearch:EventEmitter<any> = new EventEmitter<any>();
  alpha="ABCDEFGHIKLMNOPQRSTUVWXYZ"
  alphabets:string[] =[];
  searchTerm:FormControl;

  constructor() {
    this.alphabets=this.alpha.split('');
    console.log(this.alphabets);
    this.searchTerm=new FormControl('');
    this.searchTerm.valueChanges.pipe(
     debounceTime(250),
     distinctUntilChanged())
     .subscribe(term => {
       this.emitSearch.emit(term);
      });
   }

  

  ngOnInit(): void {
  }

}
