import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChildren } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import { debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize } from 'rxjs/operators';
import { merge, fromEvent, throwError } from "rxjs";
import { Lesson } from '../model/lesson';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;

  lessons: Lesson[] = [];
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selection = new SelectionModel<Lesson>(true, []);

  constructor(private route: ActivatedRoute,
    private coursesService: CoursesService) {

  }
  //! l'array stabilisce l'ordine delle colonne della mat-Table
  displayedColumns = ['seqNo', 'description', 'duration'];
  //! voglio che di default la modalità multilevel sia OFF e attivabile x 
  //! una riga alla volta
  expandedLesson: Lesson = null;


  ngOnInit() {

    this.course = this.route.snapshot.data["course"];
    this.loadLessonsPage()
  }

  loadLessonsPage() {
    this.loading = true;
    this.coursesService.findLessons(
      this.course.id,
      this.sort?.direction ?? 'asc',
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 3,
      this.sort?.active ?? 'seqNo')
      .pipe(
        tap(lessons => this.lessons = lessons),
        catchError(err => {// se ho un errore avviso l'utente
          console.log('Error loading lessons', err);
          alert('Error loading lessons.');
          return throwError(err);// e creo un altro obervable che emette la notifica dell'err
        }),
        finalize(() => this.loading = false)
      ).subscribe();
  }

  onToggleLesson(lesson: Lesson) {
    if (lesson == this.expandedLesson) {
      this.expandedLesson = null;
    } else {
      this.expandedLesson = lesson;
    }
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();


  }

}
