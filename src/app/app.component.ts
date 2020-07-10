import { Component } from '@angular/core';
import {fromEvent, interval, Subject, timer} from 'rxjs';
import {buffer, debounceTime, filter, map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'testwork';
  seconds = 0;
  minutes = 0;
  hours = 0;
  time = null;
  constructor() {
  }

  click = fromEvent(document, 'click');

  doubleClick = this.click.pipe(
    buffer(
      this.click.pipe(debounceTime(300))
    ),
    map(list => {
      return list.length;
    }),
    filter(x => x === 2),
  );
  timer = interval(1000).pipe(takeUntil(this.doubleClick));

  TimerStart() {
    if (this.time === null) { // проверяем работает ли сейчас таймер
    const s = timer(1000, 1000); // создаём таймер с перерывом в секунду
    this.time = s.subscribe(value => this.Tick()); // подписываемся и вызываем функцию Tick() до отписки
    }
    else { // если он таки работал мы просто отписываемся и обнуляем значения
      this.TimerWait();
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
    }
  }

  TimerWait() {
    if (this.time != null){
      this.time.unsubscribe();
      this.time = null;
    }
  }

  TimerCancel() {
    if (this.time != null){
      this.time.unsubscribe();
      this.time = null;
    }
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.TimerStart();
  }

  Tick() {
    this.seconds++;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes === 60){
        this.minutes = 0;
        this.hours++;
      }
    }
  }

}
