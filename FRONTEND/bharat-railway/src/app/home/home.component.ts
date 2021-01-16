import { Component, OnInit } from '@angular/core';
import { TrainsService } from '../trains.service';
import { Find } from '../find';
import * as moment from 'moment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userdata = new Find('', '', "" , 'General') 

  public trains = [];

  //train: Train[] = [];

  constructor(private _trainService: TrainsService, 
    private _router: Router) { }

  ngOnInit() {
    // this._trainService.getTrains()
    // .subscribe(data => this.trains = data);
    // const modalRef = this.modalService.open(HomeComponent);
  }

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDate();
  minDate1 = moment({ year: this.year, month: this.month, day: this.day }).format('YYYY-MM-DD');

  findTrain(){
    this._router.navigate(['/ticket'])
    this._trainService.searchTrain(this.userdata.from, this.userdata.to)
    .subscribe(
      res => {console.log(res)
        //this.train=res
      },
      err => console.log(err)
    )
  }

}
