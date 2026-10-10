import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsComponent } from './contacts.component';

describe('ContactsComponent', () => {
  let fixture: ComponentFixture<ContactsComponent>;
  let component: ContactsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContactsComponent] }).compileComponents();
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('keeps the send button disabled until the form is valid', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(component.reviewForm.valid).toBeFalse();
    expect(button.disabled).toBeTrue();

    component.reviewForm.setValue({ name: 'Ada', email: 'ada@example.com', comment: 'Hello' });
    fixture.detectChanges();
    expect(component.reviewForm.valid).toBeTrue();
    expect(button.disabled).toBeFalse();
  });

  it('rejects a malformed email address', () => {
    component.reviewForm.setValue({ name: 'Ada', email: 'not-an-email', comment: 'Hello' });
    expect(component.reviewForm.controls['email'].valid).toBeFalse();
  });

  it('links to LinkedIn and GitHub from the contact panel', () => {
    const hrefs = Array.from<HTMLAnchorElement>(fixture.nativeElement.querySelectorAll('.contact-json-value')).map(a =>
      a.getAttribute('href'),
    );
    expect(hrefs).toContain('https://www.linkedin.com/in/muyiwadavids/');
    expect(hrefs).toContain('https://github.com/Kingdavids');
  });
});
