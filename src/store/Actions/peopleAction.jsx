export {removepeople} from "../Reducers/peopleSlice"
import axios from "../../Utils/axios";
import { loadpeople } from "../Reducers/peopleSlice";

export const asyncloadpeople = (id) => async(dispatch, getState) => {
    try {
       const detail = await axios.get(`/person/${id}`); 
       const externalid = await axios.get(`/person/${id}/external_ids`); 
       const combined_credits = await axios.get(`/person/${id}/combined_credits`);  
       const movie_credits = await axios.get(`/person/${id}/movie_credits`);  
       const tv_credits = await axios.get(`/person/${id}/tv_credits`);  
       let theultimatedetails = {
        detail: detail.data,
        externalid: externalid.data,
        combined_credits: combined_credits.data,
        movie_credits: movie_credits.data,
        tv_credits: tv_credits.data,
       } 
       dispatch(loadpeople(theultimatedetails))
       console.log(theultimatedetails)
       
    } catch (error) {
       console.log("Error", error); 
    }
}