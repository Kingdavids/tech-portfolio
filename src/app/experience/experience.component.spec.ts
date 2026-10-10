import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let fixture: ComponentFixture<ExperienceComponent>;
  let component: ExperienceComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ExperienceComponent] }).compileComponents();
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders a card per role with its bullets and stack', () => {
    const cards: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('.experience-card'));
    expect(cards.length).toBe(component.entries.length);

    cards.forEach((card, i) => {
      const entry = component.entries[i];
      expect(card.querySelector('.experience-company')!.textContent).toContain(entry.company);
      expect(card.querySelectorAll('li').length).toBe(entry.bullets.length);
      expect(card.querySelectorAll('.experience-chip').length).toBe(entry.stack.length);
    });
  });

  it('lists roles with a company, dates and at least one bullet', () => {
    component.entries.forEach(entry => {
      expect(entry.company).toBeTruthy();
      expect(entry.dates).toBeTruthy();
      expect(entry.bullets.length).toBeGreaterThan(0);
    });
  });
});
