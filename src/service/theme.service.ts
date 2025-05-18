import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const isDarkMode = savedTheme ? savedTheme === 'true' : prefersDark;

    this.setDarkMode(isDarkMode);
  }

  toggleDarkMode(): void {
    const newValue = !this.darkMode.value;
    this.setDarkMode(newValue);
  }

  private setDarkMode(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDark.toString());
    this.darkMode.next(isDark);
  }

  isDarkMode(): boolean {
    return this.darkMode.value;
  }
}
