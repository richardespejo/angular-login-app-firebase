import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();;
  titulo: string = "Crear Nueva Cuenta";

  constructor(  private _authService : AuthService,
                private router: Router ) { }

  ngOnInit(): void {

  }

  onSubmit( form: NgForm ){
    if(!form.valid){  return; }
    
    //swett alert
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon:'info'
    });
    //swett alert loading
    Swal.showLoading();

    this._authService.nuevoUsuario( this.usuario )
      .subscribe( response => {
        console.log(response);
        Swal.close();
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
