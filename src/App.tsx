/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { CityScreen } from "./components/CityScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { AnimatePresence, motion } from "motion/react";

// Lazy load heavy components to save RAM on initial load
const RegionalDashboard = lazy(() => import("./components/RegionalDashboard").then(m => ({ default: m.RegionalDashboard })));
const RiscoTrabalhistaApp = lazy(() => import("./components/RiscoTrabalhistaApp"));

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [view, setView] = useState<"city" | "regional" | "map" | string | null>(null);

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
              onOpenMap={() => setView("map")}
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
            <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></div>}>
              <RegionalDashboard onBack={() => setView(null)} />
            </Suspense>
          </motion.div>
        ) : view === "map" ? (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div></div>}>
              <RiscoTrabalhistaApp onBack={() => setView(null)} />
            </Suspense>
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

