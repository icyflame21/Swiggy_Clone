import React, { useState,useEffect } from 'react'
import './Animation.css'

export default function Animation() {
    const [h11,seth11]=useState("Late Night at Office?")
    const [i,seti]=useState(0)
    var arr=["Hungry?","Movie marathon?","Unexpected guests?","Late Night at Office?","Cooking gone wrong?","Game Night?"]
    useEffect(() => {
        const interval = setInterval(() => {
            seti((i+1)%6);
        }, 0);
        return () => clearInterval(interval);
      },[h11] );

      
      useEffect(() => {
        const interval1 = setInterval(() => {
           seth11(arr[i]) ;
        }, 3500);
        return () => clearInterval(interval1);
      },[i] );

    useEffect(() => {
      
        const interval2 = setInterval(() => {
               document.getElementById("ani").classList.add("animate-bottom");
                }, 10);
        document.getElementById("ani").classList.remove("animate-bottom");
        return () => clearInterval(interval2);
      },[h11] );
    return (
        <div className="animation ">
           <h1 id="ani" className="animate-bottom">{h11}</h1>
            <h2 style={{fontSize:"24px",fontWeight:"400",color:"#80807d"}}>Order food from favourite resturants near you.</h2>
        </div>
    )
}