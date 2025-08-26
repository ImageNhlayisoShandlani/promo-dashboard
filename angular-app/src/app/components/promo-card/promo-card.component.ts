import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Promotion } from '../../models/promotion.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss'],
})
export class PromoCardComponent implements OnChanges {
  @Input() promo!: Promotion;
  @Output() optInChange = new EventEmitter<Promotion>();

  isChecked = false;

  constructor(private subscriptionsService: SubscriptionsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['promo'] && this.promo) {
      const savedPromotions = localStorage.getItem('savedPromosAngular');
      const parsedPromos: Promotion[] = savedPromotions ? JSON.parse(savedPromotions) : [];

      this.isChecked = parsedPromos.some(
        (p) => String(p.id) === String(this.promo.id)
      );

      console.log(
        `PromoCard init for promo ${this.promo.id} → checked: ${this.isChecked}`
      );
    }
  }

  optInToggle(promo: Promotion) {
    const savedPromotions = localStorage.getItem('savedPromosAngular');
    let parsedPromos: Promotion[] = savedPromotions ? JSON.parse(savedPromotions) : [];

    if (this.isChecked) {
      if (!parsedPromos.some((p) => String(p.id) === String(promo.id))) {
        parsedPromos.push(promo);
      }
      localStorage.setItem('savedPromosAngular', JSON.stringify(parsedPromos));
      console.log('Promo added:', promo);
    } else {
      parsedPromos = parsedPromos.filter((p) => String(p.id) !== String(promo.id));
      localStorage.setItem('savedPromosAngular', JSON.stringify(parsedPromos));
      console.log('Promo removed:', promo);
    }

    this.optInChange.emit(promo);
  }
}
