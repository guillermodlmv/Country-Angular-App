import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right:5px;
      }
    `

  ]
})
export class PorRegionComponent {
  regiones: string[] = [ 'africa', 'americas', 'asia', 'europe', 'oceania']
  regionActiva:string=''
  paises: Country[] = []
  constructor( private paisService: PaisService ) { }

  getClaseCss( region:string){
    return (
      (region === this.regionActiva) ? 
        "btn btn-outline-primary" : 
        "btn btn-primary"
    )
  }

  activarRegion (region:string){
    if(region === this.regionActiva){return}
    this.regionActiva = region
    this.paisService.obtenerPaisPorRegion( region )
    .subscribe({
      next: paises =>{
        this.paises = paises;
        console.log(paises)
      },
      error: err => {
        this.paises = []
        console.info(err)
      }
    })
  }

}
