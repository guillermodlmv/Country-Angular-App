import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',

})
export class PorPaisComponent  {
  
  termino           : string = '';
  hayError          : boolean = false;
  paises            : Country[] = []
  paisesSugeridos   : Country[] = []
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService) { }

  buscar( termino: string ){
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino  = termino;

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
  sugerencias( termino: string ){
        this.hayError = false;
        this.termino = termino 
        this.mostrarSugerencias = true;
        this.paisService.buscarPais(termino)
          .subscribe( paises => {
            this.paisesSugeridos = paises.slice(0,5)
          })
  }
  buscarSugeridos( termino: string ){
    this.buscar( termino )

  }
}
