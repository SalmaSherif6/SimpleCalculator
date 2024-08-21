import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
} from "@angular/forms";

import {
  AddEvent,
  GridDataResult,
  CellClickEvent,
  CellCloseEvent,
  SaveEvent,
  CancelEvent,
  GridComponent,
  RemoveEvent,
} from "@progress/kendo-angular-grid";
import { State, process } from "@progress/kendo-data-query";

import { Keys } from "@progress/kendo-angular-common";
import { Product } from "./model";
import { EditService } from "./odata.service";

import { map } from "rxjs/operators";
import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

@Component({
  selector: "my-app",
  template: "./app.component.html",
})
export class AppComponent implements OnInit {
  public view!: Observable<GridDataResult>;
  public changes = {};

  public gridState: State = {
    skip: 0,
    take: 5,
  };

  constructor(
    private formBuilder: FormBuilder,
    public editService: EditService
  ) {}
  SarahError1: boolean = false;
  errorNow: boolean = false;
  ZeyadError1: boolean = false;

  public ngOnInit(): void {
    this.view = this.editService.pipe(
      map((data) => process(data, this.gridState))
    );

    this.editService.read();
  }

  public onStateChange(state: State): void {
    this.gridState = state;

    this.editService.read();
  }

  public cellClickHandler(args: CellClickEvent): void {
    if (!args.isEdited) {
      args.sender.editCell(
        args.rowIndex,
        args.columnIndex,
        this.createFormGroup(args.dataItem)
      );
    }
  }

  public cellCloseHandler(args: CellCloseEvent): void {
    const { formGroup, dataItem } = args;

    if (!formGroup.valid) {
      // prevent closing the edited cell if there are invalid values.
      args.preventDefault();
    } else if (formGroup.dirty) {
      if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) {
        return;
      }

      this.editService.assignValues(dataItem, formGroup.value);
      this.editService.update(dataItem);
    }
  }

  public addHandler(args: AddEvent): void {
    args.sender.addRow(this.createFormGroup(new Product()));
  }

  public cancelHandler(args: CancelEvent): void {
    args.sender.closeRow(args.rowIndex);
  }

  public saveHandler(args: SaveEvent): void {
    if (args.formGroup.valid) {
      this.editService.create(args.formGroup.value);
      if (args.formGroup.value.ProductName.length < 2) {
        this.SarahError1 = true;
      }
      args.sender.closeRow(args.rowIndex);
    }
  }

  public removeHandler(args: RemoveEvent): void {
    this.editService.remove(args.dataItem);

    args.sender.cancelCell();
  }

  public saveChanges(grid: GridComponent): void {
    grid.closeCell();
    grid.cancelCell();

    this.editService.saveChanges();
  }

  public cancelChanges(grid: GridComponent): void {
    grid.cancelCell();

    this.editService.cancelChanges();
  }

  // Custom validator for positive units in stock
  private positiveNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      return value != null && value <= 0 ? { positiveNumber: true } : null;
    };
  }

  public createFormGroup(dataItem: Product): FormGroup {
    if (dataItem.UnitPrice < 0) this.errorNow = true;
    if (dataItem.UnitsInStock >= 0) this.ZeyadError1 = true;

    return this.formBuilder.group({
      ProductID: dataItem.ProductID,
      ProductName: [dataItem.ProductName, Validators.required],
      UnitPrice: dataItem.UnitPrice,
      UnitsInStock: [
        dataItem.UnitsInStock,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]{1,3}"),
          this.positiveNumberValidator(), // Add the custom validator here
        ]),
      ],
      Discontinued: dataItem.Discontinued,
    });
  }
}
