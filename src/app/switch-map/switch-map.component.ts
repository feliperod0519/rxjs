import { Component, OnInit } from '@angular/core';
import { StackoverflowService } from '../stackoverflow.service';
import { stackOverflowEntry } from '../shared/models/stackOverflowEntry';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.css']
})
export class SwitchMapComponent implements OnInit {

  constructor(private stackOverflowService: StackoverflowService) { }

  ngOnInit() {
    this.getStackOverflowEntries('car');
  }

  getStackOverflowEntries(code: string){
      //this.stackOverflowService.get(code);
      //let i = this.stackOverflowService.response.length;
      console.log(this.stackOverflowService.get(code).length);
  }

}

/*

import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
}
*/