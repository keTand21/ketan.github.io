import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isEmpty, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
const serverAPI = environment.serverAPI;

@Injectable({
  providedIn: 'root'
})

export class HttpCommonService {

  constructor(private http: HttpClient) { }

  get(endpoint, params) {

    if (Object.keys(params).length) {
      return this.http.get(`${serverAPI}/${endpoint}/${params}`);

    } else {
      return this.http.get(`${serverAPI}/${endpoint}`);

    }
  }

  post(endpoint, params): Observable<any> {
    return this.http.post(`${serverAPI}/${endpoint}`, params).pipe(
      map(response => {
        console.log("response['headers']", response);

        return response;
      })
    );
  }

  put(endpoint, params) {
    return this.http.put(`${serverAPI}/${endpoint}`, params);
  }

  delete(endpoint, params) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: params,
    };
    return this.http.delete(`${serverAPI}/${endpoint}`, options);
  }

}
