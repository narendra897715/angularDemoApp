import { NgModule } from '@angular/core';
import {
    MatInputModule, MatFormFieldModule, MatButtonModule
} from '@angular/material';

@NgModule({
    exports: [
        MatInputModule, MatFormFieldModule, MatButtonModule
    ]
})
export class AppMaterialModule{

}