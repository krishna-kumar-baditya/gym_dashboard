import { supabase } from "@/lib/supabase/client";
import { ClassSchedule } from "./classSchedule.types";

/* ===================== CONSTANTS ===================== */

export const PAGE_SIZE = 5;

/* ===================== HELPERS ===================== */

/**
 * Calculate PostgREST range safely
 */
const getRange = (page: number, pageSize = PAGE_SIZE) => {
  const from = Math.max(0, (page - 1) * pageSize);
  const to = from + pageSize - 1;
  return { from, to };
};

/**
 * Normalize day filter
 * Must match DB constraint values exactly
 */
const normalizeDayFilter = (day?: string) => {
  if (!day || day === "All") return null;
  return day; // ✅ matches DB ('Monday', 'Tuesday', ...)
};

/* ===================== FETCH ===================== */

export const getClassSchedules = async (
  page: number,
  day?: string
) => {
  const { from, to } = getRange(page);
  const normalizedDay = normalizeDayFilter(day);

  let query = supabase
    .from("class_schedule")
    .select(
      `
        id,
        class_name,
        day,
        time,
        description,
        is_active,
        trainer_id,
        created_at,
        trainer:trainers (
          id,
          name
        )
      `,
      { count: "exact" }
    )
    .order("day", { ascending: true })
    .order("time", { ascending: true })
    .range(from, to);

  if (normalizedDay) {
    query = query.eq("day", normalizedDay);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("Failed to fetch class schedules:", error);
    throw error;
  }

  // Transform the data to match ClassSchedule type
  // Supabase returns trainer as an array for relations, but we need it as an object
  const transformedData = (data ?? []).map((item: any) => ({
    ...item,
    trainer: Array.isArray(item.trainer) 
      ? (item.trainer[0] || undefined)
      : item.trainer,
  }));

  return {
    data: transformedData as ClassSchedule[],
    count: count ?? 0,
  };
};

/* ===================== CREATE ===================== */

export const createClass = async (
  payload: Partial<ClassSchedule>
) => {
  const { data, error } = await supabase
    .from("class_schedule")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    console.error("Failed to create class:", error);
    throw error;
  }

  return data;
};

/* ===================== UPDATE ===================== */

export const updateClass = async (
  id: string,
  payload: Partial<ClassSchedule>
) => {
  const { error } = await supabase
    .from("class_schedule")
    .update(payload)
    .eq("id", id);

  if (error) {
    console.error("Failed to update class:", error);
    throw error;
  }
};

/* ===================== DELETE ===================== */

export const deleteClass = async (id: string) => {
  const { error } = await supabase
    .from("class_schedule")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete class:", error);
    throw error;
  }
};
