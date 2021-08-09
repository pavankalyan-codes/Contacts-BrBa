import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  BASE_URL="https://breakingbadapi.com/api"
  MOCK_API_URL="https://mocki.io/v1/c40758aa-d9de-4ba1-befe-7ab1cdcb9451"

  constructor(private http:HttpClient) { }

  getContacts(){
    return this.http.get(this.MOCK_API_URL)
    .pipe(
    map((response:any) => {
        return response.map((contact:any) => {
          return new Object({"name":contact.name,"dp":contact.img,contact:"000-0000-0000"});
        });
    }),tap((data:any)=>{ data.sort((a:any,b:any)=>{
      if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
    })}))
  }
}
