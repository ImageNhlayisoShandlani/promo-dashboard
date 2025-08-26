import { use, useEffect } from "react";
import PromotionCard from "../components/PromotionCard";
import type { Promotion } from "../models/promotion";
import { useDispatch, useSelector } from "react-redux";
import { setPromotions } from "../app/store";
import axios from "axios";

export default function Subscriptions() {
    const savedPromotions = localStorage.getItem('savedPromotions');
    const parsedPromos = savedPromotions ? JSON.parse(savedPromotions) : [];
    const promotions = useSelector((state: any) => state.promotions);
    const dispatch = useDispatch();

    
    const getPromotions = async () => {
        try {
            const promos = axios.get(import.meta.env.VITE_API_URL).then((data) => {
                dispatch(setPromotions(data.data));
            });
        } catch (e) {
            console.log("Error fecthing data >>>>>>>>>>>>" + e);
        }
    }
    useEffect(() => {
        //Fecth data after a reload, to make sure the other components are pre loaded correctly
        if(promotions.length <= 0) getPromotions();
    }, [parsedPromos]);

    return <>

        <section className="hero row">
            <div className="hero-content">
                <h1>View all your subscriptions here!</h1>
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