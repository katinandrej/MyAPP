import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import { DashboardService } from '../services/dashboard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  list: Dashboard[] = []
  events: CalendarEvent[]
  refresh: Subject<any> = new Subject();

  constructor(private router: Router, private dashboardService: DashboardService, private adminService: AdminService) { }

  ngOnInit() {
    this.dashboardService.getEvents().subscribe(dashboard => {
      this.list = dashboard;
      this.events = []
      var i = 0;
      for (i = 0; i < this.list.length; i++) {
        this.addEvent(new Date(this.list[i].ABSENCE_START), new Date(this.list[i].ABSENCE_END), this.list[i].REASON, this.list[i].USERNAME_ACC, this.list[i].ABSENCE_ID)
      }
      //console.log(this.events)  
      //console.log(this.list);
    });
  }

  addEvent(start, end, reason, user, id): void {
    this.events.push({
      start: start,
      end: end,
      meta: id,
      cssClass: user,
      title: reason,
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false
      }
    });
    this.refresh.next();
  }

  deleteEvent(id) {
    this.adminService.deleteEvent(id).subscribe(data => {
      if (data.suc) {
        this.router.navigateByUrl("/dashboard")
        alert("Successfully deleted!")
      } else {
        alert("Error with deleting!")
    }
    })
  }

  updateEvent(id, event) {
    this.adminService.updateEvent(id, event).subscribe(data => {
      if (data.suc) {
        this.router.navigateByUrl("/dashboard")
        alert("Successfully updated!")
      } else {
        alert("Error with updating!")
    }
    })
  }
}
