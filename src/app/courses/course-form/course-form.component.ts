import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location){
    this.form = this.formBuilder.group({
      name:[null],
      category:[null]
    });
  }

  onSubmit(){
    //console.log(this.form.value);
    this.service.save(this.form.value).subscribe({
      next: (v) => this.onSuccess(),
      error:(e) => this.onError(),
      complete: () => console.info('complete')
    });
  }

  onCancel(){
    this.location.back();
  }
  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso!','', { duration:3000 });
    this.onCancel();
  }
  private onError(){
    this.snackBar.open('Erro ao salvar curso.','', { duration:3000 });
  }
}
