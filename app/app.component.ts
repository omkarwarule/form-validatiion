 import { Component } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { RouterOutlet } from '@angular/router';
 import { FormBuilder } from '@angular/forms';
 import { Validators } from '@angular/forms';
 import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
// import { FormsModule } from '@angular/forms';
export interface State {
  flag: string;
  name: string;
  population: string;
}
 @Component({
  selector: 'app-root',
   standalone: true,
   imports: [
    CommonModule, RouterOutlet,ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AsyncPipe,
    FormsModule
  ],  
    templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[FormBuilder,Validators]
 })
export class AppComponent 
{
  stateCtrl = new FormControl('');
  filteredStates: Observable<State[]>;
  constructor(private obj:FormBuilder){
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );
  }
  onSubmit() {
    // Handle form submission logic here
    console.log('Form Status:', this.Omkarform.status);
    if (this.Omkarform.valid) {
      // The form is valid, you can proceed with the submission logic
      console.log('Form submitted successfully!');
    } else {
      // The form is not valid, handle errors or display messages
      console.log('Form has validation errors.');
    }
  }
  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }
  states: State[] = [
    {
      name: 'Maharashtra',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'Gujrat',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'MadhyaPradesh',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    }
  ]
  Omkarform=this.obj.group(
    {
       username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
       phone:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10)]],
       mail:['',[Validators.required,Validators.email]],
       Address:['',[Validators.required]],
       city:['',[Validators.required,Validators.minLength(4)]],
       state: [this.states[0].name, [Validators.required]],
       zip: ['',[Validators.required,Validators.maxLength(5),Validators.pattern('[0-9]*')]],
       come:['',[Validators.required,Validators.minLength(30)]]
    }
  )
  Set()
  {
     this.Omkarform.setValue(
      {
        username:'',
       phone:'',
       mail:'',
       Address:'',
       city:'',
       state:'',
       zip:'',
       come:''
      }
     )
  }
}



