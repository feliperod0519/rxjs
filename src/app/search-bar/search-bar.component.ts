import { Component, OnInit } from '@angular/core';
import { fromEvent, merge, of, interval, empty } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, distinctUntilChanged, debounceTime, tap, switchMap } from 'rxjs/operators';
import { scan, mapTo } from 'rxjs/operators';
import { Subject, AsyncSubject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //this.HandleKeyUp();
    //this.switchMap1();
    //this.MapTo1();
    //this.MapTo2();
    //this.Merge1();
    this.Scan1();
  }

  HandleKeyUp()
  {
    let searchBar = <HTMLElement>document.querySelector('input');
    let loadingEl = <HTMLElement>document.querySelector('.loader');
    fromEvent<any>(searchBar,'keyup').pipe(
      map(event=>
                {
                  return event.target.value;
                }),
      filter(q=>q.length>=3),
      distinctUntilChanged(),
      debounceTime(333),
      tap(()=>loadingEl.style.display = 'block')
    ).subscribe(x=>console.log(x));
  }

  switchMap1()
  {
    fromEvent(document,'click').pipe(
                                      switchMap(()=>interval(1000)
                                    )).subscribe(console.log);
                                  
  }

  switchMap2()
  {
    const COUNTDOWN_SECONDS = 10;
    const remainingLabel = document.getElementById('remaining');
    const pauseButton = document.getElementById('pause');
    const resumeButton = document.getElementById('resume');

    const interval$ = interval(1000).pipe(mapTo(-1));
    const pause$ = fromEvent(pauseButton,'click').pipe(mapTo(false));
    const resume$ = fromEvent(resumeButton,'click').pipe(mapTo(true));

  }

  MapTo1()
  {
    const source$ = interval(2000);
    source$.pipe(mapTo('Hello')).subscribe(console.log);
  }

  MapTo2()
  {
    fromEvent(document,'click').pipe(
                                      mapTo('Bye bye')
                                    ).subscribe(console.log);
  }

  Merge1(){
      const first$ = interval(2500);
      const second$ = interval(2000);
      const third$ = interval(1500);
      const fourth$ = interval(1000);
      const example$ = merge(
                              first$.pipe(mapTo('1st')),
                              second$.pipe(mapTo('2nd')),
                              third$.pipe(mapTo('3rd')),
                              fourth$.pipe(mapTo('4th'))
                            );
      example$.subscribe(console.log);
  }

  Merge2(){
    const first$ = interval(2500);
    const second$ = interval(1000);
    const mergeSecond$ = merge(second$);
    //const example$ = first$.pipe(mergeSecond$);
  }

  Scan1(){
    const source$ = of(1,2,3);
    source$.pipe(scan((acc,curr)=>acc+curr,0)).subscribe(x=>console.log(x));
  }

  Subject(){
    const subject = new Subject();
    const asyncSubject = new AsyncSubject();
    const behaviourSubject = new BehaviorSubject('a');
    const repalySubject = new ReplaySubject(2);

    const subjects = { subject, asyncSubject, behaviourSubject, repalySubject };

  }

}
