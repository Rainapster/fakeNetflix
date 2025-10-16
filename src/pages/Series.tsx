import { useEffect } from "react"
import CardCarousel from "../components/cardCarousel/CardCarousel"
import {usePopularSeries } from "../hooks/useSeries"

export const Series = () =>{
    const title = "Popular Series"
    const {popularSeries, retrivePopularSeries} = usePopularSeries()
    const uniformedSeries = popularSeries.map((serie)=>{return{...serie, title : serie.name, release_date : serie.first_air_date, poster_path : serie.poster_path ?? "" }})
    
      useEffect(()=>{
        retrivePopularSeries()
      },[retrivePopularSeries])
      console.log("popularseries: ",popularSeries)
    return(
        <div>
            <h2>{title}</h2>
            <CardCarousel title={title} movies={uniformedSeries} customNavigationParams="isSerie=true" />
        </div>
    )
}