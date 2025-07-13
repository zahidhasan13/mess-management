'use client'
import React, { useEffect, useState } from 'react';

const useFetchDailyMeal = () => {
    const [dailyMeal, setDailyMeal] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        const fetchDailyMeal = async () => {
          try {
            setLoading(true);
            setError(null); 
    
            const res = await fetch("/api/daily-meal");
    
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const dailyMealData = await res.json();
            setDailyMeal(dailyMealData?.dailyMeal);
          } catch (err) {
            console.error("Error fetching dailyMeal:", err);
            setError(err?.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchDailyMeal();
      }, []);
    
      return { dailyMeal, loading, error };
    };

export default useFetchDailyMeal;