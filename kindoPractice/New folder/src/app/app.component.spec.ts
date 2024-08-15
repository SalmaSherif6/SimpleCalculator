import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EditService } from './odata.service'; // Import the service
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { Product } from './model';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [HttpClientModule], // Import HttpClientModule to provide HttpClient
            providers: [EditService],  // Add the EditService to the providers array
        }).compileComponents();
    });

    it("should create a FormGroup with the correct controls", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges(); // Trigger initial data binding
        expect(component.gridState.skip).toBe(0);
        // Add further assertions or interactions with the component
    });
    it("should Unit Price More than or equal 0", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance; 
        const product = new Product(); 
        product.UnitPrice = -50;
        const formGroup = component.createFormGroup(product); 
        expect(formGroup.get("UnitPrice")?.value).toBeGreaterThanOrEqual(0);
        expect(formGroup.get("UnitPrice")?.value).toBeNull();
     });
     //5 unit test
     // sarah-1-should should Unit Price More than or equal 0
     // sarah-2-should should Unit Price More than or equal 0
     // sarah-3-should should Unit Price More than or equal 0

     //5 validations
     //
    
});
