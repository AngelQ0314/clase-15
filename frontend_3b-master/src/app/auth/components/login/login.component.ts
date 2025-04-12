import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authService=inject(AuthService)
  private router = inject(Router)
  
  loginForm=new FormGroup({
    email:new FormControl("", [Validators.email, Validators.required]), 
    password: new FormControl("", Validators.required)   
  })

  funIngresar(){
    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res)=>{
        console.log(res)
        localStorage.setItem("access_token", res.token)
        this.router.navigate(["/admin"])
      },
      (error)=>{
        console.log(error)
      }
    )
    //alert("Ingresando...")
  }

}