import { Component } from '@angular/core';
import { Web3Service } from '../services/web3.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private web3Service: Web3Service,
    private router: Router,
    private route: ActivatedRoute) {
    this.testeWeb3();
  }

  public testeWeb3() {
    this.web3Service.getAccounts()
      .subscribe(accs => console.log(accs));
  }
}
