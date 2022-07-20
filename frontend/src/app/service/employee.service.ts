import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl ='http://localhost:3000/employees'

  constructor(private http : HttpClient) {}

  getAll(){
    return this.http.get(this.apiUrl);
  }

  getById(){
    return this.http.get(this.apiUrl);
  }

  save(emp:IEmployee)
  {
    return this.http.post(this.apiUrl,emp);
  }

  updateEmployee(emp:IEmployee){
    return this.http.put(`${this.apiUrl}/${emp._id}`,emp);
  }

  deleteEmployee(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
