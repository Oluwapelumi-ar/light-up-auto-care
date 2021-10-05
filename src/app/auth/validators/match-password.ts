import { Directive, Injectable, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, Validator, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root'})
@Directive({
    selector:'[appMatchPassword]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: MatchPassword,
        multi:true
    }]
})
export class MatchPassword implements Validators  {
    @Input() appMatchPassword: string ="";
    validate(control: AbstractControl): {[key:string]: any } | null{
        const compare = control.parent?.get(this.appMatchPassword);
        if (compare && compare.value !== control.value) {
            return { 'notEqual': true};
        }
        return null ;
    }
}