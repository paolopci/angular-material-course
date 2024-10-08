import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

    description: string = '';
    form = this.fb.group({
        description: [this.course.description, Validators.required],
        category: [this.course.category, Validators.required],
        releasedAt: [new Date(), Validators.required],
        longDescription: [this.course.longDescription, Validators.required]
    });

    constructor(private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private course: Course,
        private dialogRef: MatDialogRef<CourseDialogComponent>) {

        this.description = course.description;
    }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

    save() {
        //! passo il riferimento a openEditCourseDialog che lo usa in  return dialogRef.afterClosed();
        this.dialogRef.close(this.form.value);
    }
}

export function openEditCourseDialog(dialog: MatDialog, course: Course) { //! particolare Service x le Dialog view

    // le finestre di Dialog hanno bisogno di una configurazione
    const config = new MatDialogConfig();

    config.disableClose = true; //! x evitare la chiusura accidentale se clicco su x
    config.autoFocus = true;
    config.panelClass = 'modal-panel';
    config.backdropClass = 'backdrop-modal-panel';

    config.data = {
        ...course
    };


    const dialogRef = dialog.open(CourseDialogComponent, config);

    //! tra le varie opzioni questa fa si dopo la chiusura emette un observable 
    //! che ci informa della chiusura
    return dialogRef.afterClosed();

}

