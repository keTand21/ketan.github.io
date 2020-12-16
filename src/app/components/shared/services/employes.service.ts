import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subscriber } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { HttpCommonService } from '../services/http-common.service';
import { Constants } from 'src/app/components/shared/services/global.service';
import { ResponseModel } from 'src/app/modals/response.model';


@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  public observer: Subscriber<{}>;

  constructor(
    private httpCommonService: HttpCommonService,
  ) { }

  getEmployes(objParams) {
    return this.httpCommonService.get('users',objParams);
  }

  deleteEmployee(objParams) {
    return this.httpCommonService.delete('users/id', objParams);
  }

  getDealsEmployee(objParams: object) {
    return this.httpCommonService.get('users', objParams);
  }


  addNewEmployee(objParams: any) {
    return this.httpCommonService.post('users', objParams);
  }

  updateEmployee(objParams: any) {
    return this.httpCommonService.put('users/id', objParams);
  }
 
}
