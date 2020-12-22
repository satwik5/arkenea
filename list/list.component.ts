import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private _actRoute: ActivatedRoute, private _router: Router, private _authUser: ServicesService,private _formbuilder: FormBuilder) { }
  imageUrl: string = "./assets/images/arkenea.JPG";
  users=[];
  signUpForm: FormGroup;
  editUser:boolean=false;
  onConfirmClick:boolean=false;
  errorMessage:string='';
  userid;
  ngOnInit(): void {
    this.getUser();
    this.signUpForm = this._formbuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }
  get fullnamefromform() {
    return this.signUpForm.get('fullname');
  }
  get emailfromform() {
    return this.signUpForm.get('email');
  }
  get mobilefromform() {
    return this.signUpForm.get('mobile');
  }
  get cityfromform() {
    return this.signUpForm.get('city');
  }

  getUser(){
    this._authUser.getCredentials()
      .subscribe(
        (res) => { console.log(res)
          if (res) {
            this.users = res;
          }
        },
        (err) => {
          console.log(err)
        }
      )
  }
  onLogout() {
    localStorage.clear();
    this._authUser.onLogout()
      .subscribe(
        (res) => { //console.log(res)
          if (res) {
            this._router.navigate(['/login']);
          }
        },
        (err) => {
          console.log(err)
        }
      )
  }
  onDelete(id) {
    if (confirm('Are you sure to delete ?')) {
      this._authUser.deleteUser(id)
        .subscribe(
          (res) => { //console.log(res)
            if (res) {
              this.getUser()
            }
          },
          (err) => {
            console.log(err)
          }
        )
    }
  }
  onEdit(form){
    this.userid=form._id;
    console.log(form)
    this.editUser=true;
    
    this.signUpForm.patchValue({
      fullname: form.fullname,
      city:form.city,
      email: form.email,
      mobile: form.mobile
    });
  }
  onConfirm(){
    this.onConfirmClick=true;
    this.errorMessage='';
    console.log(this.signUpForm.valid)
    if(this.signUpForm.invalid){
      this.errorMessage='Please provie all mandatory fields';
      return ;
    }
    this._authUser.editUser(this.signUpForm.value, this.userid)
    .subscribe(
      (res) => { //console.log(res)
        if (res) {
          this.editUser=false;
          this.onConfirmClick=false;
          this.getUser()
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }
  profile(id){
    this._router.navigate(['/dashboard']);
  }
}
