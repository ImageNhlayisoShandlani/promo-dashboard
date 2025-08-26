import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Promotion } from '../../models/promotion.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../services/subscriptions.service';

@Component({
  selector: 'app-promo-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './promo-card.component.html',
  styleUrl: './promo-card.component.scss',
})
export class PromoCardComponent implements OnInit {
  @Input() promo: any;
  @Output() optInChange = new EventEmitter<any>();

  isSubscribed = false;
  constructor(private subscriptionsService: SubscriptionsService){}

  ngOnInit(): void {
    const subs = JSON.parse(localStorage.getItem('subscribedPromotions') || '[]');
    this.isSubscribed = this.subscriptionsService.isSubscribed(this.promo.id);
  }


  toggleOptIn() {

    let subs = JSON.parse(localStorage.getItem('subscribedPromotions') || '[]');
    if (this.isSubscribed) {
      subs = subs.filter((p: any) => p.id !== this.promo.id);
      this.isSubscribed = false;
    } else {
      subs.push(this.promo);
      this.isSubscribed = true;
    }

    localStorage.setItem('subscribedPromotions', JSON.stringify(subs));
    this.optInChange.emit({ promo: this.promo, isSubscribed: this.isSubscribed });
  }
}
