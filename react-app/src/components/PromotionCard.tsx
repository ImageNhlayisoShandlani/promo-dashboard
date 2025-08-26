import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { Promotion } from "../models/promotion";
import Switch from "@mui/material/Switch";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PromotionCard({ promo }: { promo: Promotion }) {

    const savedPromotions = localStorage.getItem('savedPromotions');
    const parsedPromos: Promotion[] = savedPromotions ? JSON.parse(savedPromotions) : [];
    let isPromoExist = parsedPromos.find((p: Promotion) => p.id === promo.id);
    const [isOptedIn, setIsOptedIn] = useState(isPromoExist ? true : false);
    const location = useLocation();
    const handleOnChange = (e: any) => {

        // localStorage.removeItem('savedPromotions');
        // return;
        if (!savedPromotions) {
            // First time save
            localStorage.setItem('savedPromotions', JSON.stringify([promo]));
            toast.success(`You have successfully opted in for ${promo?.title}`);
            console.log(promo)
            e.target.checked = true;
            setIsOptedIn(true);
        } else {


            if (!isPromoExist) {
                // Opt in
                parsedPromos.push(promo);
                localStorage.setItem('savedPromotions', JSON.stringify(parsedPromos));
                toast.success(`You have successfully opted in for ${promo?.title}`);
                e.target.checked = true;
                setIsOptedIn(true);
            } else {
                // Opt out
                const updatedPromos = parsedPromos.filter((p: Promotion) => p.id !== promo.id);
                localStorage.setItem('savedPromotions', JSON.stringify(updatedPromos));
                toast.info(`You have successfully opted out of ${promo?.title}`);
                e.target.checked = false;
                isPromoExist = undefined
                setIsOptedIn(false);
                if(location.pathname === '/subscriptions') window.location.reload();
            }
        }
    };



    useEffect(() => {

    }, [parsedPromos, isPromoExist]);

    return <>

        <Card className="col-md-4" sx={{ minWidth: 275, marginBottom: '2rem', }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 ,}}>
                    {promo?.title}
                </Typography>
                <Typography variant="h5" component="div">
                    {promo?.category}
                </Typography>
                <Typography sx={{ color: promo.active ? 'green' : 'red', mb: 1.5 }}>{promo.active ? 'Active' : 'Inactive'}</Typography>
                <Typography variant="body2">
                </Typography>
            </CardContent>
            <CardActions>
                <label htmlFor="" style={isOptedIn ? { color: "green", fontWeight: 'bolder' } : {}}>{isOptedIn ? 'Subscribed' : 'Subscribe'} :</label>
                <Switch value={'opt-in'} color="warning" checked={isOptedIn ? true : false} disabled={promo.active ? false : true} onChange={handleOnChange} />

            </CardActions>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
        </Card>
    </>
}