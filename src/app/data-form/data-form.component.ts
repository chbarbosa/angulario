import { EstadoBr } from './../shared/models/estado-br.model';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { DropdownService } from './../shared/services/dropdown/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private dropdownService: DropdownService
  ) { }

  ngOnInit() {

    this.dropdownService.getEstadoBr().subscribe(dados => {
      this.estados = dados;
      console.log(dados);
    });

    // this.formulario = new FormGroup({ 
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // });
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]]
      })
    });
  }

  consutaCEP() {
    let cep = this.formulario.get('endereco.cep').value;
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetaDadosForm();

        var consulta = `//viacep.com.br/ws/${cep}/json`;
        this.http.get(consulta)
          .map(dados => dados.json())
          .subscribe(dados => this.populaDadosForm(dados))
          ;
      }
    }
  }

  populaDadosForm(dados) {
    this.formulario.patchValue({
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
  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  onSubmit() {
    console.log(this.formulario.value);
    //console.log(this.usuario);

    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .map(res => res)
        .subscribe(x => {
          console.log(x)
          //reset form

          this.resetar();
        },
        (error: any) => alert('erro'));
    } else {
      console.log('Formulário inválido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup){
      Object.keys(formGroup.controls).forEach(campo => {
        const controle = formGroup.get(campo);
        controle.markAsTouched();
        if (controle instanceof FormGroup) {
          this.verificaValidacoesForm(controle);
        }
      });
  }

  resetar() {
    this.formulario.reset();
  }

  verifica(campo: string) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  verificaEmailInvalido(){
    console.log(this.formulario.get('email'));
    if (this.formulario.get('email').errors) {
      return this.formulario.get('email').errors['email'] && (this.formulario.get('email').touched || this.formulario.get('email').dirty);
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verifica(campo),
      'has-feedback': this.verifica(campo)
    }
  }

}
