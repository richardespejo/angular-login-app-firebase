import { leadingComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme: boolean = false;

  constructor(  private _authService : AuthService,
                private router: Router) { }

  ngOnInit(): void {
    if( localStorage.getItem('email') ){
        this.usuario.email = localStorage.getItem('email');
        this.recordarme = true;
    }
  
  }

  login( form: NgForm ){
    if(!form.valid) { return ;}
    //swett alert
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon:'info'
    });
    //swett alert loading
    Swal.showLoading();

    this._authService.login( this.usuario )
      .subscribe( (respond) => {
        console.log(respond);
        Swal.close(); 

        if( this.recordarme ){
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('home');
                
      }, (err)=> {
        Swal.fire({
          icon:'error',
          title:'Error al autenticas',
          text: err.error.error.message
        });
        console.log(err.error.error.message);
      });
  }

}
