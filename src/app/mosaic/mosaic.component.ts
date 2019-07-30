import { Component, OnInit } from '@angular/core';
import { merge, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { mosaicPiece } from '../shared/models/mosaic-piece';

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
    //http-server based version
    const endPoint = "http://localhost:3000/mosaic";
    ajax.getJSON(endPoint).pipe(
                                  map(j=>console.log(j)),
                                  catchError(error=>{
                                                      console.log(error);
                                                      return of(error);
                                                    })
                               ).subscribe(x=>console.log(x));
    //static version
    //check angular.json an assets
    const staticEndPointPrefix = "http://localhost:4200/assets/coverpart-";
    let rqsts = [];
    for (let i:number=0; i<=9; i++){
      for (let j:number=0; j<=9; j++){
        let newEndPoint = `${staticEndPointPrefix}${i}-${j}.png`;
        let r$ = ajax({
          url: newEndPoint,
          responseType : 'blob'
        }).pipe(
                  map(r=>{
                            return { x:i, y:j, blob:r.response }
                         })
               )//.subscribe(r=>{ console.log(`${r.x}-${r.y}`) });
        rqsts.push(r$);
      }
    }
    /*
    merge(...rqsts).subscribe(
            (val) => { this.drawToPage(val.blob,val.x,val.y,ctx); },
            err => alert(err)
    );*/
    /* alternative way....*/
    for (let r$ of rqsts){
      r$.subscribe({
                      next: (r)=>{
                                   this.drawToPage(r.blob,r.x,r.y,ctx);
                                 },
                      error: (e)=>{
                                      console.log(e.message);
                                  },
                      done: ()=>{console.log('DONE!');}
                   })
      }
     /**/
  }

  drawToPage(blob,x:number,y:number,ctx:CanvasRenderingContext2D){
    let coords = { x: 45, y: 54 };
    let img = new Image();
    img.onload= ()=>{
                      ctx.drawImage(img,x*coords.x,y*coords.y,coords.x,coords.y);
                    }
    img.src = URL.createObjectURL(blob);
  }
  /*hello*/

  /*
  import { ajax } from 'rxjs/ajax';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

let canvas = <HTMLCanvasElement>document.querySelector('canvas');
canvas.width = 450;
canvas.height = 540;
let ctx = canvas.getContext('2d');
let coords = { x: 45, y: 54 };

function drawToPage(config) {
  let img = new Image();
  img.onload = function () {
    ctx.drawImage(img, config.x * coords.x, config.y * coords.y, coords.x, coords.y);
  }
  img.src = URL.createObjectURL(config.blob);
}

let requests = [];
for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    let endpoint = 
      `http://localhost:3000/api/managingAsync/assets/coverpart-${x}-${y}.png`;
    let request$ = ajax({
      url: endpoint,
      responseType: 'blob'
    })
    .pipe(
      map(res => ({
        blob: res.response,
        x,
        y
      }))
    );
    requests.push(request$);
  }
}

merge(...requests)
.subscribe(
  val => drawToPage(val),
  err => alert(err)
);

  */
}
