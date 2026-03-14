/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { CityScreen } from "./components/CityScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { RegionalDashboard } from "./components/RegionalDashboard";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [view, setView] = useState<"city" | "regional" | string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginScreen onLogin={setUser} />
          </motion.div>
        ) : !view ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CityScreen
              user={user}
              onSelectCity={setView}
              onOpenRegional={() => setView("regional")}
              onLogout={() => setUser(null)}
            />
          </motion.div>
        ) : view === "regional" ? (
          <motion.div
            key="regional"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RegionalDashboard onBack={() => setView(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DashboardScreen city={view} onBack={() => setView(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

