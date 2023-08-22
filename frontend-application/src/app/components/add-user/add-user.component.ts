import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent {
  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
  });

  submitted = false;

  formSuccess = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstname: ['', [Validators.required, Validators.maxLength(100)]],
        lastname: ['', [Validators.required, Validators.maxLength(100)]],
        email: ['', [Validators.required]],
      }
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    this.saveUserData(this.form.value);
  }

  saveUserData(formData: any): void {
    this.userService.create(formData)
      .subscribe({
        next: (res) => {
          this.formSuccess = true;
        },
        error: (e) => console.error(e)
      });
  }

  newUserData(): void {
    this.formSuccess = false;
    this.onReset();
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}