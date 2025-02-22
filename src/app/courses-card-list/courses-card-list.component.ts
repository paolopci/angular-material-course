import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout'
import { filter } from 'rxjs/operators';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];
    // valori di default
    cols: number = 3;
    rowHeight: string = '500px'
    handsetPortrait = false;

    constructor(private dialog: MatDialog, private responsive: BreakpointObserver) {
    }

    ngOnInit() {
        this.responsive.observe(
            [
                Breakpoints.TabletPortrait,
                Breakpoints.TabletLandscape,
                Breakpoints.HandsetPortrait,
                Breakpoints.HandsetLandscape,
            ]
        )
            .subscribe(result => {

                // se nessuna delle opzioni sopra va bene uso questi.
                this.cols = 2;
                this.rowHeight = '430px'
                this.handsetPortrait = false;

                const breakpoints = result.breakpoints;

                if (breakpoints[Breakpoints.TabletPortrait]) {
                    this.cols = 2
                } else if (breakpoints[Breakpoints.TabletLandscape]) {
                    this.cols = 2;
                    //  this.rowHeight = '430px';
                } else if (breakpoints[Breakpoints.HandsetLandscape]) {
                    this.cols = 1;
                }
                else if (breakpoints[Breakpoints.HandsetPortrait]) {
                    this.cols = 1;
                    this.rowHeight = '430px';
                    this.handsetPortrait = true;
                }
                else if (breakpoints[Breakpoints.XSmall]) {
                    this.cols = 1;
                }
            });
    }

    editCourse(course: Course) {
        openEditCourseDialog(this.dialog, course)
            .pipe(
                filter(val => !!val)
            )
            .subscribe(
                val => console.log('new course value:', val)
            );

    }

}









