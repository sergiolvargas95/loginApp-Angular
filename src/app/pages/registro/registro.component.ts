import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit( form: NgForm ) {
    if(form.invalid){ return; }
    this.auth.nuevoUsuario(this.usuario).subscribe( resp => {
      console.log(resp);
      if(this.recordarme) {
        localStorage.setItem('email', this.usuario.email)
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message)
    })
  }
}
