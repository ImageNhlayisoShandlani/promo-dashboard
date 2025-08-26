import { use, useEffect } from "react";
import PromotionCard from "../components/PromotionCard";
import type { Promotion } from "../models/promotion";

export default function Subscriptions() {
    const savedPromotions = localStorage.getItem('savedPromotions');
    const parsedPromos = savedPromotions ? JSON.parse(savedPromotions) : [];
    useEffect(() => {
        
    }, [parsedPromos]);
    return <>

        <section className="hero row">
            <div className="hero-content">
                <h1>View all your subscriptions here!</h1>
                <button mat-raised-button color="primary">Get Started</button>
            </div>
        </section>
        <section className="row" style={{ padding: '2rem' }}>
            {parsedPromos.length === 0 && <p>You have not subscribed to any promotions yet.</p>}
            <div className="row">
                {parsedPromos.map((promo: Promotion) => (
                    <PromotionCard key={promo.id} promo={promo}/>
                ))}
            </div>
        </section>
    </>
}