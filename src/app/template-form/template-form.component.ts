import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  // usuario: any = {
  //   nome: 'Loiane',
  //   email: 'loiane@email.com'
  // }

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form){
    console.log(form);
    //console.log(this.usuario);

    this.http.post('enderecaoServer/formUsuario', JSON.stringify(form.value))
    .map(res => res)
    .subscribe(x => {
      console.log(x);
      form.form.reset();
    })
    ;
  }

  constructor(private http: Http) { }

  ngOnInit() {
  }

  verifica(campo){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo){
    return {
      'has-error': this.verifica(campo),
      'has-feedback': this.verifica(campo)
    }
  }

  consutaCEP(cep, form) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetaDadosForm(form);

        var consulta = `//viacep.com.br/ws/${cep}/json`;
        this.http.get(consulta)
        .map(dados => dados.json())
        .subscribe(dados => this.populaDadosForm(dados, form))
        ;
      }
    }
  }

  populaDadosForm(dados, formulario) {
  //   formulario.setValue({
  //   nome: formulario.value.nome,
  //   email: formulario.value.email,
  //   endereco: {
  //     rua: dados.logradouro,
  //     cep: dados.cep,
  //     numero: '',
  //     complemento: dados.complemento,
  //     bairro: dados.bairro,
  //     cidade: dados.localidade,
  //     estado: dados.uf
  //   }
  // });
  formulario.form.patchValue({    
    endereco: {
      rua: dados.logradouro,
      cep: dados.cep,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    }
  });
}
  resetaDadosForm(formulario) {
  formulario.form.patchValue({    
    endereco: {
      rua: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null
    }
  });
  }
}
