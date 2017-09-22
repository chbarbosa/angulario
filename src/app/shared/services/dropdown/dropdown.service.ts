import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DropdownService {

  constructor(private http: Http) { }

  getEstadoBr() {
    return this.http.get('assets/dados/estadosbr.json')
      .map((resp: Response) => resp.json());
  }
}