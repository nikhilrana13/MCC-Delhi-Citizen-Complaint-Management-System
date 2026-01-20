"use client"
import React, { useEffect, useState } from 'react'
import OfflineFallback from '../components/commen/OfflineFallback';

const NetworkProvider = ({children}) => {
    const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!online) return <OfflineFallback />;

  return children
}

export default NetworkProvider