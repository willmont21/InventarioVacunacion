import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = String;
  usuario = User;
  respuesta = ""
  userSet = {
    email: '',
    pass: ''
  }
  noReloadMensaje = ""
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }
  onSubmint() {
    if (this.userSet.email == "" && this.userSet.pass == "") {
      this.noReloadMensaje = "Campos vacios"

    } else {
      this.authService.getAll().subscribe(res => {
        res.forEach(element => {
          if (this.userSet.email == element.email && this.userSet.pass == element.password) {
            console.log(element);
            localStorage.setItem('id', JSON.stringify(element.id))
            this.router.navigate(['/home']);
          }
        });
      },
        error => {
          console.log("Usuario no valido")
        });
     

    }
  }
}
