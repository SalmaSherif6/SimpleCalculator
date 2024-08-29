import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { AppComponent } from './app.component';
import { EditService } from './odata.service';

@NgModule({
    declarations: [AppComponent], // Correct place for AppComponent
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        GridModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ButtonsModule
    ],
    bootstrap: [AppComponent],
    providers: [EditService]
})
export class AppModule {}
