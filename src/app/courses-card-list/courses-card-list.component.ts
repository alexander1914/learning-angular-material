import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';
import { filter } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
    standalone: false
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];

    cols = 3;

    rowHeigth = '500px';

    handsetPortrait = false;

    constructor(private dialog: MatDialog, private responsive: BreakpointObserver) { }

    ngOnInit() {
        this.responsive.observe([
            Breakpoints.TabletPortrait,
            Breakpoints.TabletLandscape,
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape
        ])
            .subscribe(result => {

                this.cols = 3;
                this.rowHeigth = "500px";
                this.handsetPortrait = false;

                const brekpoints = result.breakpoints;

                if (brekpoints[Breakpoints.TabletPortrait]) {
                    this.cols = 1;
                } else if (brekpoints[Breakpoints.HandsetPortrait]) {
                    this.cols = 1;
                    this.rowHeigth = "430px";
                    this.handsetPortrait = true;
                } else if (brekpoints[Breakpoints.HandsetLandscape]) {
                    this.cols = 1;
                } else if (brekpoints[Breakpoints.TabletLandscape]) {
                    this.cols = 2;
                }

            });
    }

    editCourse(course: Course) {

        openEditCourseDialog(this.dialog, course)
            .pipe(
                filter(val => !!val)
            )
            .subscribe(
                val => console.log("new course value:", val)
            );
    }

}









