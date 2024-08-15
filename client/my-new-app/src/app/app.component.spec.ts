import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponentd', () => {
  let arr;
  beforeEach(async () => {
    arr = [];
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have the 'my-new-app' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('my-new-app');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain(
  //     'Hello, my-new-app'
  //   );
  // });

  it('test arr length', () => {
    arr.push(1);
    expect(arr.length).toBe(1);
  });
 

  // it('test my title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   let name = app.title;
  //   expect(name).toBe('my-new-app');
  // });
it('test my title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let name = app.title;
    expect(name).toBe('my-new-app');
  });

  it('test doDivide', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let num = app.doDivide(4);
    expect(num).toBe(2);
  });
  // A
  it('test h1', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const element_H1 =
      fixture.debugElement.nativeElement.querySelector('h2').textContent;
    expect(element_H1).toBe('Hello, Mariam');
  });
});
