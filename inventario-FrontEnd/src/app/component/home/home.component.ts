import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarioTipo: string[] = ["Administrador", "Empleado"];
  usuarioNuevo = {
    TipoUsuario: '',
    Nombres: '',
    Apellidos: '',
    Email: '',
    FechaNacimiento: '',
    Direccion: '',
    Celular: '',
    Vacunado: '',
    Tipovacuna: '',
    numeroDosis: 0,
    PrimeraDosis: '',
    SegundaDosis: ''
  }
  logUser: any;
  namePattern: any = /^[^0-9]+$/;
  confirmacion: string[] = ["Si", "No"];
  numDosis: number[] = [1, 2];
  tipoVacuna: string[] = ["Sputnik", "AstraZeneca", "Pfizer", " Jhonson&Jhonson"];
  contEmpleados: number = 0;
  emplea: User[] = [];
  employees: User[] = [];

  buttonOptions: any = {
    text: "Register",
    type: "success",
    useSubmitBehavior: true
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    let empl: number = Number(localStorage.getItem("id"))

    console.log("JSON object -", empl);
    this.authService.get(empl).subscribe(res => {
      this.logUser = res as User
      this.emplea.push(res)
    }, error => {

    })

    this.authService.getAll().subscribe(res => {
      this.contEmpleados = res.length + 1
      res.forEach(element => {
        if (element.rol == "Empleado") {
          this.employees.push(element)
        }
      });
    },
      error => {
        console.log("No se pudo cargar empleados")
      });
  }

  onFormSubmit() {
    console.log(this.usuarioNuevo)
    if (this.usuarioNuevo.Vacunado == "Si") {
      if (this.usuarioNuevo.numeroDosis < 1) {
        let user: User = new User(this.contEmpleados,
          this.usuarioNuevo.TipoUsuario, this.usuarioNuevo.Nombres,
          this.usuarioNuevo.Apellidos, this.usuarioNuevo.Email,
          "pass", this.usuarioNuevo.FechaNacimiento,
          this.usuarioNuevo.Direccion, this.usuarioNuevo.Celular,
          this.usuarioNuevo.Vacunado, this.usuarioNuevo.Tipovacuna,
          Number(this.usuarioNuevo.numeroDosis), this.usuarioNuevo.PrimeraDosis,
          "")
        this.guardar(user);
      } else {
        let user: User = new User(this.contEmpleados,
          this.usuarioNuevo.TipoUsuario, this.usuarioNuevo.Nombres,
          this.usuarioNuevo.Apellidos, this.usuarioNuevo.Email,
          "pass", this.usuarioNuevo.FechaNacimiento,
          this.usuarioNuevo.Direccion, this.usuarioNuevo.Celular,
          this.usuarioNuevo.Vacunado, this.usuarioNuevo.Tipovacuna,
          Number(this.usuarioNuevo.numeroDosis), this.usuarioNuevo.PrimeraDosis,
          this.usuarioNuevo.SegundaDosis)
        this.guardar(user);
      }
    } else {
      let user: User = new User(this.contEmpleados,
        this.usuarioNuevo.TipoUsuario, this.usuarioNuevo.Nombres,
        this.usuarioNuevo.Apellidos, this.usuarioNuevo.Email,
        "pass", this.usuarioNuevo.FechaNacimiento,
        this.usuarioNuevo.Direccion, this.usuarioNuevo.Celular,
        this.usuarioNuevo.Vacunado, "Sin vacunarse", 0, "", "")
      this.guardar(user);
    }
  }

  guardar(user: User) {
    this.authService.create(user).subscribe(res => {
      console.log("felicidades")
      window.location.reload()
    },
      error => {
        console.log("No se pudo guardar empleados")
      });
  }

  edicion(e: any) {
    //console.log(e)
  }

  guardado(e: any) {
    console.log(e);

    let user: User = e.changes[0].data
    console.log(user)

    let idActual: number = user.id;
    this.authService.update(idActual, user).subscribe(res => {
      console.log("felicidades")
      window.location.reload()
    },
      error => {
        console.log("No se pudo guardar empleados")
      });
  }


  eliminado(e: any) {
    let idEliminar: number = e.key
    this.authService.delete(idEliminar).subscribe(res => {
      console.log("felicidades")
      window.location.reload()
    },
      error => {
        console.log("No se pudo guardar empleados")
      });
  }


  click() {
    localStorage.removeItem("id")
    this.router.navigate(['/login']);
  }
}
