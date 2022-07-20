import { EmployeeService } from './../service/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from '../model/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeeForm!:FormGroup;
  showModal:boolean = false;
  editMode:boolean = false;

  employees:IEmployee[] = [];
  selectedEmployee!: IEmployee;

  constructor(private empSrv : EmployeeService,private fb : FormBuilder) { }

  ngOnInit(): void {
    this.bindingEmployeeForm();
    this.getAllEmployee();
  }
 get empForm(){
  return this.employeeForm?.controls;
 }
  bindingEmployeeForm(){
    this.employeeForm = this.fb.group({
      _id:[''],
      name:['',[Validators.required,Validators.minLength(3)]],
      position:['',Validators.required],
      dept:['',Validators.required]
    })
  }

  getAllEmployee(){
    this.empSrv.getAll().subscribe((res)=>{
      this.employees = res as IEmployee[];
      console.log(res);
    })
  }

  onEmpSubmit(){
    if(this.employeeForm.valid){
      if(this.editMode){
        this.empSrv.updateEmployee(this.employeeForm.value).subscribe(
          (res)=>{
            console.log('Employee Successfully updated');
            this.getAllEmployee();
            this.onCloseModal();
          },
          (error)=>{
            console.log(error);
          }
        );
      }
      else{
        this.empSrv.save(this.employeeForm.value).subscribe(
          (res)=>{
          console.log('Employee Save Successfully',res);
          this.getAllEmployee();
         },
         (error)=>{
          console.log('Error Occured',error);
         }
         );
         this.onCloseModal();
      }
     
    }
   
  }
  onEditEmployee(emp:IEmployee){
    this.showModal = true;
    this.editMode = true;
    this.selectedEmployee = emp;
    this.employeeForm.patchValue(this.selectedEmployee);
    // this.empSrv.updateEmployee(emp).subscribe(
    //   (res)=>{
    //     console.log('Employee Successfully updated');
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // );
  }
  onDeleteEmployee(id:string){
    if(confirm('Do you want to delete this Employee')){
      this.empSrv.deleteEmployee(id).subscribe(
        (res)=>{
        console.log('Employee Delete Successfully!');
        this.getAllEmployee();
      },
      (error)=>{
        console.log('Error',error);
      });
    }
  }
  onAddEmployee(){
    this.showModal = true;
  }

  onCloseModal(){
    this.showModal = false;
    this.editMode = false;
    this.employeeForm.reset();
  }



}
