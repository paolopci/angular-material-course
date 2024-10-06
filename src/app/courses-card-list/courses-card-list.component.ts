import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {


    @Input()
    courses: Course[];

    editDialog: MatDialog = null;

    constructor() {
    }

    ngOnInit() {

    }

    editCourse(course: Course) {
        openEditCourseDialog(this.editDialog, course);

    }

}









