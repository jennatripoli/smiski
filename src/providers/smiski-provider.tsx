"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "@/providers";
import { supabase, SERIES_COLORS, Smiski } from "@/lib";

type SmiskiContext = {
  smiskis: Smiski[];
  addSmiski: (smiski: Omit<Smiski, "id" | "count">) => void;
  incrementCount: (id: string) => void;
  decrementCount: (id: string) => void;
  removeSmiski: (id: string) => void;
  toggleFilterMissing: () => void;
  setFilterSeries: (series: string | null) => void;
  setViewMode: (mode: "grid" | "list") => void;
  getSeriesColor: (series: string) => string;
  syncWithCloud: () => Promise<void>;
  filterMissing: boolean;
  filterSeries: string | null;
  viewMode: "grid" | "list";
  loading: boolean;
};

const SmiskiContext = createContext<SmiskiContext | undefined>(undefined);

export function SmiskiProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [smiskis, setSmiskis] = useState<Smiski[]>([]);
  const [filterMissing, setFilterMissing] = useState(false);
  const [filterSeries, setFilterSeries] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);

  // Generate a unique ID for new Smiskis
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Save to localStorage
  const saveToLocalStorage = (data: Smiski[]) => {
    localStorage.setItem("smiskiCollection", JSON.stringify(data));
  };

  // Load from localStorage
  const loadFromLocalStorage = (): Smiski[] => {
    try {
      const saved = localStorage.getItem("smiskiCollection");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return [];
    }
  };

  // Load from Supabase
  const loadFromSupabase = useCallback(async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from("user_smiskis")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      return data.map((item) => ({
        id: item.id,
        name: item.name,
        series: item.series,
        isSecret: item.is_secret,
        count: item.count,
      }));
    } catch (error) {
      console.error("Error loading from Supabase:", error);
      return [];
    }
  }, [user]);

  // Sync local collection with cloud
  const syncWithCloud = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const localData = smiskis;
      const cloudData = await loadFromSupabase();

      // Merge local and cloud data (local takes precedence for conflicts)
      const mergedData = [...cloudData];

      for (const localSmiski of localData) {
        const existingIndex = mergedData.findIndex(
          (cloudSmiski) =>
            cloudSmiski.name === localSmiski.name &&
            cloudSmiski.series === localSmiski.series
        );

        if (existingIndex >= 0) {
          // Update existing with local data
          mergedData[existingIndex] = { ...localSmiski };
        } else {
          // Add new local item
          mergedData.push(localSmiski);
        }
      }

      // Clear cloud data and re-insert merged data
      await supabase.from("user_smiskis").delete().eq("user_id", user.id);

      if (mergedData.length > 0) {
        const insertData = mergedData.map((smiski) => ({
          user_id: user.id,
          name: smiski.name,
          series: smiski.series,
          is_secret: smiski.isSecret,
          count: smiski.count,
        }));

        const { data, error } = await supabase
          .from("user_smiskis")
          .insert(insertData)
          .select();

        if (error) throw error;

        // Update local state with new IDs from Supabase
        const updatedSmiskis = data.map((item) => ({
          id: item.id,
          name: item.name,
          series: item.series,
          isSecret: item.is_secret,
          count: item.count,
        }));

        setSmiskis(updatedSmiskis);
        saveToLocalStorage(updatedSmiskis);
      }
    } catch (error) {
      console.error("Error syncing with cloud:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load collection on mount and when user changes
  useEffect(() => {
    const loadCollection = async () => {
      if (user) {
        // User is signed in - load from cloud and merge with local
        setLoading(true);
        const cloudData = await loadFromSupabase();
        const localData = loadFromLocalStorage();

        // If we have local data and cloud data, we'll use cloud data
        // but offer to sync later
        if (cloudData.length > 0) {
          setSmiskis(cloudData);
          saveToLocalStorage(cloudData);
        } else if (localData.length > 0) {
          // No cloud data but we have local data - keep local and offer to sync
          setSmiskis(localData);
        }
        setLoading(false);
      } else {
        // User not signed in - load from localStorage
        const localData = loadFromLocalStorage();
        setSmiskis(localData);
      }
    };

    loadCollection();
  }, [user, loadFromSupabase]);

  // Load view mode from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem("viewMode") as
      | "grid"
      | "list"
      | null;
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const getSeriesColor = (series: string) => {
    return SERIES_COLORS[series] || SERIES_COLORS["Custom"];
  };

  const addSmiski = async (smiski: Omit<Smiski, "id" | "count">) => {
    const newSmiski: Smiski = {
      id: generateId(),
      ...smiski,
      count: 1,
    };

    const updatedSmiskis = [...smiskis, newSmiski];
    setSmiskis(updatedSmiskis);
    saveToLocalStorage(updatedSmiskis);

    // If user is signed in, also save to cloud
    if (user) {
      try {
        const { data, error } = await supabase
          .from("user_smiskis")
          .insert({
            user_id: user.id,
            name: smiski.name,
            series: smiski.series,
            is_secret: smiski.isSecret,
            count: 1,
          })
          .select()
          .single();

        if (error) throw error;

        // Update the local smiski with the cloud ID
        const updatedWithCloudId = updatedSmiskis.map((s) =>
          s.id === newSmiski.id ? { ...s, id: data.id } : s
        );
        setSmiskis(updatedWithCloudId);
        saveToLocalStorage(updatedWithCloudId);
      } catch (error) {
        console.error("Error saving to cloud:", error);
      }
    }
  };

  const incrementCount = async (id: string) => {
    const smiski = smiskis.find((s) => s.id === id);
    if (!smiski) return;

    const updatedSmiskis = smiskis.map((s) =>
      s.id === id ? { ...s, count: s.count + 1 } : s
    );
    setSmiskis(updatedSmiskis);
    saveToLocalStorage(updatedSmiskis);

    // If user is signed in, also update cloud
    if (user) {
      try {
        const { error } = await supabase
          .from("user_smiskis")
          .update({
            count: smiski.count + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);

        if (error) throw error;
      } catch (error) {
        console.error("Error updating cloud:", error);
      }
    }
  };

  const decrementCount = async (id: string) => {
    const smiski = smiskis.find((s) => s.id === id);
    if (!smiski) return;

    const newCount = Math.max(0, smiski.count - 1);

    if (newCount === 0) {
      // Remove the item entirely when count reaches 0
      await removeSmiski(id);
    } else {
      const updatedSmiskis = smiskis.map((s) =>
        s.id === id ? { ...s, count: newCount } : s
      );
      setSmiskis(updatedSmiskis);
      saveToLocalStorage(updatedSmiskis);

      // If user is signed in, also update cloud
      if (user) {
        try {
          const { error } = await supabase
            .from("user_smiskis")
            .update({ count: newCount, updated_at: new Date().toISOString() })
            .eq("id", id);

          if (error) throw error;
        } catch (error) {
          console.error("Error updating cloud:", error);
        }
      }
    }
  };

  const removeSmiski = async (id: string) => {
    const updatedSmiskis = smiskis.filter((s) => s.id !== id);
    setSmiskis(updatedSmiskis);
    saveToLocalStorage(updatedSmiskis);

    // If user is signed in, also remove from cloud
    if (user) {
      try {
        const { error } = await supabase
          .from("user_smiskis")
          .delete()
          .eq("id", id);
        if (error) throw error;
      } catch (error) {
        console.error("Error removing from cloud:", error);
      }
    }
  };

  const toggleFilterMissing = () => {
    setFilterMissing((prev) => !prev);
  };

  // Replace the existing smiskis state management with filtered version
  const filteredSmiskis = smiskis.filter((s) => s.count > 0);

  return (
    <SmiskiContext.Provider
      value={{
        smiskis: filteredSmiskis,
        addSmiski,
        incrementCount,
        decrementCount,
        removeSmiski,
        filterMissing,
        toggleFilterMissing,
        filterSeries,
        setFilterSeries,
        viewMode,
        setViewMode,
        getSeriesColor,
        loading,
        syncWithCloud,
      }}
    >
      {children}
    </SmiskiContext.Provider>
  );
}

export function useSmiski() {
  const context = useContext(SmiskiContext);
  if (context === undefined) {
    throw new Error("useSmiski must be used within a SmiskiProvider");
  }
  return context;
}
