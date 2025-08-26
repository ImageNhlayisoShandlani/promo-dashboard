import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { PromoCardComponent } from '../../components/promo-card/promo-card.component';
import { Promotion } from '../../models/promotion.model';
import { PromotionsService } from '../../services/promotions.service';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    PromoCardComponent,
    FilterPanelComponent,
    MatGridListModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  promos: Promotion[] = [];
  filteredPromos: Promotion[] = [];
  loading = true;
  constructor(private promotionService: PromotionsService) {}

  ngOnInit() {
    this.promotionService.getPromotions().subscribe({
      next: (data) => {
        this.promos = data;
        this.filteredPromos = [...this.promos];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching promotions', err);
        this.loading = false;
      },
    });
  }


  applyFilters(filters: {
    category: string;
    status: string;
    startDate: string;
  }) {
    this.filteredPromos = this.promos.filter((promo) => {
      const matchCategory = filters.category
        ? promo.category === filters.category
        : true;
      const matchStatus = filters.status
        ? promo.active === (filters.status === 'active')
        : true;
      const matchDate = filters.startDate
        ? new Date(promo.startDate) >= new Date(filters.startDate)
        : true;
      return matchCategory && matchStatus && matchDate;
    });
  }

  handleOptIn(promo: Promotion) {
    this.promotionService.updateOptIn(promo).subscribe({
      next: (updated) => {
        console.log('Opt-in updated:', updated);
      },
      error: (err) => console.error('Error updating opt-in', err),
    });
  }
}
