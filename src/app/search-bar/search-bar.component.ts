import { Component, OnInit } from '@angular/core';
import { fromEvent, merge, of, interval, empty, from } from 'rxjs';
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
    //this.Scan1();
    //this.Subject1();
    //this.Subject2();
    //this.Subject3();
    //this.Subject4();
    //this.Subject5();
    //this.Subject6();
    //this.Subject7();
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

/*
fromEvent<any>(searchBar, 'keyup')
.pipe(
  map(event => event.target.value),
  filter(query => query.length > 3),
  distinctUntilChanged(),
  debounceTime(333),
  tap(() => loadingEl.style.display = 'block'),
  switchMap(query => ajax(endpoint + query)),
  catchError((err, caught$) =>
    merge(of({ err }), caught$)
  ),
  tap(() => loadingEl.style.display = 'none')
)
.subscribe(function updatePageOrErr(results: any) {
    if (results.err) {
      alert(results.err);
    } else {
      displayResults(results.response);
    }
  },
  err => alert(err.message)
);
*/


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

  Scan2(){
    const subject = new Subject();
    const example = subject.pipe(
                                  scan((acc, curr) => Object.assign({}, acc, curr), {})
                                );
    const subscribe = example.subscribe(val =>
                                              console.log('Accumulated object:', val)
                                       );
    subject.next({ name: 'Joe' });
    subject.next({ age: 30 });
    subject.next({ favoriteLanguage: 'JavaScript' });
  }

  Subject1(){
    const subject = new Subject();
    const asyncSubject = new AsyncSubject();
    const behaviourSubject = new BehaviorSubject('a');
    const replySubject = new ReplaySubject(2);

    const subjects = { subject, asyncSubject, behaviourSubject, replySubject };

    console.log('subscribe1');
    subject.subscribe(x=>console.log('s1 subject'));
    asyncSubject.subscribe(x=>console.log('s1 asyncSubject'));
    behaviourSubject.subscribe(x=>console.log('s1 behaviourSubject'));
    replySubject.subscribe(x=>console.log('s1 replySubject'));

    console.log('\nNEXT(r)');
    subject.next(o=>o.next('r'))
    console.log('\nNEXT(x)');
    subject.next(o=>o.next('x'))

    console.log('\nNEXT(r)');
    asyncSubject.next(o=>o.next('r'))
    console.log('\nNEXT(x)');
    asyncSubject.next(o=>o.next('x'))

    console.log('\nNEXT(r)');
    behaviourSubject.next('r')
    console.log('\nNEXT(x)');
    behaviourSubject.next('x')

    console.log('\nNEXT(r)');
    replySubject.next(o=>o.next('r'))
    console.log('\nNEXT(x)');
    replySubject.next(o=>o.next('x'))

    console.log('subscribe2');
    subject.subscribe(x=>console.log('s2 subject'));
    asyncSubject.subscribe(x=>console.log('s2 asyncSubject'));
    behaviourSubject.subscribe(x=>console.log('s2 behaviourSubject'));
    replySubject.subscribe(x=>console.log('s2 replySubject'));

    console.log('\nNEXT(j)');
    subject.next(o=>o.next('j'))
    console.log('\nNEXT(s)');
    subject.next(o=>o.next('s'))

  }

  Subject2(){
 
    const subject = new Subject<number>();
    subject.subscribe({
                        next: (v) => console.log(`observerA: ${v}`)
                      });
    subject.subscribe({
                        next: (v) => console.log(`observerB: ${v}`)
                      });
    subject.next(1);
    subject.next(2);
  }

  Subject3(){

    const subject = new Subject<number>();
    subject.subscribe({
                        next: (v) => console.log(`observerA: ${v}`)
                      });
    subject.subscribe({
                        next: (v) => console.log(`observerB: ${v}`)
                      });
    const observable = from([1, 2, 3]);
    observable.subscribe(subject);
  }

  Subject4(){
    
    const subject = new BehaviorSubject(0); // 0 is the initial value
    subject.subscribe({
                        next: (v) => console.log(`observerA: ${v}`)
                      });
    subject.next(1);
    subject.next(2);
    subject.subscribe({
                        next: (v) => console.log(`observerB: ${v}`)
                      });
    subject.next(3);
  }

  Subject5(){
    const subject = new ReplaySubject(3); // buffer 3 values for new subscribers
    subject.subscribe({
                        next: (v) => console.log(`observerA: ${v}`)
                      });
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    subject.subscribe({
                        next: (v) => console.log(`observerB: ${v}`)
                      });                      
    subject.next(5)
  }

  Subject6(){
    const subject = new ReplaySubject(100, 500 /* windowTime */);
    subject.subscribe({
                        next: (v) => console.log(`observerA: ${v}`)
                      });
    let i = 1;
    setInterval(() => subject.next(i++), 200);
    setTimeout(() => {
                      subject.subscribe({
                        next: (v) => console.log(`observerB: ${v}`)
                      });
                    }, 1000);
  }

  Subject7(){
    const subject = new AsyncSubject();
    subject.subscribe({
                        next: (v) => console.log(`observerA: ${v}`)
                      });
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    subject.subscribe({
                        next: (v) => console.log(`observerB: ${v}`)
                      }); 
    subject.next(5);
    subject.complete();
  }
}

