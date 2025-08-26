import { Component, OnInit } from '@angular/core';
import { Promotion } from '../../models/promotion.model';
import { PromotionsService } from '../../services/promotions.service';
import { ActivatedRoute } from '@angular/router';
import { PromoCardComponent } from '../../components/promo-card/promo-card.component';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-promo-type',
  imports: [NgFor, PromoCardComponent, FilterPanelComponent,],
  templateUrl: './promo-type.component.html',
  styleUrl: './promo-type.component.scss'
})
export class PromoTypeComponent implements OnInit{

  promos: Promotion[] = [];
  filteredPromos: Promotion[] = [];

  constructor(private promostionsService: PromotionsService, private route: ActivatedRoute){}

  ngOnInit(): void {

      this.route.paramMap.subscribe(params => {
        const promoTypes = params.get('promoType');

        this.promostionsService.getPromotions().subscribe((promos) => {
          this.promos = promos;

          if(promoTypes){
            this.filteredPromos = this.promos.filter(p => p.category === promoTypes);
          }
          else{
            this.filteredPromos = [...this.promos];
          }
        });
    });
  }

  applyFilters(filters: { category: string; status: string; startDate: string }) {
    this.filteredPromos = this.promos.filter(promo => {
      const matchCategory = filters.category ? promo.category === filters.category : true;
      const matchStatus = filters.status ? promo.active === (filters.status === 'active') : true;
      const matchDate = filters.startDate ? new Date(promo.startDate) >= new Date(filters.startDate) : true;
      return matchCategory && matchStatus && matchDate;
    });
  }

  handleOptIn(promo: Promotion) {
    this.promostionsService.updateOptIn(promo).subscribe();
  }
}
