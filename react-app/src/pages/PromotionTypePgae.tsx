import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { setPromotions } from "../app/store";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import PromotionCard from "../components/PromotionCard";
import type { Promotion } from "../models/promotion";

export default function PromotionTypePage() {
    const { type } = useParams();
    const promotions = useSelector((state: any) => state.promotions);
    const dispatch = useDispatch();
    const [status, setStatus] = useState<string>("all");
    const [date, setDate] = useState<string>("");
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
        getPromotions();
    }, []);


    const promoType = promotions.filter((promoType: any) => promoType.category === type);

    const filteredPromotions = promoType.filter((promo: Promotion) => {
        const statusMatch =
            status === "all" ||
            (status === "active" && promo.active) ||
            (status === "inactive" && !promo.active);
        const dateMatch =
            !date || new Date(promo.startDate) >= new Date(date);

        return statusMatch && dateMatch;
    });

    
    return <>
        <section className="hero row">
            <div className="hero-content">
                <h1>View all {type} offers available</h1>
            </div>
        </section>
        <section className="row" style={{ padding: '2rem' }}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <FormControl sx={{ flex: 1 }}>
                    <TextField type="text" value={type} style={{ flex: 1 }}
                        label="Promotion Types" />
                </FormControl>

                <FormControl sx={{ flex: 1 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    style={{ flex: 1 }}
                    label="Start After"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            {
                filteredPromotions.map((promo: Promotion, id: number) => {
                    return (
                        <PromotionCard key={id} promo={promo} />
                    );
                })
            }


        </section>
    </>
}