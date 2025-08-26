import axios from "axios";

export async function getAllPromotions(){
   const promotions = (await axios.get(import.meta.env.VITE_API_URL)).data;
   return promotions;
}