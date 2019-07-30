import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dn-d',
  templateUrl: './dn-d.component.html',
  styleUrls: ['./dn-d.component.css']
})
export class DnDComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    let draggable = document.querySelector<HTMLElement>('#draggable');
    let mouseDown$ = fromEvent<MouseEvent>(draggable,'mousedown');
    let mouseMove$ = fromEvent<MouseEvent>(draggable,'mousemove');

    mouseDown$.subscribe(()=>{
                                mouseMove$.pipe(
                                  map(e=>{
                                            e.preventDefault();
                                            return {X:e.clientX, Y:e.clientY};
                                         }),
                                  takeUntil(fromEvent<MouseEvent>(draggable,'mouseup'))      
                                ).subscribe((coord)=>{
                                                        draggable.style.left = coord.X + 'px';
                                                        draggable.style.top = coord.Y + 'px';
                                                     });
                             });

  }

}
