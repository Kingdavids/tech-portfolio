import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('renders the five page sections', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;

    ['app-hero', 'app-about', 'app-experience', 'app-work', 'app-contacts'].forEach(selector => {
      expect(root.querySelector(selector)).withContext(selector).not.toBeNull();
    });
  });
});
