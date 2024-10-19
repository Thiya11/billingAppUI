import { AfterViewInit, Component, Input } from "@angular/core";
import { GRAPH_COMMON_TIME_RANGE } from "libs/shared/configs/general-values";
import { CommonService } from "libs/shared/services/common.service";

@Component({
    selector:'lib-line-graph',
    templateUrl:'./line-graph.component.html'
})

export class LineGraphComponent implements AfterViewInit {
    @Input() type:string;
    @Input() graphLabels:any;
    @Input() graphValues:any;
    @Input() selectedTransactionTime = 3;
    graphOptions:any;
    timeRangeOptions:any = GRAPH_COMMON_TIME_RANGE;

    constructor(private commonService:CommonService) {
    }

    ngAfterViewInit(): void {
        console.log(this.graphLabels, this.graphValues, this.type)
        setTimeout(()=> {
            this.generateGraphOptions(this.type)
        }, 10)
    }

    onChangeTransactionCountTimeRange(value:number) {
        this.commonService.onTransactionCountTimeRangeChange.next(value);
    } 

    generateGraphOptions(graphType:string) {
        if(graphType === 'transactionCount') {
            this.graphOptions = {
                tooltip:{
                    show:true
                },
                toolbox: {
                    show: true,
                    feature: {
                      saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: this.graphLabels
                  },
                  yAxis: {
                    type: 'value',
                    name:'Transaction Count',
                    nameLocation:'middle',
                    nameGap:45
                  },
                  series: [
                    {
                      data: this.graphValues,
                      type: 'line'
                    }
                  ],
                  animation: true,
                  animationDuration: 1500,
                  animationEasing: 'cubicOut'
            }
        }
    }
}