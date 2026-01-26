"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import StatCard from "@/components/dashboard/StatCard";
import StatisticsChart from "@/components/dashboard/StatisticsChart";
import TodayClassesTable from "@/components/dashboard/TodayClassesTable";
import RecentSubmissionsTable from "@/components/dashboard/RecentSubmissionsTable";
import { Users, Briefcase, List, Mail } from "lucide-react";
import { getDashboardStatsChart } from "@/features/dashboard/dashboard.service";
import { getRecentSubmissions } from "@/features/dashboard/recentSubmissions.service";

/* ================= TYPES ================= */

type TodayClass = {
    id: string;
    class_name: string;
    time: string;
    trainer: {
        name: string;
    } | null;
};

type DashboardStats = {
    trainers: number;
    services: number;
    classTypes: number;
    messages: number;
};

/* ================= COMPONENT ================= */

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        trainers: 0,
        services: 0,
        classTypes: 0,
        messages: 0,
    });

    const [todayClasses, setTodayClasses] = useState<TodayClass[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [submissions, setSubmissions] = useState<any[]>([]);

    /* ================= LOAD DASHBOARD ================= */

    useEffect(() => {
        const loadDashboard = async () => {
            const [trainers, services, classes, messages] = await Promise.all([
                supabase.from("trainers").select("id", { count: "exact" }),
                supabase.from("services").select("id", { count: "exact" }),
                supabase.from("class_schedule").select("class_name"),
                supabase
                    .from("contact_messages")
                    .select("id", { count: "exact" }),
            ]);

            setStats({
                trainers: trainers.count ?? 0,
                services: services.count ?? 0,
                classTypes: new Set(classes.data?.map((c) => c.class_name))
                    .size,
                messages: messages.count ?? 0,
            });

            const today = new Date().toLocaleDateString("en-US", {
                weekday: "long",
            });

            const { data } = await supabase
                .from("class_schedule")
                .select("id, class_name, time, trainer:trainers(name)")
                .eq("day", today);

            const normalizedTodayClasses: TodayClass[] = (data ?? []).map(
                (item) => ({
                    id: item.id,
                    class_name: item.class_name,
                    time: item.time,
                    trainer: Array.isArray(item.trainer)
                        ? (item.trainer[0] ?? null)
                        : (item.trainer ?? null),
                }),
            );

            setTodayClasses(normalizedTodayClasses);
        };

        loadDashboard();
    }, []);

    useEffect(() => {
        getDashboardStatsChart().then(setChartData);
        getRecentSubmissions().then(setSubmissions);
    }, []);

    /* ================= UI ================= */

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                    label="Total Trainers"
                    value={stats.trainers}
                    icon={<Users />}
                />
                <StatCard
                    label="Total Services"
                    value={stats.services}
                    icon={<Briefcase />}
                />
                <StatCard
                    label="Class Types"
                    value={stats.classTypes}
                    icon={<List />}
                />
                <StatCard
                    label="Messages Received"
                    value={stats.messages}
                    icon={<Mail />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TodayClassesTable classes={todayClasses} />
                <StatisticsChart data={chartData} />
            </div>

            <RecentSubmissionsTable rows={submissions} />
        </div>
    );
}
