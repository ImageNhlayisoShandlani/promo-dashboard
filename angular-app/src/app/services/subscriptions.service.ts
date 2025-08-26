import { Injectable } from '@angular/core';
import { Promotion } from '../models/promotion.model';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private storageKey = 'subscribedPromotions';
  constructor() {}
  getSubscriptions(): Promotion[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveSubscriptions(promos: Promotion[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(promos));
  }

  toggleSubscription(promo: Promotion) {
    let subs = this.getSubscriptions();
    const index = subs.findIndex((p) => p.id === promo.id);

    if (index > -1) {
      subs[index].optedIn = !subs[index].optedIn;
    } else {
      promo.optedIn = true;
      subs.push(promo);
    }

    this.saveSubscriptions(subs);
    return subs;
  }

  isSubscribed(promoId: any): boolean {
    return this.getSubscriptions().some((p) => p.id === promoId && p.optedIn);
  }
}
