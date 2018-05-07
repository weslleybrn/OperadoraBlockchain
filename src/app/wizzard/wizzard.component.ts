import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from '../../services/web3.service';
import { OperadoraService } from '../../services/services.service';

@Component({
  selector: 'app-wizzard',
  templateUrl: './wizzard.component.html',
  styleUrls: ['./wizzard.component.css']
})
export class WizzardComponent implements OnInit {
  formGroupBeneficiario: FormGroup;
  formGroupContraro: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private web3Service: Web3Service,
    private operadoraService: OperadoraService) { }

  ngOnInit() {
      this.formGroupBeneficiario = this.formBuilder.group({
        firstCtrl: ['', Validators.required]
      });

      this.formGroupContraro = this.formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
  }

}
