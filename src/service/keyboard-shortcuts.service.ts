import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KeyboardShortcutsService implements OnDestroy {
  private readonly keyPressSubscription: Subscription;

  private createTabSubject = new Subject<void>();
  private createTaskSubject = new Subject<void>();

  constructor() {
    this.keyPressSubscription = fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        filter(
          (event) =>
            event.ctrlKey && ['t', 'n'].includes(event.key.toLowerCase()),
        ),
      )
      .subscribe((event) => this.handleKeyPress(event));
  }

  get createTab$() {
    return this.createTabSubject.asObservable();
  }

  get createTask$() {
    return this.createTaskSubject.asObservable();
  }

  private handleKeyPress(event: KeyboardEvent): void {
    event.preventDefault();

    // TODO test on Windows
    switch (event.key.toLowerCase()) {
      case 't':
        this.createTabSubject.next();
        console.log('Shortcut "^ + T" premuto: crea nuovo Tab');
        break;

      case 'n':
        this.createTaskSubject.next();
        console.log('Shortcut "^ + N" premuto: crea nuovo Task');
        break;

      default:
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.keyPressSubscription) {
      this.keyPressSubscription.unsubscribe();
    }
  }
}
