import { NgModule } from '@angular/core';
import {
    MatInputModule, MatFormFieldModule, MatButtonModule
} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    exports: [
        MatInputModule, MatFormFieldModule, MatButtonModule, MatSnackBarModule
    ]
})
export class AppMaterialModule{

}