import { Component, OnInit, NgZone } from '@angular/core';
import { TicketService } from '../ticket.service';
import { TrainsService } from '../trains.service';
import { Find } from '../find';
import { Train } from '../trains';
import { Search } from './search';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tickets } from '../tickets';
import { NgForm } from '@angular/forms';
import { ICustomWindow, WindowRefService } from '../window-ref.service';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  index = ["trainNum", "name", "from", "to", "distance", "fare", "arrival", "departure"];
  train: Train[] = [];
  closeResult: string;
  userdata = new Find('', '', "", 'General');
  userModel: any = {};
  selectedsearchModel = new Search('')
  //selectedsearchModel: any
  tickets: Tickets[] = [];
  trainResult: any = {};
  private _window: ICustomWindow;
  totalfare: Number = 0;
  rzp: any
  disableDisplay: Boolean = true;
  disableDisplays: Boolean = true;


  public trains = [];

  // train: Train[] = [];


  constructor(private _trainService: TrainsService,
    private modalService: NgbModal,
    private _http: HttpClient,
    private zone: NgZone,
    private TicketService: TicketService,
    private winRef: WindowRefService
  ) {
    this._window = this.winRef.nativeWindow;
  }


  initPay(): void {
    this.totalfare = 100*( this.userModel.noTickets * this.userModel.train.fare);
    console.log(this.totalfare);
    this.payWithRazor()

  }

  payWithRazor() {
    let options: any = {
      key: 'rzp_test_TovpykgPtkf4FS', // add razorpay key here
      name: 'Reservation',
      description: 'Reservation Fee',
      amount: this.totalfare,
      prefill: {
        name: 'navmi',
        email: 'navmi09@gmail.com', // add your email id
      },
      notes: {},
      theme: {
        color: '#3880FF'
      },
      handler: this.paymentHandler.bind(this),
      modal: {
        ondismiss: (() => {
          this.zone.run(() => {
            alert("Failed");
            window.location.reload();
          })
        })


      }
    };

    this.rzp = new this.winRef.nativeWindow['Razorpay'](options);
    this.rzp.open();
  }

  paymentHandler(res: any) {
    this.zone.run(() => {
      console.log("Done")
      const url = 'http://localhost:8000/booking';

      this._http.post(url, this.userModel)
        .subscribe((result) => {
          // this.ngOnInit(); //reload the table
          console.log(result)
          alert(`Your ticket has been confirmed. Please save your PNR for future references.
          // Name: ${result.pname}
          // Age: ${result.age}
          // Gender: ${result.gender}
          // Number of Tickets: ${result.noTickets}
          // PNR: ${result.pnr}`
                      
                      )
         // console.log(result.pnr)
          // this.initPay()
          //alert(result)
        });
    });
  }


  ngOnInit() {
  }

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDate();
  minDate1 = moment({ year: this.year, month: this.month, day: this.day }).format('YYYY-MM-DD');
  // minDate2 = moment({year: this.year, month: this.month, day: this.day+1}).format('YYYY-MM-DD');

  findTrain() {
    this.disableDisplays= false;
    this._trainService.searchTrain(this.userdata.from, this.userdata.to)
      .subscribe(
        res => {
          console.log(res)
          this.train = res
          //  console.log(this.train)
          // this.trainResult=res;
          console.log(this.train[0].fare);
          //console.log(this.trainResult[0].fare)
        },
        err => {
          console.log(err);
          alert('No Trains found');
        }
      )
  }

  assign(data) {
    //console.log(data)
    this.trainResult = data
    console.log(this.trainResult)
  }


  onSubmit() {
    this.userModel.train = this.trainResult
    this.initPay()
    // const url = 'http://localhost:8000/booking';

    // this._http.post(url, this.userModel)
    //   .subscribe((result) => {
    //    // this.ngOnInit(); //reload the table
    //     console.log(result)
    //     console.log(result.pnr)
    //     this.initPay()
    //     //alert(result)
    //   });
    this.modalService.dismissAll(); //dismiss the modal
  }

  findTicket(){
    this.disableDisplay= false;
    console.log(this.selectedsearchModel.pnr);
    this._http.get<any>('http://localhost:8000/booking/' + this.selectedsearchModel.pnr).subscribe(
      response => {
        console.log(response);
        this.tickets = response;
      },
      err => {
        console.log(err);
        alert('N0 booking found')
      }
    );
  }


  onDelete() {
    this.TicketService.deleteTicket(this.selectedsearchModel.pnr)
      .subscribe(
        res => {
          alert(`Ticket with PNR number ${this.selectedsearchModel.pnr} was cancelled`)
        }
      )
  }



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

  // onSubmit(f) {
  //   const url = 'http://localhost:8888/friends/addnew';
  //   this._http.post(url, f.value)
  //     .subscribe((result) => {

  //     });
  //   this.modalService.dismissAll(); //dismiss the modal
  // }



  // paymentHandler(res: any) {
  //   this.zone.run(() => {
  //     // add API call here
  //   });
  // }


  //   open(targetModal, ticket: Tickets) {
  //     this.modalService.open(targetModal, {
  //      centered: true,
  //      backdrop: 'static',
  //      size: 'lg'
  //    });
  //     document.getElementById('trainName').setAttribute('value', ticket.trainName);
  //     document.getElementById('trainNumber').setAttribute('value', ticket.trainNumber);
  //     document.getElementById('source').setAttribute('value', ticket.source);
  //     document.getElementById('destination').setAttribute('value', ticket.destination);
  //     document.getElementById('fare').setAttribute('value', ticket.fare);
  //  }

}
