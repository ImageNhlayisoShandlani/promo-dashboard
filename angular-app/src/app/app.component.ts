import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

import { Promotion } from './models/promotion.model';
import { PromoCardComponent } from './components/promo-card/promo-card.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { CommonModule } from '@angular/common';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { PromotionsService } from './services/promotions.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './pages/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    PromoCardComponent,
    FilterPanelComponent,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-app';
}
