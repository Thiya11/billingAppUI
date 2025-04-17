import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GRAPH_COMMON_TIME_RANGE, QUANTITY_CATEGORY_LIST } from "libs/shared/configs/general-values";
import { CommonService } from "libs/shared/services/common.service";

@Component({
    selector:'lib-bar-graph',
    templateUrl:'./bargraph.component.html'
})

export class BarGraphComponent implements AfterViewInit {
    @Input() type:string;
    @Input() graphLabels:any;
    @Input() graphValues:any;
    @Input() selectedTransactionTime = 6;
    @Input() selectedInventoryCategory = 0;
    graphOptions:any;
    timeRangeOptions:any = GRAPH_COMMON_TIME_RANGE;
    inventoryCategoryList:any = QUANTITY_CATEGORY_LIST;


    constructor(private commonService:CommonService) {
    }

    ngAfterViewInit(): void {
        setTimeout(()=> {
            this.generateGraphOptions(this.type)
        })
    }

    generateValues() {
        return this.graphValues.map((item)=> {
            let itemArr = item.split(' ');
            let value   = Number(itemArr[0]);
            return {
                value: value,
                itemStyle: {
                    color: value < 5 ? 'red' : '#5470C6',
                    borderRadius:[50, 50, 0, 0]
                },
                label:itemArr[1]
            }
        })
    }

    generateGraphOptions(graphType:string) {
       if (graphType === 'inventory') {
            this.graphOptions = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter:(params)=>{
                       let tooltipContent = '';
                       params.forEach((param)=> {
                         tooltipContent += `<div class='d-flex flex-column'>
                                              <label>${param.name}</label><label stype="margin-top:10px;">
                                                  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>
                                                  <strong>${param.data.value}  ${param.data.label}</strong>
                                                </label>
                                            </div>`
                       });
                       return tooltipContent;
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                      saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type:'category',
                    data:this.graphLabels,
                },
                yAxis: {
                    type:'value',
                    name: 'Total Transaction (₹)',
                    nameLocation:'middle',
                    nameGap:55
                },
                series:{
                    data:this.generateValues(),
                    type:'bar',
                    label:{
                        show:true,
                        position:'top'
                    },
                    barwidth:'20%'
                },
                animation: true,
                animationDuration: 1500,
                animationEasing: 'cubicOut'
            }

        }
        else {
            this.graphOptions = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter:(params)=>{
                       let tooltipContent = '';
                       params.forEach((param)=> {
                         tooltipContent += `<div class='d-flex flex-column'>
                                              <label>${param.name}</label><label stype="margin-top:10px;">
                                                  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>
                                                  <strong> ₹${param.value}</strong>
                                                </label>
                                            </div>`
                       });
                       return tooltipContent;
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                      saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type:'category',
                    data:this.graphLabels,
                },
                yAxis: {
                    type:'value',
                    name: 'Total Transaction (₹)',
                    nameLocation:'middle',
                    nameGap:55
                },
                series:{
                    data:this.graphValues,
                    type:'bar',
                    label:{
                        show:true,
                        position:'top'
                    }
                },
                animation: true,
                animationDuration: 1500,
                animationEasing: 'cubicOut'
            }
        }
    }

    onChangeTimeRange(value:number) {
        this.commonService.onTransactionTimeRangeChange.next(this.selectedTransactionTime);
    }

    onChangeInventoryCategory(value:number) {
        this.commonService.onInventoryCategoryChange.next(this.selectedInventoryCategory)
    }
}