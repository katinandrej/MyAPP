import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { DashboardService } from '../services/dashboard.service';
import { Dashboard } from '../models/dashboard';
import { getLocaleDateTimeFormat } from '@angular/common';
import { locale } from 'moment';
import { AbsenceService } from '../services/absence.service';
import { Absence } from '../models/absence';
  
  const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  list: Dashboard[] = []
  start: String
  end: Date = new Date()
  list_a: Absence[] = []
  buttonDisabled: boolean = false;
  USERNAME_ACC: string = "";

  admin: boolean = this.loginService.isAdmin;

    ngOnInit(): void {
      this.loginService.isLogged = true;
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

    constructor(private router: Router, private loginService: LoginService, 
      private dashboardService: DashboardService, private modal: NgbModal, private absenceService: AbsenceService) { }

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view: string = 'month';
  
    viewDate: Date = new Date();
  
    modalData: {
      event: CalendarEvent;
    };
  
    refresh: Subject<any> = new Subject();
  
    events: CalendarEvent[] = [
    ];
  
    activeDayIsOpen: boolean = true;
  
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        this.viewDate = date;
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
      }
      //console.log(this.events)
    }
  
    eventTimesChanged({
      event,
      newStart,
      newEnd
    }: CalendarEventTimesChangedEvent): void {
      event.start = newStart;
      event.end = newEnd;
      this.handleEvent(event);
      this.refresh.next();
    }
  
    handleEvent(event: CalendarEvent): void {
      this.modalData = { event };
      this.modal.open(this.modalContent, { size: 'lg' });

    }

    logout() {
      this.loginService.isLogged = false
      this.router.navigateByUrl("/login")
    }
  
    addEvent(start, end, reason, user, id): void {
      this.events.push({
        start: start,
        end: end,
        meta: id,
        cssClass: user,
        title: 'Korisnik: ' + user + '\n' + '             Razlog odsustva: ' + reason,
        color: colors.yellow,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false
        }
      });
      this.refresh.next();

     
    }

    enableButton() {
        this.buttonDisabled = true;
        this.absenceService.getAbsence().subscribe(absence => {
          this.list_a = absence})
    }

    disableButton() {
      this.buttonDisabled = false;
    }

    takeAbsences() {
      if (this.buttonDisabled) {
        //console.log(this.USERNAME_ACC)
        this.dashboardService.getUserEvents(this.USERNAME_ACC).subscribe(dashboard => {
          this.list = dashboard;
          this.events = []
          var i = 0;
          for (i = 0; i < this.list.length; i++) {
            this.addEvent(new Date(this.list[i].ABSENCE_START), new Date(this.list[i].ABSENCE_END), this.list[i].REASON, this.list[i].USERNAME_ACC, this.list[i].ABSENCE_ID)
          }
          this.refresh.next()
        });
      } else {
        this.dashboardService.getEvents().subscribe(dashboard => {
          this.list = dashboard;
          this.events = []
          var i = 0;
          for (i = 0; i < this.list.length; i++) {
            this.addEvent(new Date(this.list[i].ABSENCE_START), new Date(this.list[i].ABSENCE_END), this.list[i].REASON, this.list[i].USERNAME_ACC, this.list[i].ABSENCE_ID)
          }
        });
      }
    }
}