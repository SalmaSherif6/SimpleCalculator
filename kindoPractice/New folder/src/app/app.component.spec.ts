import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EditService } from './odata.service'; // Import the service
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { Product } from './model';


TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
let editService: EditService;

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
        product.UnitPrice = 50;
        const formGroup = component.createFormGroup(product);
        expect(formGroup.get("UnitPrice")?.value).toBeGreaterThanOrEqual(0);
        // expect(formGroup.get("UnitPrice")?.value).toBeNull();
    });

    //5 unit test
    it("sarah-1- Product name should be longer than 2 characters", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        const product = new Product();
        product.ProductName = "Sarah";
        const formGroup = component.createFormGroup(product);
        expect(formGroup.get("ProductName")?.value.length).toBeGreaterThan(2);
    });

    it("sarah-2- Product price should be a number", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        const product = new Product();
        product.UnitPrice = 12;
        const formGroup = component.createFormGroup(product);
        expect(formGroup.get("UnitPrice")?.value).not.toBeNull();
    });

    it("sarah-3- Discontinued should be true", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        const product = new Product();
        product.Discontinued = true;
        const formGroup = component.createFormGroup(product);
        expect(formGroup.get("Discontinued")?.value).toBeTrue();
    });

    it("sarah-4- units in stock must be positive ", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        const product = new Product();
        product.UnitsInStock = 12;
        const formGroup = component.createFormGroup(product);
        expect(formGroup.get("UnitsInStock")?.value).toBeGreaterThan(0);
    });

    /* it("sarah-5- remove handler should include remove ", () => {
         const fixture = TestBed.createComponent(AppComponent);
         const component = fixture.componentInstance;
         editService = TestBed.inject(EditService);
         const product = new Product();
         const MockEvent: RemoveEvent = {
             dataItem: product,
             isNew: true,
             rowIndex: 1,
             sender:;
         }
         component.removeHandler(MockEvent);
         expect(component.removeHandler).toHaveBeenCalled();
     });
     */
    // sarah-3-should should Unit Price More than or equal 0

    //5 validations
    //
    it('zeyad -1- should not allow negative numbers for UnitsInStock', () => {
        // Arrange
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        const product = new Product();
        product.UnitsInStock = -10; // Set a negative value to test validation
    
    
        // Act
        const formGroup = component.createFormGroup(product);
        const unitsInStockValue = formGroup.get('UnitsInStock')?.value;
    
        // Assert
        expect(unitsInStockValue).toBeLessThan(0);
        expect(formGroup.get('UnitsInStock')?.valid).toBeFalse();
      });
    
      it('zeyad -2- should require ProductName to be filled even if null', () => {
        // Arrange
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        const product = new Product();
        product.ProductName = null;
    
        // Act
        const formGroup = component.createFormGroup(product);
        const productNameControl = formGroup.get('ProductName');
    
        // Assert
        expect(productNameControl?.value).toBeNull();
        expect(productNameControl?.valid).toBeFalse();
        expect(productNameControl?.errors).toEqual({ required: true });
        expect(formGroup.valid).toBeFalse();
      });
    
      it('zeyad-3- Product name should be longer than 5 characters', () => {
        // Arrange
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        const product = new Product();
        product.ProductName = 'pepsii';
    
        // Act
        const formGroup = component.createFormGroup(product);
        const productNameControl = formGroup.get('ProductName');
        const productNameLength = productNameControl?.value.length;
    
        // Assert
        expect(productNameLength).toBeGreaterThan(5);
      });
    
      it('Zeyad -4- should set Unit Price to a value greater than or equal to 100', () => {
        // Arrange
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        const product = new Product();
        product.UnitPrice = 200; // Set a value equal to 100
    
    
        // Act
        const formGroup = component.createFormGroup(product);
        const unitPriceValue = formGroup.get('UnitPrice')?.value;
    
        // Assert
        expect(unitPriceValue).toBeGreaterThanOrEqual(100);
      });
    
      it('Zeyad -5- should validate Product details', () => {
        // Arrange
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        const product = new Product();
        product.UnitPrice = 15;
        product.Discontinued = true;
    
        // Act
        const formGroup = component.createFormGroup(product);
    
        // Assert
        const unitPriceValue = formGroup.get('UnitPrice')?.value;
        expect(unitPriceValue).not.toBeNull();
        expect(typeof unitPriceValue).toBe('number');
        const discontinuedValue = formGroup.get('Discontinued')?.value;
        expect(discontinuedValue).toBeTrue();
      });

});
