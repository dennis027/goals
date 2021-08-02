import { QuoteRequestService } from './../quote-http/quote-request.service';
import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import {AlertService } from '../alert-service/alert.service';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../quote-class/quote';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
 
  goals!: Goal[];
  alertService!:AlertService;
  quote!:Quote;


  toggleDetails(index:  number){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }
  deleteGoal(isComplete: any, index: number){
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

      if (toDelete){
        this.goals.splice(index,1)
        this.alertService.alertMe("This goal has been deleted")
      }
    }
  }
  addNewGoal(goal: any){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.CompleteDate = new Date (goal.CompleteDate)
    this.goals.push(goal);
  }
  
  constructor(goalService:GoalService, alertService:AlertService, private quoteService:QuoteRequestService) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;

  }
  

  ngOnInit(){
    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
  }

}
