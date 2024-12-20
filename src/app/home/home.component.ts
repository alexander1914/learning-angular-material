import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "../services/courses.service";
import {map} from "rxjs/operators";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {        
        const courses$ = this.coursesService.findAllCourses();
        console.log('Courses Observable:', courses$);
        
        this.beginnerCourses$ = courses$.pipe(
            map(res => {
              console.log('API Response:', res);
              return res["payload"];
            })
        );

        this.beginnerCourses$ = courses$.pipe(
            map(courses => {
              console.log('Beginner Courses:', courses.filter(course => course.category === 'BEGINNER'));
              return courses.filter(course => course.category === 'BEGINNER');
            })
          );
          
          this.advancedCourses$ = courses$.pipe(
            map(courses => {
              console.log('Advanced Courses:', courses.filter(course => course.category === 'ADVANCED'));
              return courses.filter(course => course.category === 'ADVANCED');
            })
          );
    }

}
