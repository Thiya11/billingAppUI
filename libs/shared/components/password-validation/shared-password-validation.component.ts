import { Component } from "@angular/core";
declare var $:any;

@Component({
    selector:'shared-password-validation',
    templateUrl:'./shared-password-validation.component.html'
})

export class SharedPasswordValidationComponent {
    showFullString: boolean = false;

    onValidatePassword(value) {
        let fieldRules = {
            "minLength"   : /.{8,}/,
            "lowerCase"   : /[a-z]/,
            "upperCase"   : /[A-Z]/,
            "digit"       : /[0-9]/,
            "specialChar" : /[~`!@#$%^&*()_\-+={[}\]|\:;"'<,>.?\\/]/,
            "fullString"  : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()_\-+={[}\]|\:;"'<,>.?\\/])[A-Za-z0-9 ~`!@#$%^&*()_\-+={[}\]|\:;"'<,>.?\\/]{8,}$/
        }
        Object.keys(fieldRules).forEach((rule)=> {
            let valid = new RegExp(fieldRules[rule]).test(value);
            if(valid) {
                $('#'+rule).addClass('error-li');
                $('#icon'+rule).removeClass('bi bi-x-circle');
                $('#icon'+rule).addClass('bi bi-check-circle');
            } else {
                $('#'+rule).removeClass('error-li');
                $('#icon'+rule).removeClass('bi bi-check-cicle');
                $('#'+rule + " i").addClass('bi bi-x-circle');
            }
        });
        let invalidChar = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()_\-+={[}\]|\:;"'<,>.?\\/])[A-Za-z0-9 ~`!@#$%^&*()_\-+={[}\]|\:;"'<,>.?\\/]{8,}$/).test(value);
        if(!invalidChar){
            this.showFullString = true;
            $('#fullString').show();
            $('#fullString').removeClass('error-li');
            $('#fullString').removeClass('fa fa-check');
            $('#fullString i').addClass('fa fa-times-circle');
        } else {
            this.showFullString = false;
            $('#fullString').hide();
        }


    }
}