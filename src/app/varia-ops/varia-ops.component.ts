import { Component, OnInit } from '@angular/core';
import { of, Subject, Observable } from 'rxjs';
import { scan, map } from 'rxjs/operators';
import { Button } from 'protractor';
import { CompileTemplateMetadata } from '@angular/compiler';

@Component({
  selector: 'app-varia-ops',
  templateUrl: './varia-ops.component.html',
  styleUrls: ['./varia-ops.component.css']
})
export class VariaOpsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('(Scan 1)');
    this.scan1();
    console.log('(Scan 2)');
    this.scan2();
    console.log('(Subject 1)');
    this.subject1();
    console.log('(Subject 2)');
    this.subject2();
    console.log('(Subject 3)');
    this.subject3();
    console.log('(Subject 4)');
    //this.subject4();
    console.log('(Observables 1)');
    this.observable1();
  }

  scan1(){
    let source = of(1,2,3);
    source.pipe(
                  scan((acc,i)=>acc+i,0)).subscribe(console.log);
  }

  scan2(){
    let subject = new Subject();
    subject.pipe(
                  scan((acc,i)=>Object.assign({},acc,i),{}) 
                ).subscribe(console.log);
    subject.next({name:'Peter Kantroupus'});
    subject.next({age:30});
    subject.next({company:'Cavemen inc.'});
  }

  subject1(){
    //Unicast
    const myObs$ = Observable.create((i$)=>{
                                              i$.next(Math.random());
                                           });
    myObs$.subscribe(console.log);
    myObs$.subscribe(console.log);
    //Multicast
    // subscriber 1
    let subject = new Subject();
    subject.subscribe((data) => { console.log(data); });
    // subscriber 2
    subject.subscribe((data) => { console.log(data); });
    subject.next(Math.random());
    
  }
  
  subject2(){
    //Observers are data producers while Subjects are data consumers and data providers
    const myObs$ = Observable.create((i$)=>{
                                              i$.next(Math.random());
                                            });
    let subject = new Subject();
    subject.subscribe((d)=>{ console.log(d); });
    subject.subscribe((d)=>{ console.log(d); });
    myObs$.subscribe(subject);
  }

  subject3(){
    /* DO NOT DO THIS */
    let someButton = document.querySelector('#subject-button');
    let someOtherButton = document.querySelector('#subject-button-2');
    let subject = new Subject();
    someButton.addEventListener('click',()=> { 
                                                subject.next('hello'); 
                                             });
    subject.subscribe(console.log);
    /* END DO NOT DO THIS*/
    const click_Test$ = Observable.create((i$)=>{
                                                  i$.next(x=>{
                                                                let message:string = 'new hello';
                                                                return message;
                                                             });
                                                });
    //someOtherButton.addEventListener('click',click_Test$.subscribe(console.log));     
    
    const clicks = new Observable(observer => {
      const handler = (e) => observer.next(e);
      someOtherButton.addEventListener('click', handler);
      return () => someOtherButton.removeEventListener('click', handler);
    });

    /*
    let click$ = new Observable(x=>{
                                      let eventHandler = (e) => x.next(e);
                                      someOtherButton.addEventListener('click',eventHandler);
                                   });
                                  */

  }

  subject4(){
    let newSubject = new Subject<number>();
    newSubject.subscribe({
                            next: (x)=> console.log(`A:${x}`)
                         });
    newSubject.subscribe({
                          next: (x)=> console.log(`B:${x}`)
                         });
    newSubject.next(1);
    newSubject.next(2);

    let obsTest$= Observable.create((x$)=>{
                                              x$.next(y=>{ console.log(`B:${y}`) });
                                          });
    obsTest$.subscribe(1);
    //obsTest$.subscribe(console.log);                                
  }

  observable1(){
    const obs = new Observable(subs=>{
                                        subs.next(1);
                                        subs.next(2);
                                        subs.next(3);
                                        setTimeout(()=>{
                                                          subs.next(4);
                                                          subs.complete();
                                                       },1000);
                                     });
    console.log('before');
    obs.subscribe({
                    next(x){console.log(x);},
                    error(e){console.log(e.message);},
                    complete(){console.log('Finish');}
                  });
    console.log('end!');
  }

  /*
const subject = new Subject();
button.addEventListener(‘click’, () => subject.next('click');
subject.subscribe(x => console.log(x));


const clicks = new Observable(observer => {
  const handler = (e) => observer.next(e);
  button.addEventListener('click', handler);
  return () => button.removeEventListener('click', handler);
});


import { Subject } from 'rxjs';
 
const subject = new Subject<number>();
 
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
subject.next(1);
subject.next(2);
 
// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2



const myObs$ = Observable.create((i$)=>{
                                              i$.next(Math.random());
                                            });
  */
}

