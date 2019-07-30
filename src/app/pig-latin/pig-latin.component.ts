import { Component, OnInit } from '@angular/core';
import { fromEvent, of, from } from 'rxjs';
import { map, tap, reduce, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-pig-latin',
  templateUrl: './pig-latin.component.html',
  styleUrls: ['./pig-latin.component.css']
})
export class PigLatinComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let textbox = <HTMLTextAreaElement>document.querySelector('#text-input');
    let results = <HTMLElement>document.querySelector('#results');
    fromEvent<any>(textbox,'keyup').pipe(
                                          map(e=>e.target.value),
                                          map(i=>i.split(' '))
                                        ).subscribe((i)=>{
                                                            from(i).pipe(
                                                                          map(x=>this.pigLatinify(x)),
                                                                          reduce((x,y)=>x + ' ' + y)
                                                                        ).subscribe(j=>results.innerText=j);
                                                         });
    let results_MergeMap = <HTMLElement>document.querySelector('#results_MergeMap');
    fromEvent<any>(textbox,'keyup').pipe(
                                          map(e=>e.target.value),
                                          map(i=>i.split(' ')),
                                          mergeMap(j=>from(j).pipe(
                                                                    map(x=>this.pigLatinify(x)),
                                                                    reduce((x,y)=>x + ' ' + y)
                                                                  )
                                                  ) 
                                        ).subscribe(j=>results_MergeMap.innerText=j);

  }

  pigLatinify(word) {
    ​​if​ (word.length < 2) {
    ​   ​return​ word;
    ​}
    ​return​ word.slice(1) + ​'-'​ + word[0] + ​'ay'​;
  }

  /*
  fromEvent<any>(textbox, ​'keyup'​)
​ 	.pipe(
​ 	  map(event => event.target.value),
​ 	  mergeMap(wordString =>
​ 	    ​// Inner observable​
​ 	    ​from​(wordString.split(​/​​\s​​+/​))
​ 	    .pipe(
​ 	      map(pigLatinify),
​ 	      reduce((bigString, newWord) => bigString + ​' '​ + newWord, ​''​)
​ 	    )
​ 	  )
​ 	)
​ 	.subscribe(translatedWords => results.innerText = translatedWords);
  */


}
