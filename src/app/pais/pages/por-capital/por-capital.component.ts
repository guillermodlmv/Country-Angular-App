import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {
  paisesSugeridos   : Country[] = []
  mostrarSugerencias: boolean = false; 
  termino : string = '';
  hayError: boolean = false;
  paises  : Country[] = []

  constructor( private paisService: PaisService) { }

  buscar( termino: string ){
    this.mostrarSugerencias = false;
    this.hayError= false;
    this.termino = termino;

    this.paisService.buscarPorCapital( termino )
    .subscribe({
      next: paises =>{
        this.paises = paises;
      },
      error: err => {
        this.hayError = true;
        this.paises = []
        console.info(err)
      }
    })
    
    
  }
  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino 
    this.mostrarSugerencias = true;
    this.paisService.buscarPorCapital(termino)
      .subscribe( paises => {
        this.paisesSugeridos = paises.slice(0,5)
      })
  }
  buscarSugeridos( termino: string ){
    this.buscar( termino )
  
  }
}
