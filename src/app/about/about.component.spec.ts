import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let component: AboutComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AboutComponent] }).compileComponents();
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders every bio paragraph', () => {
    const rendered = fixture.nativeElement.querySelectorAll('.bio-card p');
    expect(component.bioParagraphs.length).toBeGreaterThan(0);
    expect(rendered.length).toBe(component.bioParagraphs.length);
  });

  it('renders every skill tier with all of its skills', () => {
    const tiers = fixture.nativeElement.querySelectorAll('.skill-tier');
    const chips = fixture.nativeElement.querySelectorAll('.skill-chip');
    const skillCount = component.info.skillTiers.reduce((sum, tier) => sum + tier.skills.length, 0);

    expect(tiers.length).toBe(component.info.skillTiers.length);
    expect(chips.length).toBe(skillCount);
  });

  it('shows one fixed profile photo', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('.profile-image');
    expect(img.getAttribute('src')).toBe(component.picture);
  });
});
