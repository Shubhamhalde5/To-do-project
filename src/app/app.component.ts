import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Admin} from './admin';
import{Student} from './student';
import{Course} from './course';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AutoplantProject';


  isLoggedIn:number=0;
username:string;
password:string;
student:Student;
admin:Admin;
courses:Course[];

    constructor(private http:HttpClient)
    {

    }
   url="http://localhost:8080/"
    //url="http://localhost:8181/auto/";
    // url="http://54.219.184.183:8181/auto/";
    registrationnumber:number=0;

    regipage()
    {
      this.isLoggedIn=3;

    }
    login()
    {
      this.http.get(this.url+"login"+this.username+"/"+this.password).subscribe(
        (data:any)=>
        {
          if(data==0)   
            window.alert("No User");
          else if(data==-1)
            window.alert("something is wrong");

            else if(data==4||data==5)
            window.alert("username wrong");
          else if(data==1)
          {
            this.http.get(this.url+"getStudent"+this.username+"/"+this.password).subscribe(
        (data:any)=>{
          if(data!=null){
          this.isLoggedIn=1;
          this.student=data;
           for(let i=0; i<this.student.courses.length; i++)
              {
                  this.student.courses[i].status="Applied";
                  if(this.courses[i].id==this.student.courses[i].id)
                {
                  this.courses[i].status="Applied";
                }

              }
            }
            else
            window.alert("wrong password");
          }
         )
         this.http.get(this.url+"getCourses").subscribe(
        (data:any)=>{
          this.courses=data;
          }
         )

        }
          else if(data==2)
          {
             this.http.get(this.url+"getAdmin"+this.username+"/"+this.password).subscribe(
        (data:any)=>{
          this.isLoggedIn=2;
          this.admin=data;
          }
       )
        }
      }
      )
    }
    logout()
    {
      this.isLoggedIn=0;
      this.username="";
      this.password="";
     }
    cDetails:String;
    cDuration:number;
    add()
    {
      this.http.get(this.url+"add"+this.username+"/"+this.cDetails+"/"+this.cDuration).subscribe(
        (data:any)=>{
          if(data!=null)
          {
            window.alert("Added Successfully");
            this.admin=data;
            this.cDetails="";
            this.cDuration=0;
          }
          else
            window.alert("Unable to add course please check for any mistakes");
        }
      )
    } 
    apply(cs:Course){
      this.http.get(this.url+"apply"+this.username+"/"+cs.id).subscribe(
        (data:any)=>{
          if(data!=null)
          {
              window.alert("Applied successfully");
              this.student=data;
               for(let i=0; i<this.student.courses.length; i++)
              {
                  this.student.courses[i].status="Applied";
              }
              for(let i=0; i<this.courses.length; i++)
              {
                if(this.courses[i].id==cs.id)
                {
                  this.courses[i].status="Applied";
                }
              }
          }
          else
          {
            window.alert("something is wrong");
          }
        }
      )
   }
   appliedCourses:number=0;
   getAppliedCourses(){
    this.appliedCourses=1;
   }
   hide()
   {
    this.appliedCourses=0;
   }
    delete(id:number)
    {
      this.http.get(this.url+"delete"+this.username+"/"+id).subscribe(
        (data:any)=>{
          if(data!=null)
          {
            window.alert("Deleted Successfully");
            this.admin=data;
          }
          else
            window.alert("could not delete");
        }
      )
    }
    name:String;
    nusername:string;
    npassword:String;
    register(){
      this.http.get(this.url+"register"+this.name+"/"+this.nusername+"/"+this.npassword).subscribe(
        (data:any)=>{
          if(data)
          {
            window.alert("Registered successfully please login");
            this.name=""
            this.nusername=""
            this.npassword=""
          }

          else
          window.alert("User already present please try another user name");
        }
      )
    }
}