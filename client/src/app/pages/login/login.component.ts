import {Component,OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [UserService]
})
export class Login implements OnInit{

  public user: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister: string;
  public url: string;

  constructor(private _userService:UserService,private router:Router
    ) {

    this.user = new User('', '', '', '', '', 'Administrador', '', '', '');
  }
  ngOnInit() {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();

    console.log(this.identity);
    console.log(this.token)
  }
public onSubmit() {
  // Conseguir los datos del usuarios identificado
  this._userService.signup(this.user).subscribe(
    response => {

          let identity =response.user;
          this.identity=identity;

          if(!this.identity._id){
            alert("usuario no esta correctamente identificado");
          }
          else{
            localStorage.setItem('identity',JSON.stringify(identity));

            this._userService.signup(this.user,'true').subscribe(
              response => {

                    let token =response.token;
                    this.token=token;

                    if(this.token.length <= 0){
                      alert("el token no se genero ");
                    }
                    else{
                      this.router.navigate(['pages/dashboard']);
                        localStorage.setItem('token',token);
                        console.log(token);
                        console.log(identity);

                    }

              },
              error => {
                  var errorMessage = <any>error;
                  if(errorMessage != null){
                    var body=JSON.parse(error._body);
                    this.errorMessage = body.message;
                    console.log(error);
                  }
              }
            );
          }

    },
    error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body=JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
    }
  );
}
}
