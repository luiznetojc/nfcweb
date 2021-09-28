import { Component, OnInit } from '@angular/core';
import { RequestCadastro } from '../modelos/request-cadastro';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  requestCadastro = {} as RequestCadastro;
  constructor(private cadastroSvc: CadastroService) { }
  public not = true;
  public cadastrado = true;
  ngOnInit(): void {
  }
  send(): void {
    this.cadastroSvc.send(this.requestCadastro).subscribe(accept => (console.log(accept),
      this.not = false,
      this.cadastrado = false,
      this.cleanForm()),
      error => (console.error(error),
        this.cadastrado = true,
        this.not = false));
  }
  cleanForm() {
    this.requestCadastro.cpf = "";
    this.requestCadastro.email = "";
    this.requestCadastro.nome = "";
    this.requestCadastro.senha = "";
    this.requestCadastro.telefone = "";
  }

}
