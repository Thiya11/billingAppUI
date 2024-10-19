import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GRAPH_COMMON_TIME_RANGE } from "libs/shared/configs/general-values";
import { CommonService } from "libs/shared/services/common.service";

@Component({
    selector:'lib-pie-graph',
    templateUrl:'./pie-graph.component.html'
})

export class PieGraphComponent implements AfterViewInit {
    @Input() type:string;
    @Input() graphValues:any;
    @Input() selectedCategoryTimeRange = 4;
    timeRangeOptions:any = GRAPH_COMMON_TIME_RANGE;
    graphOptions:any;

    constructor(private commonService:CommonService) {
    }

    ngAfterViewInit(): void {
         setTimeout(()=> {
             this.generateGraphOptions(this.type)
         }, 10)
    }

    onCategoryTimeRangeChange(selectedTime:number) {
        this.commonService.onCategoryTimeRangeChange.next(selectedTime);
    }

    generateGraphOptions(graphType) {
        if(graphType == 'categorySales') {
            this.graphOptions = {
                legend: {
                    top: '15%',
                    orient: 'vertical',
                    left: 'right'
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      restore: { show: true },
                      saveAsImage: { show: true }
                    }
                  },
                  tooltip :{
                    show:true,
                    formatter:(params:any)=>{
                        let tooltipContent = '';
                        tooltipContent += `<div class='d-flex flex-column'>
                                               <label>${params.name}</label><label stype="margin-top:10px;">
                                                   <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>
                                                   <strong> ₹${params.value}</strong>
                                                 </label>
                                             </div>`;
                        return tooltipContent;
                  },
                },
                series: [
                    {
                      name: 'Category Wise Sales',
                      type: 'pie',
                      radius: [50, 150],
                      center: ['40%', '50%'],
                      padAngle:5,
                    //   roseType: 'area',
                      itemStyle: {
                        borderRadius: 8
                      },
                      data: this.graphValues
                    }
                ],
                animation: true,
                animationDuration: 1500,
                animationEasing: 'cubicOut'
            }
        }
    }
}