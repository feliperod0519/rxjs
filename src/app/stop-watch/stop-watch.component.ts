import { Component, OnInit } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.css']
})
export class StopWatchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.stopWatch(document.querySelector('#start-button'),document.querySelector('#stop-button'));
  }

  stopWatch(startButton:any, stopButton:any){
    let tenthSecond$ = interval(1000);   
    let stopClick$ = fromEvent(stopButton,'click');
    let result = document.querySelector<HTMLElement>(".output");
    let startClick$ = fromEvent(startButton,'click').subscribe(()=>{
                                                                      tenthSecond$.pipe(
                                                                         map((i)=>
                                                                                  {
                                                                                    return i;
                                                                                  }),
                                                                         takeUntil(fromEvent(stopButton,'click'))
                                                                      ).subscribe(n=>result.innerText = n + ' s');
                                                                   })
  }

}
