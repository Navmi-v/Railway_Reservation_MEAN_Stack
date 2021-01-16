import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {AdminService} from '../admin.service';
declare var M:any;
import {Router} from '@angular/router';

import {Admin} from '../admin.model';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[AdminService]
})
export class AdminComponent implements OnInit {

  private isEdit=false;

  constructor(public adminService:AdminService, private route:Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshAdminList();
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.adminService.selectedAdmin={
        // _id: "",
        trainNum: 0,
        name:"",
        from:"",
        to:"",
        distance:0,
        departure:'',
        arrival:'',
        fare:0,
      }
    }
  }

  onSubmit(form: NgForm){
    if(!this.isEdit){
    this.adminService.postAdmin(form.value).subscribe((res)=>{
        console.log("testing");
        this.resetForm(form);
        this.refreshAdminList();
        console.log(res)
        // M.toast({html:"Saved successfully",classes:"rounded"});

      },(err)=>{
        console.log(err);
      });
    }
    else{
      this.adminService.putAdmin(form.value).subscribe((res)=>{
          this.resetForm(form);
          this.refreshAdminList();
          this.isEdit=false;
          console.log(res)
          // M.toast({html:"Updated successfully",classes:"rounded"});
        },(err)=>{
          console.log(err);
        });
    }
  }

  refreshAdminList(){
    this.adminService.getAdminList().subscribe((res)=>{
      this.adminService.admins=res as Admin[];
    })
  }

  onEdit(ad:Admin){
    this.isEdit=true;
    this.adminService.selectedAdmin=ad;
  }

  onDelete(trainNum:number,form:NgForm){
    console.log(this.adminService.selectedAdmin.trainNum)
    console.log(trainNum)
    if(confirm('Are you sure want to delete the train?')==true){
      this.adminService.deleteAdmin(trainNum).subscribe((res)=>{
        this.refreshAdminList();
        this.resetForm(form);
        console.log(res)
        // M.toast({html:"Deleted successfully",classes:"rounded"});
      })
    }
  }


}
