import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { stackOverflowEntry } from './shared/models/stackOverflowEntry';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StackoverflowService {

  
  constructor() { }

  response: stackOverflowEntry[] = [];

  get(code: string){
    
    let endPoint= 'http://localhost:3000/api/advancedAsync/stackoverflow/';
    let ajax$ = ajax(endPoint + code);
    ajax$.subscribe(x=>{
                          x.response.forEach(y=>{
                                                  let newResponse: stackOverflowEntry = new stackOverflowEntry;
                                                  newResponse.link = y.link;
                                                  newResponse.text = y.title;
                                                  this.response.push(newResponse);
                                                });
                       });
    return this.response;
    /*
    for (let entry of response){
      console.log(entry);
    }
    */
  }
}

/*
for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}
fo


const map = new Map();
map.set(1, 'Hi');
map.set(2, 'Bye');

const mapSource = from(map);

var arr: MyType[] = [
    { "id": 0, "name": "Available" },
    { "id": 1, "name": "Ready" },
    { "id": 2, "name": "Started" }
];

let endPoint = 'http://localhost:3000/api/advancedAsync/stackoverflow/'
    fromEvent<any>(searchBar,'keyup').pipe(
      map(e=>e.target.value),
      filter(x=>x.length>=3),
      distinctUntilChanged(),
      debounceTime(333),
      tap(()=>loadingEl.style.display = 'block')
    ).subscribe(x=>{
                      let ajax$= ajax(endPoint + x);
                      ajax$.subscribe(r=>this.testDisplayResults(r.response));
                   });



    results.forEach(q=>{
                        let li = document.createElement('li');
                        let a = document.createElement('a');
                        a.href = q.link;
                        a.innerHTML = q.title;
                        li.appendChild(a);
                        listEl.appendChild(li);
                     });
*/