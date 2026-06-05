"use client";

import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnlineUsersWidget() {
  const [onlineUsers, setOnlineUsers] = useState(15);

  useEffect(() => {
    // Generate a baseline between 12 and 35
    const baseUsers = Math.floor(Math.random() * 23) + 12;
    setOnlineUsers(baseUsers);

    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        // Fluctuate by -2 to +3
        const change = Math.floor(Math.random() * 6) - 2;
        let next = prev + change;
        if (next < 8) next = 8 + Math.floor(Math.random() * 5);
        if (next > 60) next = 60 - Math.floor(Math.random() * 5);
        return next;
      });
    }, 7000 + Math.random() * 5000); // Update every 7-12 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 md:gap-2 sm:px-2 md:px-3 sm:py-1.5 md:py-2 sm:bg-green-50 sm:dark:bg-green-900/20 sm:border sm:border-green-100 sm:dark:border-green-800/30 rounded-xl sm:shadow-sm" title="Số người đang học trực tuyến">
      <div className="relative flex items-center justify-center w-2 h-2 md:w-2.5 md:h-2.5">
        <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
        <span className="relative inline-flex w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></span>
      </div>
      <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 dark:text-green-500 hidden sm:block" />
      <div className="flex items-center text-xs md:text-sm font-bold text-green-700 dark:text-green-400">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={onlineUsers}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="inline-block tabular-nums"
          >
            {onlineUsers}
          </motion.span>
        </AnimatePresence>
        <span className="ml-1 hidden md:inline">online</span>
      </div>
    </div>
  );
}
