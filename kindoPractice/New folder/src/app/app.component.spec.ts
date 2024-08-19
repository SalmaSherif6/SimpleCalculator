import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EditService } from './odata.service'; 
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { Product } from './model';
import { FormGroup } from '@angular/forms';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
let editService: EditService;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule], 
      providers: [EditService],  
    }).compileComponents();
  });

  const products: Product[] = [
    { ProductID: 1, ProductName: 'Tofu', UnitPrice: 500, Discontinued: false, UnitsInStock: 17 },   
    { ProductID: 2, ProductName: 'Pavlova', UnitPrice: 150, Discontinued: true, UnitsInStock: -100 },   
    { ProductID: 3, ProductName: 'Carnarvon Tigers', UnitPrice: 170, Discontinued: true, UnitsInStock: -25 },     
    { ProductID: 4, ProductName: 'pepsii', UnitPrice: 17, Discontinued: false, UnitsInStock: 51 },         
    { ProductID: 5, ProductName: 'Original Frankfurter grüne Soße', UnitPrice: 150, Discontinued: false, UnitsInStock: 6 },  
  ];

  products.forEach((product, index) => {
    it(`Product ${index + 1} - should not allow negative numbers for UnitsInStock`, () => {
      // Arrange
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;

      // Act
      const formGroup: FormGroup = component.createFormGroup(product);
      const unitsInStockValue = formGroup.get('UnitsInStock')?.value;

      // Assert
      if (unitsInStockValue < 0) {
        expect(unitsInStockValue).toBeGreaterThanOrEqual(0); 
        expect(formGroup.get('UnitsInStock')?.valid).toBeTrue(); 
      } else {
        expect(formGroup.get('UnitsInStock')?.valid).toBeTrue();
      }
    });

    it(`Product ${index + 1} - should require ProductName to be filled`, () => {
      // Arrange
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;

      // Act
      const formGroup: FormGroup = component.createFormGroup(product);
      const productNameControl = formGroup.get('ProductName');

      // Assert
      if (product.ProductName === null) {
        expect(productNameControl?.value).toBeTruthy(); 
        expect(productNameControl?.valid).toBeTrue(); 
      } else {
        expect(productNameControl?.valid).toBeTrue();
      }
    });

    it(`Product ${index + 1} - Product name should be longer than 5 characters`, () => {
      // Arrange
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;

      // Act
      const formGroup: FormGroup = component.createFormGroup(product);
      const productNameControl = formGroup.get('ProductName');

      // Assert
      if (product.ProductName && product.ProductName.length <= 5) {
        expect(productNameControl?.value.length).toBeGreaterThan(5); 
      }
    });

    it(`Product ${index + 1} - should set Unit Price to a value greater than or equal to 100`, () => {
      // Arrange
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;

      // Act
      const formGroup: FormGroup = component.createFormGroup(product);
      const unitPriceValue = formGroup.get('UnitPrice')?.value;

      // Assert
      if (unitPriceValue < 100) {
        expect(unitPriceValue).toBeGreaterThanOrEqual(100); 
      }
    });

    it(`Product ${index + 1} - should validate Product details`, () => {
      // Arrange
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;

      // Act
      const formGroup: FormGroup = component.createFormGroup(product);

      // Assert
      const unitPriceValue = formGroup.get('UnitPrice')?.value;
      expect(unitPriceValue).not.toBeNull();
      expect(typeof unitPriceValue).toBe('number');
      const discontinuedValue = formGroup.get('Discontinued')?.value;
      expect(discontinuedValue).toBe(product.Discontinued); 
    });
  });
});
