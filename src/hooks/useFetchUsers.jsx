'use client';
import React, { useEffect, useState } from 'react';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null); 

        const res = await fetch("/api/users");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const usersData = await res.json();
        setUsers(usersData?.users);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useFetchUsers;
