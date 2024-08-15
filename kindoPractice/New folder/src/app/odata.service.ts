import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Product } from './model';

const itemIndex = (item: Product, data: Product[]): number => {
    for (let idx = 0; idx < data.length; idx++) {
        if (data[idx].ProductID === item.ProductID) {
            return idx;
        }
    }

    return -1;
};

@Injectable()
export class EditService extends BehaviorSubject<Product[]> {
    private data: Product[] = [];
    private createdItems: Product[] = [];
    private updatedItems: Product[] = [];
    private deletedItems: Product[] = [];

    public loading = false;
    public counter = 0;

    constructor(private http: HttpClient) {
        super([]);
    }

    public assignValues(target: Product, source: Product): void {
        Object.assign(target, source);
    }

    public isNew(item: Product): boolean {
        return !item.ProductID;
    }

    public read(): void {
        this.loading = true;
        if (this.data.length) {
            this.loading = false;
            return super.next(this.data.reverse());
        }

        this.fetch().subscribe((data) => {
            this.data = data;
            this.counter = this.data.length;
            super.next(data.reverse());
            this.loading = false;
        });
    }

    public create(item: Product): void {
        item.ProductID = this.counter++;
        this.createdItems.push(item);
        this.data.unshift(item);
        super.next(this.data);
    }

    public update(item: Product): void {
        if (!this.isNew(item)) {
            const index = itemIndex(item, this.updatedItems);
            if (index !== -1) {
                this.updatedItems.splice(index, 1, item);
            } else {
                this.updatedItems.push(item);
            }
        } else {
            const index = this.createdItems.indexOf(item);
            this.createdItems.splice(index, 1, item);
        }
    }

    public remove(item: Product): void {
        let index = itemIndex(item, this.data);
        this.data.splice(index, 1);

        index = itemIndex(item, this.createdItems);
        if (index >= 0) {
            this.createdItems.splice(index, 1);
        } else {
            this.deletedItems.push(item);
        }

        index = itemIndex(item, this.updatedItems);
        if (index >= 0) {
            this.updatedItems.splice(index, 1);
        }

        super.next(this.data);
    }

    public cancelChanges(): void {
        this.data = [];
        this.deletedItems = [];
        this.updatedItems = [];
        this.createdItems = [];
        this.read();
    }

    public hasChanges(): boolean {
        return Boolean(this.deletedItems.length || this.updatedItems.length || this.createdItems.length);
    }

    public saveChanges(): void {
        if (!this.hasChanges()) {
            console.log('wrongly returned');
            return;
        }

        if (this.deletedItems.length) {
            this.deletedItems.forEach((item) => {
                this.deleteItems(item.ProductID).subscribe();
            });
        }

        if (this.updatedItems.length) {
            this.updatedItems.forEach((item, index) => {
                this.updateItems(item, index).subscribe();
            });
        }

        if (this.createdItems.length) {
            this.createdItems.forEach((item) => {
                this.createItems(item).subscribe();
            });
        }
    }

    public createItems(item: Product): Observable<Product> {
        this.createdItems = [];
        return this.http
            .post(`https://demos.telerik.com/kendo-ui/service-v4/odata/Products/`, item)
            .pipe(map((data: any) => <Product>data));
    }

    public deleteItems(index: number): Observable<Product> {
        this.deletedItems = [];
        return this.http
            .delete(`https://demos.telerik.com/kendo-ui/service-v4/odata/Products(${index})`)
            .pipe(map((data) => <Product>data));
    }

    public updateItems(dataItem: Product, index: number): Observable<Product> {
        return this.http
            .put(`https://demos.telerik.com/kendo-ui/service-v4/odata/Products(${dataItem.ProductID})`, this.updatedItems[index])
            .pipe(
                map((data) => {
                    this.updatedItems = [];
                    return <Product>data;
                })
            );
    }

    private fetch(): Observable<Product[]> {
        return this.http
            .get(`https://demos.telerik.com/kendo-ui/service-v4/odata/Products/`)
            .pipe(map((data: any) => <Product[]>data.value));
    }
}
