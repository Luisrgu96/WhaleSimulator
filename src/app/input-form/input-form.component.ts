import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { MatFormField } from '@angular/material/form-field';
import { GraphDataService } from '../graph-data.service';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})



export class InputFormComponent implements OnInit {

  constructor(private serviciograph: GraphDataService) { }

  ngOnInit(): void {
    
  }

  lopo ?: string;
  whaleNumber ?: number;
  nat ?: number;
  mort ?: number;
  nYears ?: number;
  sResult ?: number;
  sResultArr ?: number[];



  onClick(): void {

    if (this.nYears&&this.nat&&this.mort&&this.nYears&&this.whaleNumber) {

      let tempArr: number[];
      tempArr = [];
      tempArr.push(this.whaleNumber)

      let tempWhaleNumber = this.whaleNumber;
      for (let i = 0; i < this.nYears; i++) {        
        let nacimientos: number;
        let muertes: number;

        nacimientos = this.nat/1000 * tempWhaleNumber;
        muertes = this.mort/1000 * tempWhaleNumber;

        nacimientos =  Math.round(nacimientos)
        muertes =  Math.round(muertes)
        tempWhaleNumber = tempWhaleNumber + nacimientos - muertes
        
        if (tempWhaleNumber < 0) { tempWhaleNumber = 0} 
        
        tempArr?.push(tempWhaleNumber)
      }
      this.sResult = tempWhaleNumber
      this.sResultArr = tempArr

      this.serviciograph.sendGraphData.emit(this.sResultArr)
    }

  }

}
