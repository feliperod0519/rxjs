import { Component, OnInit } from '@angular/core';
import { of, interval } from 'rxjs';
import { map, take, delay, tap } from 'rxjs/operators';
import { error } from 'util';

@Component({
  selector: 'app-other-operators',
  templateUrl: './other-operators.component.html',
  styleUrls: ['./other-operators.component.css']
})
export class OtherOperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('1.');
    of('hello','world','!').subscribe(console.log);
    console.log('2.');
    of('Carolina','Feli','Manchitas').pipe(
                                            map(w=>w)
                                          ).subscribe(console.log);
    console.log('3.');
    let aSecond$ = interval(1000);
    aSecond$.pipe(take(3)).subscribe(console.log);
    of(1,2,3).pipe(delay(1000)).subscribe(console.log);
    console.log('4.');
    of(1,2,3,4,5).pipe(
                        map(v=>v+10),
                        tap(
                          {
                            next: val => { console.log('on next', val); },
                            error: error => { console.log('on error', error.message); },
                            complete: () => console.log('on complete')
                          })
                      ).subscribe(v=>console.log);
  }

}
