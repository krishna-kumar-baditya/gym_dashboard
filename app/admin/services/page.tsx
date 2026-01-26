"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import AddServiceForm from "@/features/services/AddServiceForm";
import EditServiceForm from "@/features/services/EditServiceForm";
import { deleteService, getServices } from "@/features/services/services.service";
import { deleteServiceImage } from "@/features/services/deleteServiceImage";
import { Service } from "@/features/services/services.types";

export default function ServicesPage() {
  /* ===================== STATE ===================== */
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  /* ===================== FETCH ===================== */
  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data ?? []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  /* ===================== FILTER ===================== */
  const filteredServices = useMemo(() => {
    if (!search.trim()) return services;

    const q = search.toLowerCase();
    return services.filter(
      (service) =>
        service.title.toLowerCase().includes(q) ||
        service.category?.toLowerCase().includes(q)
    );
  }, [services, search]);

  /* Reset page on search or pageSize change */
  useEffect(() => {
    setPage(1);
  }, [search, pageSize]);

  /* ===================== PAGINATION ===================== */
  const totalItems = filteredServices.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedServices = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredServices.slice(start, start + pageSize);
  }, [filteredServices, page, pageSize]);

  /* ===================== DELETE ===================== */
  const handleDelete = useCallback(
    async (service: Service) => {
      const confirmed = window.confirm(
        `Delete "${service.title}" service?`
      );
      if (!confirmed) return;

      /* Optimistic UI update */
      setServices((prev) => prev.filter((s) => s.id !== service.id));

      try {
        if (service.image_url) {
          await deleteServiceImage(service.image_url);
        }

        await deleteService(service.id);
      } catch (error) {
        console.error("Failed to delete service:", error);
        alert("Failed to delete service. Please refresh.");

        /* Rollback on failure */
        fetchServices();
      }
    },
    [fetchServices]
  );

  /* ===================== UI ===================== */
  return (
    <div className="p-6 text-slate-200">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Services</h1>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      {/* Card */}
      <div className="rounded-xl bg-slate-900/70 shadow-lg backdrop-blur">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
          <h2 className="text-lg font-medium">Services</h2>

          <input
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md bg-slate-800 px-3 py-2 text-sm outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-left text-slate-400">
                <th className="px-5 py-3">Image</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-6 text-center">
                    Loading services...
                  </td>
                </tr>
              ) : paginatedServices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-6 text-center">
                    No services found
                  </td>
                </tr>
              ) : (
                paginatedServices.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-slate-800 hover:bg-slate-800/50"
                  >
                    <td className="px-5 py-4">
                      <img
                        src={service.image_url || "/placeholder.png"}
                        className="h-10 w-10 rounded-md object-cover"
                        alt={service.title}
                      />
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {service.title}
                    </td>

                    <td className="px-5 py-4">
                      {service.category || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-md px-3 py-1 text-xs ${
                          service.is_active
                            ? "bg-green-600/20 text-green-400"
                            : "bg-slate-600/20 text-slate-400"
                        }`}
                      >
                        {service.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            setOpenEdit(true);
                          }}
                          className="rounded-md bg-blue-600/20 px-3 py-1 text-xs text-blue-400 hover:bg-blue-600/30"
                        >
                          ✏ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service)}
                          className="rounded-md bg-red-600/20 px-3 py-1 text-xs text-red-400 hover:bg-red-600/30"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            Rows per page:
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="rounded-md bg-slate-800 px-2 py-1 text-slate-200"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span>
              {totalItems === 0
                ? "0"
                : `${(page - 1) * pageSize + 1}-${Math.min(
                    page * pageSize,
                    totalItems
                  )}`}{" "}
              of {totalItems}
            </span>

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-md bg-slate-800 px-2 py-1 hover:bg-slate-700 disabled:opacity-40"
            >
              ‹
            </button>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md bg-slate-800 px-2 py-1 hover:bg-slate-700 disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* ADD MODAL */}
      <AddServiceForm
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
          fetchServices();
        }}
      />

      {/* EDIT MODAL */}
      <EditServiceForm
        open={openEdit}
        service={selectedService}
        onClose={() => {
          setOpenEdit(false);
          setSelectedService(null);
          fetchServices();
        }}
      />
    </div>
  );
}
