import { Component, OnInit } from '@angular/core';
import { of, Subject, Observable } from 'rxjs';
import { scan, map } from 'rxjs/operators';

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


  /*
import * as Rx from "rxjs";

const observable = Rx.Observable.create((observer) => {
    observer.next(Math.random());
});

const subject = new Rx.Subject();

// subscriber 1
subject.subscribe((data) => {
    console.log(data); // 0.24957144215097515 (random number)
});

// subscriber 2
subject.subscribe((data) => {
    console.log(data); // 0.24957144215097515 (random number)
});

observable.subscribe(subject);

  */
}

