import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/platform";

import { AppComponent } from "./app.component";
import { HttpService } from "./shared/http.service";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule
    ],
    providers: [HttpService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
