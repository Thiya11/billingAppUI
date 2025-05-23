import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BarGraphComponent } from "./bar-graph/bargraph.component";
import { NgxEchartsModule } from "ngx-echarts";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ComparisionGraphComponent } from "./comparision-graph/comparision-graph.component";
import { PieGraphComponent } from "./pie-graph/pie-graph.component";
import { LineGraphComponent } from "./line-graph/line-graph.component";
import { SharedPasswordValidationComponent } from "./password-validation/shared-password-validation.component";

@NgModule({
    imports:[
        CommonModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ],
    declarations:[
        BarGraphComponent,
        ComparisionGraphComponent,
        PieGraphComponent,
        LineGraphComponent,
        SharedPasswordValidationComponent
    ],
    exports:[
        BarGraphComponent,
        ComparisionGraphComponent,
        PieGraphComponent,
        LineGraphComponent,
        SharedPasswordValidationComponent
    ]
})

export class SharedComponentsModule {

}