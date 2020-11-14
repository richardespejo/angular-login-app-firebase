import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiKey = "AIzaSyCZUzmnaottbXahekyhaD6uRqkr6tArdA0";
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  //private register =  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]";
  //private login =     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]";
  usuarioToken : string ;

  constructor( private http : HttpClient) { 
    this.getToken();
  }

  //login o ingreso al sisteMA
  login( usuarios : UsuarioModel){
    const authData = {
      email: usuarios.email,
      password: usuarios.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}` , authData )
              .pipe( 
                map( resp => { 
                  this.guardarToken( resp['idToken'] ); 
                  return resp;
                }));

  }

  logout(){
    localStorage.removeItem('token');
  }

  //registro un nuevo usuario
  nuevoUsuario( usuarios : UsuarioModel){
    const authData = {
      email: usuarios.email,
      password: usuarios.password,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}signUp?key=${this.apiKey}` , authData )
              .pipe( 
                map( resp => { 
                  this.guardarToken( resp['idToken'] ); 
                  return resp;
                }));
  }


  private guardarToken( idToken:string){
    this.usuarioToken = idToken;
    localStorage.setItem('token',idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expire' , hoy.getTime().toString() );
  }

  //obentgo el token
  getToken(){
    if( localStorage.getItem('token') ){
      this.usuarioToken = localStorage.getItem('token');
    }else{
      this.usuarioToken = '';
    }
    return this.usuarioToken;
  }

  //validando el token que usado por el guard
  autenticado(): boolean {
    if( this.usuarioToken.length < 2 ){
      return false;
    }

    const expire = Number(localStorage.getItem('expire'));
    const expireDate = new Date();
    expireDate.setTime(expire);

    if( expireDate > new Date() ){
      return true;
    }else{
      return false;
    }
  }

}
