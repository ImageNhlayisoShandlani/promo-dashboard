import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PromoTypeComponent } from './pages/promo-type/promo-type.component';
import { SubscribedPromotionsComponent } from './pages/subscribed-promotions/subscribed-promotions.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'promo-types/:promoType',
        component: PromoTypeComponent
    },
    {
        path: 'subscribed-promotions',
        component: SubscribedPromotionsComponent
    }
];
