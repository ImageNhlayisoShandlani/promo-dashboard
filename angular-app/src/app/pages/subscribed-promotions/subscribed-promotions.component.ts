import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { Promotion } from '../../models/promotion.model';
import { PromoCardComponent } from '../../components/promo-card/promo-card.component';

@Component({
  selector: 'app-subscribed-promotions',
  imports: [CommonModule, PromoCardComponent],
  templateUrl: './subscribed-promotions.component.html',
  styleUrl: './subscribed-promotions.component.scss'
})
export class SubscribedPromotionsComponent implements OnInit{

  subscriptions: Promotion[] = [];

  constructor(private subscriptionService: SubscriptionsService){}

  ngOnInit(){
    this.subscriptions = this.subscriptionService.getSubscriptions().filter(p => p.optedIn);
  }

}
