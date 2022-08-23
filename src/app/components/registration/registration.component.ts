import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {

  subscription = new Subscription();
  registerForm!: FormGroup;
  submitted = false;
 
  constructor(private formBuilder: FormBuilder, protected userService: UserService, protected route: Router) {}
 
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addressGroup: this.formBuilder.array([])
    });
    this.addAddress();
  }

  get addressGroup() {
    return this.registerForm.controls["addressGroup"] as FormArray;
  }

  addAddress() {
    const addressForm = this.formBuilder.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required]
    });
    this.addressGroup.push(addressForm);
    this.registerForm.updateValueAndValidity();
  }

  deleteAddress(addressIndex: number) {
    this.addressGroup.removeAt(addressIndex);
  }
 
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const obj = {
        userName: this.registerForm.controls.userName.value,
        email: this.registerForm.controls.email.value,
        addressGroup: JSON.parse(JSON.stringify(this.registerForm.controls.addressGroup.value))
      };
      this.subscription.add(
        this.userService.addUsers(obj).subscribe((data) => {
          if(data) {
            this.route.navigate(['user-details']);
          }
        }, (error: any) => {
          console.log(error.error)
        })
      )
    }
  }

  checkErrors(obj: any, index: number, field: string, errorType: string = '') : boolean {
    if(errorType === 'required') {
      return (obj.controls[index].controls[field].errors.required)
    } return (obj.controls[index].controls[field].errors) 
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

}
