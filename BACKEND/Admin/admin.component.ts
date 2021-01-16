import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Train } from '../trains';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  index = ["number", "name", "from", "to", "distance", "fare", "arrival", "departure"]
  closeResult: string;
  private Trainlist: Train[] = [];
  private deleteNumber: Number;
  editForm: FormGroup;

  trainsData = {
    number: '',
    name: '',
    from: '',
    to: '',
    distance: '',
    fare: '',
    arrival: '',
    departure: ''
  }

  train: Train[] = [];
  //<button (click)="loadAPIData()" class="btn btn-secondary ml-2" type="button">Load API Data</button>

  constructor(private _adminService: AdminService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private http: HttpClient,
    private _router: Router) { }



  ngOnInit(): void {
    this.getAll()
    this.editForm = this.fb.group({
      number: [''],
      name: [''],
      from: [''],
      to: [''],
      distance: [''],
      fare: [''],
      arrival: [''],
      departure: ['']
    });

    this._adminService.getTrains()
      .subscribe(
        res => {console.log(res)
          this.train = res},
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

  postData() {
    console.log(this.trainsData);
    this._adminService.postTrains(this.trainsData)
      .subscribe(
        res => {
          console.log('Success', res)
          this.ngOnInit();
        },
        err => console.log(err)
      )
    this.modalService.dismissAll(); //dismiss the modal
  }

  getAll() {
    this._adminService.getTrains()
      .subscribe(
        res => {
          console.log(res)
          this.train = res
        },
        err => console.log(err)
      )
  }

  onUpdate() {
    //const editURL = 'http://localhost:4000/api/trains/'+this.editForm.value.number;
    console.log(this.editForm.value);
    this.http.put('http://localhost:4000/api/trains/' + this.editForm.value.number, this.editForm.value)
      .subscribe(
        res => {
          this.ngOnInit();
          this.modalService.dismissAll();
        },
        err => {
          console.log(err)
        });
  }

  onDelete() {
    //const deleteURL = 'http://localhost:4000/api/trains/'+this.editForm.value.number;
    console.log(this.editForm.value)
    this.http.delete('http://localhost:4000/api/trains/' + this.editForm.value.number)

      .subscribe(
        res => {
          this.ngOnInit();
          this.modalService.dismissAll();
        },
        err => {
          console.log(err)
        });
  }

  
  // onDelete() {
  //   //const deleteURL = 'http://localhost:4000/api/trains/'+this.editForm.value.number;
  //   console.log(this.editForm.value.number)
  //   this._adminService.deleteTrain(this.editForm.value.number)
  //     .subscribe(
  //       res => {
  //         this.ngOnInit();
  //         this.modalService.dismissAll();
  //       },
  //       err => {
  //         console.log(err)
  //       });
  // }


  // onDelete() {
  //   const deleteURL = 'http://localhost:4000/api/trains/' + this.deleteNumber;
  //   console.log(this.deleteNumber);
  //   this.http.delete(deleteURL)
  //     .subscribe((results) => {
  //       this.ngOnInit();
  //       this.modalService.dismissAll();
  //     });
  // }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openEdit(targetModal) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.setValue({
      number: this.editForm.value.number,
      name: this.editForm.value.name,
      from: this.editForm.value.from,
      to: this.editForm.value.to,
      distance: this.editForm.value.distance,
      fare: this.editForm.value.fare
    });
    console.log(this.editForm.value)

  }

  openDelete(targetModal, train: Train) {
    this.deleteNumber = train.number;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

}

//openEdit(contentEdit, train)