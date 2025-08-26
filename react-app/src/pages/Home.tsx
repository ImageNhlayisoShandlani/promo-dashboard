

import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import type { Promotion } from "../models/promotion";
import { useDispatch, useSelector } from "react-redux";
import { setPromotions } from "../app/store";
import { Switch, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import PromotionCard from "../components/PromotionCard";


export default function Home() {
    const promotions = useSelector((state: any) => state.promotions);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();


    const [category, setCategory] = useState<string>("all");
    const [status, setStatus] = useState<string>("all");
    const [date, setDate] = useState<string>("");
    const getPromotions = async () => {
        setLoading(true);
        try {
            const promos = axios.get(import.meta.env.VITE_API_URL).then((data) => {
                dispatch(setPromotions(data.data));
                setLoading(false);
            });
        } catch (e) {
            setError(true);
            setLoading(false);
            console.log("Error fecthing data >>>>>>>>>>>>" + e);
        }
    }

    const filteredPromotions = promotions.filter((promo: Promotion) => {
        const categoryMatch = category === "all" || promo.category === category;
        const statusMatch =
            status === "all" ||
            (status === "active" && promo.active) ||
            (status === "inactive" && !promo.active);
        const dateMatch =
            !date || new Date(promo.startDate) >= new Date(date);

        return categoryMatch && statusMatch && dateMatch;
    });
    useEffect(() => {
        getPromotions();
    }, [])

    return (

        promotions.length <= 0 ? <Loading /> :
            <>
                <section className="hero row">
                    <div className="hero-content">
                        <h1>Welcome to Mini Dashboard</h1>
                        <p>Track your promotions, categories, and subscriptions easily.</p>
                    </div>
                </section>




                <div className="row" style={{ flex: 1, margin: "1rem", flexWrap: "wrap", }}>
                    <div className="row">
                        <p>Filter Promotions</p>
                    </div>
                    <FormControl className="col-md-4">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="Casino">Casino</MenuItem>
                            <MenuItem value="Sports">Sports</MenuItem>
                            <MenuItem value="Poker">Poker</MenuItem>
                            <MenuItem value="Lotto">Lotto</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className="col-md-4" >
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

                    <TextField className="col-md-4"
                        label="Start After"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <section className="row" style={{ padding: '2rem' }}>

                    {
                        filteredPromotions.map((promo: Promotion, id: number) => {
                            return (
                                <PromotionCard key={id} promo={promo} />
                            );
                        })
                    }


                </section>
            </>);
}