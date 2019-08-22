import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { stackOverflowEntry } from './shared/models/stackOverflowEntry';

@Injectable({
  providedIn: 'root'
})
export class StackoverflowService {

  response: stackOverflowEntry[] = [];

  constructor() { }

  get(code: string){
    let endPoint= 'http://localhost:3000/api/advancedAsync/stackoverflow/';
    let ajax$ = ajax(endPoint + code);
    ajax$.subscribe(x=>{
                          let newResponse: stackOverflowEntry;
                          newResponse.link = x.response.link;
                          newResponse.text = x.response.title;
                          this.response.push(newResponse);
                       });
  }
}

/*
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
*/