import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styles: [
    `
      li {
        cursor:pointer
      }
    `
  ]
})
export class SugerenciasComponent    {
  
  paisesSugeridos   : Country[] = []
  paises            : Country[] = []
  hayError          : boolean = false;

  
  @Input() termino : string = ''
  @Input() mostrarSugerencias : boolean = false
  debouncer: Subject<string> = new Subject();


  constructor(  private paisService: PaisService ) { }
  
  buscar( termino: string ){
    console.log(termino)
    this.hayError= false;
    this.termino = termino;

    this.paisService.buscarPais( termino )
    .subscribe({
      next: paises =>{
        this.paises = paises;
        console.log(paises)
      },
      error: err => {
        this.hayError = true;
        this.paises = []
        console.info(err)
      }
    })

    
  }

  buscarSugeridos( termino: string ){
    this.buscar( termino )
  }

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino 
    console.log(termino)
    this.paisService.buscarPais( termino )
      .subscribe( paises => {
        this.paisesSugeridos = paises.slice(0,5)
      })
}
}
