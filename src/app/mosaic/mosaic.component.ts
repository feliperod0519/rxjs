import { Component, OnInit } from '@angular/core';
import { merge, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.css']
})
export class MosaicComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    let canvas = <HTMLCanvasElement>document.querySelector('canvas');
    canvas.width = 450;
    canvas.height = 540;
    let ctx = canvas.getContext('2d');
    let coords = { x: 45, y: 54 };
    const endPoint = "http://localhost:3000/mosaic";
    ajax.getJSON(endPoint).pipe(
                                  map(j=>console.log(j)),
                                  catchError(error=>{
                                                      console.log(error);
                                                      return of(error);
                                                    })
                               ).subscribe(x=>console.log(x));

  }
  /*hello*/
}
