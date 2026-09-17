"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { FleetType } from "@/types/database";

export type ThresholdMap = Record<FleetType, { t1: number; t2: number }>;

export function useThresholdConfig() {
  const [configs, setConfigs] = useState<ThresholdMap | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabaseBrowser.from("threshold_configs").select("*");
    if (data) {
      const map = Object.fromEntries(
        data.map((c) => [c.fleet_type, { t1: c.waspada_threshold, t2: c.bahaya_threshold }])
      ) as ThresholdMap;
      setConfigs(map);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(fleetType: FleetType, t1: number, t2: number) {
    setConfigs((prev) => (prev ? { ...prev, [fleetType]: { t1, t2 } } : prev));
    await supabaseBrowser
      .from("threshold_configs")
      .update({ waspada_threshold: t1, bahaya_threshold: t2 })
      .eq("fleet_type", fleetType);
  }

  return { configs, loading, save };
}
