import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';


const SAMPLE_TEXT = ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam harum quod adipisci? Magni, quaerat voluptatibus, obcaecati libero est voluptate exercitationem ab soluta sed ea inventore fugit sit. Minima quas id amet ratione magnam, praesentium voluptates voluptate quis et quidem repudiandae, esse assumenda tenetur perspiciatis unde magni, rem fuga quo ducimus.'

@Component({
  selector: "create-course-step-1",
  templateUrl: "create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"]
})
export class CreateCourseStep1Component implements OnInit {

  maxTextTitle: number = 60;

  form = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(this.maxTextTitle)
    ]],
    releasedAt: [new Date(1990, 1, 10), Validators.required],
    category: ['BEGINNER', Validators.required],
    courseType: ['premium', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    //downloadsAllowed: [{ value: false, disabled: true }, Validators.requiredTrue],
    longDescription: [SAMPLE_TEXT, [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // this.form.controls['downloadsAllowed']?.disable(); 
    this.form.get('downloadsAllowed')?.disable();
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    const date = cellDate.getDate();// getDate ritorna il gg del mese in local time

    if (view == 'month') {
      return (date == 1) ? "highlight-date" : "";
    }
    return "";
  }

}
