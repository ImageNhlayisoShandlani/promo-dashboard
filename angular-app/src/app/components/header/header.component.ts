import { Component, OnInit } from '@angular/core';

//Header Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgFor, NgIf } from '@angular/common';
import { PromoTypesService } from '../../services/promo-types.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    NgIf,
    NgFor,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  promoTypes: string[] = [];
  showCategories = false;

  constructor(private promoTypesService: PromoTypesService){}

  ngOnInit(): void {
    this.promoTypesService.getCategories().subscribe({
      next: data => this.promoTypes = data,
      error: err => console.log('Error fetching categories', err)
    });
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }
}
