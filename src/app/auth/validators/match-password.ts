import { Directive, Injectable, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, Validator, Validators } from '@angular/forms';


@Directive({
    selector:'[appMatchPassword]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: MatchPassword,
        multi:true
    }]
})
export class MatchPassword {
    @Input() appMatchPassword: string ="";
    validate(control: AbstractControl): {[key:string]: any } | null{
        const compare = control.parent?.get(this.appMatchPassword);
        if (compare && compare.value !== control.value) {
            return { 'notEqual': true};
        }
        return null
    }
}

// validate(FormGroup: FormGroup ) {
//     const { password, confirmPassword} = FormGroup.value;

//     if (password === confirmPassword) {
//         return null;
//     } else {
//         return { passwordsDontMatch: true};
//     }
// }
