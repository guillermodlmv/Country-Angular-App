import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  get httpParams(){
    return new HttpParams().set('fields', 'name,capital,cca3,flags,population')
  }
  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor( private http:HttpClient) { }

  buscarPais( termino: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${ termino }/?fields=name,capital,cca3,flags,population`;
    return this.http.get<Country[]>( url, {params : this.httpParams,} )
  }
  buscarPorCapital ( capital: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/capital/${ capital }`;
    return this.http.get<Country[]>( url , {params : this.httpParams} )
  }

  obtenerPaisPorId ( capital: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/alpha/${ capital }`;
    return this.http.get<Country[]>( url )
  }

  obtenerPaisPorRegion ( region: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.http.get<Country[]>( url, {params : this.httpParams,})
    .pipe( tap(
      console.log
      ))
  }


}
