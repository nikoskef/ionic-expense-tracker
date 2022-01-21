import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Transaction } from '../../services/cash.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  transaction: Transaction = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.transaction = this.router.getCurrentNavigation().extras.state.transaction;
      }
    });
  }

  ngOnInit() {}
}
