import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import type { Promotion } from "../models/promotion";
import { getAllPromotions } from "../shared/functions";
import { useSelector } from "react-redux";


export default function Home() {
    const promotions: Promotion[] = useSelector((state: any) => state.promotions);

    
    return (

        promotions.length <= 0 ? <Loading /> :
            <>
                <section className="hero row">
                    <div className="hero-content">
                        <h1>Welcome to Mini Dashboard</h1>
                        <p>Track your promotions, categories, and subscriptions easily.</p>
                        <button mat-raised-button color="primary">Get Started</button>
                    </div>
                </section>

                <section className="row" style={{ padding: '2rem' }}>

                    {
                        promotions.map(({promo, id}: any) => {
                            return <>
                                <Card key={id} className="col-md-4" sx={{ minWidth: 275, marginBottom: '1rem' }}>
                                    <CardContent>
                                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                            {promo.title}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {promo.category}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Status: {promo.active}</Typography>
                                        <Typography variant="body2">
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </>
                        })
                    }

                    {/* <Card className="col-md-4" sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

            <Card className="col-md-4" sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

            <Card className="col-md-4" sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card> */}
                </section>
            </>);
}