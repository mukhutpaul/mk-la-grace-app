import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FraisService } from 'src/app/services/frais.service';

@Component({
  selector: 'app-edit-frais',
  templateUrl: './edit-frais.component.html',
  styleUrls: ['./edit-frais.component.css']
})
export class EditFraisComponent implements OnInit{



constructor(private router:ActivatedRoute,private fraisService: FraisService,
  private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public dialogData:any,){}

alert: Boolean=false
fraisForm: any = FormGroup;


ngOnInit(): void {

  this.fraisForm = this.formBuilder.group({
    name:[null,[Validators.required]],
    montant:[null,[Validators.required]],

  });
  this.fraisForm.patchValue(this.dialogData.data);
   console.log(this.dialogData.data)
  }

    
}





