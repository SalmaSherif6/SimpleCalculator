import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EditService } from './odata.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { Product } from './model';
import { FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { GridComponent } from '@progress/kendo-angular-grid';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let editServiceSpy: jasmine.SpyObj<EditService>;
  let mockGridComponent: Partial<GridComponent>; // Use Partial to create a partial mock

  beforeEach(async () => {
    editServiceSpy = jasmine.createSpyObj('EditService', ['saveChanges', 'cancelChanges']);

    mockGridComponent = {
      closeCell: jasmine.createSpy('closeCell'),
      cancelCell: jasmine.createSpy('cancelCell')
    } as Partial<GridComponent>;

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      providers: [{ provide: EditService, useValue: editServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });


  it("should Unit Price More than or equal 0", () => {
    const product = new Product();
    product.UnitPrice = 50;
    const formGroup = component.createFormGroup(product);
    expect(formGroup.get("UnitPrice")?.value).toBeGreaterThanOrEqual(0);
  });

  it("sarah-1- Product name should be longer than 2 characters", () => {
    const product = new Product();
    product.ProductName = "Sarah";
    const formGroup = component.createFormGroup(product);
    expect(formGroup.get("ProductName")?.value.length).toBeGreaterThan(2);
  });

  it("sarah-2- Product price should be a number", () => {
    const product = new Product();
    product.UnitPrice = 12;
    const formGroup = component.createFormGroup(product);
    expect(formGroup.get("UnitPrice")?.value).not.toBeNull();
  });

  it("sarah-3- Discontinued should be true", () => {
    const product = new Product();
    product.Discontinued = true;
    const formGroup = component.createFormGroup(product);
    expect(formGroup.get("Discontinued")?.value).toBeTrue();
  });

  it("sarah-4- units in stock must be positive", () => {
    const product = new Product();
    product.UnitsInStock = 12;
    const formGroup = component.createFormGroup(product);
    expect(formGroup.get("UnitsInStock")?.value).toBeGreaterThan(0);
  });

  it("Youssef-1- should invalidate the price field when it is empty", () => {
    const formGroup = component.createFormGroup(new Product());
    formGroup.controls["UnitPrice"].setValue(null);
    expect(formGroup.get("UnitPrice")?.value).toBeNull();
  });

  it("Youssef-2- should invalidate the price field when set to a negative value", () => {
    const formGroup = component.createFormGroup(new Product());
    formGroup.controls["UnitPrice"].setValue(-1);
    expect(formGroup.get("UnitPrice")?.value).toBeLessThan(0);
  });

  it("Youssef-3- should invalidate the UnitsInStock field when set to a negative value", () => {
    const formGroup = component.createFormGroup(new Product());
    formGroup.controls["UnitsInStock"].setValue(-5);
    expect(formGroup.get("UnitsInStock")?.value).toBeLessThan(0);
  });

  it("Youssef-4- should validate the Discontinued field when set to a true value", () => {
    const formGroup = component.createFormGroup(new Product());
    formGroup.controls["Discontinued"].setValue(true);
    expect(formGroup.controls["Discontinued"].valid).toBeTrue();
  });

  const initialProducts: Product[] = [
    { ProductID: 1, ProductName: 'Tofuuu', UnitPrice: 500, Discontinued: false, UnitsInStock: 17 },   
    { ProductID: 2, ProductName: 'Pavlova', UnitPrice: 150, Discontinued: true, UnitsInStock: 100 },   
    { ProductID: 3, ProductName: 'Carnarvon Tigers', UnitPrice: 170, Discontinued: true, UnitsInStock: 25 },     
    { ProductID: 4, ProductName: 'pepsii', UnitPrice: 170, Discontinued: false, UnitsInStock: 51 },         
    { ProductID: 5, ProductName: 'Original Frankfurter grüne Soße', UnitPrice: 150, Discontinued: false, UnitsInStock: 6 },  
  ];

  initialProducts.forEach((product, index) => {
    it(`Product ${index + 1} - should not allow negative numbers for UnitsInStock`, () => {
      const formGroup: FormGroup = component.createFormGroup(product);
      const unitsInStockValue = formGroup.get('UnitsInStock')?.value;
      expect(unitsInStockValue).toBeGreaterThanOrEqual(0);
      expect(formGroup.get('UnitsInStock')?.valid).toBeTrue(); 
    });

    it(`Product ${index + 1} - should require ProductName to be filled`, () => {
      const formGroup: FormGroup = component.createFormGroup(product);
      const productNameControl = formGroup.get('ProductName');
      expect(productNameControl?.value).toBeTruthy(); 
      expect(productNameControl?.valid).toBeTrue();
    });

    it(`Product ${index + 1} - Product name should be longer than 5 characters`, () => {
      const formGroup: FormGroup = component.createFormGroup(product);
      const productNameControl = formGroup.get('ProductName');
      expect(productNameControl?.value.length).toBeGreaterThan(5);
    });

    it(`Product ${index + 1} - should set Unit Price to a value greater than or equal to 100`, () => {
      const formGroup: FormGroup = component.createFormGroup(product);
      const unitPriceValue = formGroup.get('UnitPrice')?.value;
      expect(unitPriceValue).toBeGreaterThanOrEqual(100); 
    });

    it(`Product ${index + 1} - should validate Product details`, () => {
      const formGroup: FormGroup = component.createFormGroup(product);
      const unitPriceValue = formGroup.get('UnitPrice')?.value;
      expect(unitPriceValue).not.toBeNull();
      expect(typeof unitPriceValue).toBe('number');
      const discontinuedValue = formGroup.get('Discontinued')?.value;
      expect(discontinuedValue).toBe(product.Discontinued); 
    });
  });

  const prod1 = new Product();
  prod1.ProductName = 'Mariam1';
  prod1.UnitPrice = 10;
  prod1.Discontinued = false;
  prod1.UnitsInStock = 4;

  const prod2 = new Product();
  prod2.ProductName = 'Mariam2';
  prod2.UnitPrice = 15;
  prod2.Discontinued = false;
  prod2.UnitsInStock = 3;

  const prod3 = new Product();
  prod3.ProductName = 'Mariam3';
  prod3.UnitPrice = 30;
  prod3.Discontinued = false;
  prod3.UnitsInStock = 4;

  const prod4 = new Product();
  prod4.ProductName = 'Mariam4';
  prod4.UnitPrice = 35;
  prod4.Discontinued = false;
  prod4.UnitsInStock = 5;

  const prod5 = new Product();
  prod5.ProductName = 'Mariam5';
  prod5.UnitPrice = 40;
  prod5.Discontinued = false;
  prod5.UnitsInStock = 6;

  const testProducts: Product[] = [prod1, prod2, prod3, prod4, prod5];

  it("should loop through all products in array", () => {
    testProducts.forEach(product => {
      const formGroup = component.createFormGroup(product);
      expect(formGroup.get("UnitPrice")?.value).toBeGreaterThanOrEqual(0);
      expect(formGroup.get("ProductName")).toBeDefined();
      expect(formGroup.get("UnitsInStock")?.value).toBeGreaterThanOrEqual(0);
      expect(formGroup.get("Discontinued")?.value).toBe(false);
    });
  });

  
  it('should call saveChanges on grid and editService when saveChanges is triggered', () => {
    component.saveChanges(mockGridComponent as GridComponent); // Cast to GridComponent
    expect(mockGridComponent.closeCell).toHaveBeenCalled();
    expect(mockGridComponent.cancelCell).toHaveBeenCalled();
    expect(editServiceSpy.saveChanges).toHaveBeenCalled();
  });

  it('should call cancelChanges on grid and editService when cancelChanges is triggered', () => {
    component.cancelChanges(mockGridComponent as GridComponent); // Cast to GridComponent
    expect(mockGridComponent.cancelCell).toHaveBeenCalled();
    expect(editServiceSpy.cancelChanges).toHaveBeenCalled();
  });
});
