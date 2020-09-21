import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    exports: [
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        DragDropModule
    ]
})
export class MaterialModule { }
