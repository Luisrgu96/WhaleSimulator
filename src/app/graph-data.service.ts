import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GraphDataService {

  constructor() { }

  @Output() sendGraphData: EventEmitter<any>= new EventEmitter();




}
