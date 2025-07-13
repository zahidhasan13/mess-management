"use client";
import React, { useEffect, useState } from 'react';

const useFetchMess = () => {
    const [mess, setMess] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
          const fetchMessData = async () => {
            try {
              setLoading(true);
              const response = await fetch("/api/mess");
              const data = await response.json();
      
              if (!response.ok) {
                throw new Error(data.error || "Failed to fetch mess data");
              }
      
              setMess(data.mess);
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchMessData();
        }, []);

        return {mess, loading, error};
};

export default useFetchMess;