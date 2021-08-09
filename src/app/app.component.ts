import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Contact } from './contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'search';
  contacts:any=[];
  contactList:any=[];

  constructor(private apiService:ApiService) {
    this.apiService.getContacts().subscribe(data=>{
      this.contacts.push({"type":"All",contacts:data});
      this.contacts.push({"type":"Recent",contacts:[]});
      this.getRecent();
      this.contacts=[this.contacts[1],this.contacts[0]];
      this.contactList=[...this.contacts];
    })

  }

  searchContacts(data:any){

    if(!data){
      this.contactList=this.contacts;
      return;
    }
    data=data.toLowerCase();
    let matchedContacts=this.contacts[1].contacts.filter((contact:any)=>{
      if(contact.name.toLowerCase().includes(data)){
        return contact;
      }
    })

    let updatedList=[{
      type:"Matching Contacts","contacts":matchedContacts}];
      this.contactList=updatedList;
  }

  getRecent(){
    let recent:any=[];
    for(let i=0;i<3;i++){
      let el:any=this.randomElement();

      recent.push(el);
    }
      
    
    this.contacts[1].contacts=[...new Set(recent)];

  }

  randomElement(){
    let arr=this.contacts[0].contacts;
    return arr[Math.floor(Math.random() * arr.length)];
  }


  randomGuid(){

  }
}
