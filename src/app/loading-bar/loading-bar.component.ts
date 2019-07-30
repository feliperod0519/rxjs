import { Component, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { merge } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() 
  {
    let progressBar = <HTMLElement>document.querySelector('.progress-bar');
    let arrayOfRequests = [];
    const endPoint = "http://localhost:4200/loadingBar/";
    for (let i = 0; i < 128; i++) {
      arrayOfRequests.push(ajax(endPoint + i));
    }
    merge(...arrayOfRequests).pipe(
                                    scan((prev) => prev + (100 / arrayOfRequests.length), 0)
                                  ).subscribe(percentDone => {
                                                                progressBar.style.width = percentDone + '%';
                                                                progressBar.innerText = Math.round(percentDone) + '%';
                                                              });
  }

}
