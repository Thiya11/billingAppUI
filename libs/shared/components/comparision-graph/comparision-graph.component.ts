import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EChartsOption } from "echarts";
import { GRAPH_COMMON_TIME_RANGE } from "libs/shared/configs/general-values";
import { CommonService } from "libs/shared/services/common.service";

@Component({
    selector:'lib-comparision-graph',
    templateUrl:'./comparision-graph.component.html'
})

export class ComparisionGraphComponent implements AfterViewInit {
    @Input() type:string;
    @Input() graphLabels:any;
    @Input() graphValues:any;
    @Input()selectedTaxTime = 4;
    timeRangeOptions:any = GRAPH_COMMON_TIME_RANGE;
    graphOptions:any;

    constructor(private commonService:CommonService) {
    }

    ngAfterViewInit(): void {
        console.log(this.graphLabels, this.graphValues, this.type)
        setTimeout(()=> {
            this.generateGraphOptions(this.type)
        }, 10)
    }

    generateGraphOptions(graphType:string) {
        if (graphType === 'taxComparision') {
            this.graphOptions = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter:(params)=>{
                        let tooltipContent = params[0].name;
                        params.forEach((param)=> {
                          tooltipContent += `<div class='d-flex flex-column'><label stype="margin-top:10px;">
                                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>
                                                <label>${param.seriesName}</label><strong> ₹${param.value}</strong></label>
                                            </div>`
                        });
                        return tooltipContent;
                     }
                },
                legend: {
                    data: ['Transaction Amount', 'Tax Amount']
                },
                toolbox: {
                    show: true,
                    feature: {
                      restore: { show: true },
                      saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type:'value',
                    name:'Transaction Amount (₹) vs Total Tax Amount (₹)',
                    nameLocation:'middle',
                    nameGap:35
                },
                yAxis: {
                    type:'category',
                    data:this.graphLabels,
                },
                series:[
                    {
                        name:'Transaction Amount',
                        type:'bar',
                        data:this.graphValues[0],
                        label:{
                            show:true,
                            position:'right'
                        }
                    },
                    {
                        name:'Tax Amount',
                        type:'bar',
                        data:this.graphValues[1],
                        label:{
                            show:true,
                            position:'right'
                        }
                    },
                ],
                animation: true,
                animationDuration: 2500,
                animationEasing: 'cubicOut'
            }
        }
    }

    onChangeTaxTimeRange(value:number) {
        this.commonService.onTaxTimeRangeChange.next(value);
    }
}