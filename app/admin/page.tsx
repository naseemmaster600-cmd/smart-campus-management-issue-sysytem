"use client";

import Link from "next/link";
import { useState } from "react";

type Issue = {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  priority: string;
  status: string;
};

const defaultIssues: Issue[] = [
  {
    id: 1,
    title: "Wi-Fi not working",
    category: "Wi-Fi",
    location: "Block A",
    description: "Internet connection is not working.",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Classroom fan not working",
    category: "Electricity",
    location: "Room 204",
    description: "The classroom fan is not working.",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    title: "Water leakage",
    category: "Water",
    location: "Hostel Block",
    description: "Water leakage near the washroom.",
    priority: "High",
    status: "Resolved",
  },
];

export default function AdminPage() {
  const [issues, setIssues] = useState<Issue[]>(defaultIssues);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  function loadIssues() {
    const saved = localStorage.getItem("smart-campus-issues");

    if (!saved) {
      alert("No student issues found.");
      return;
    }

    try {
      const data = JSON.parse(saved);

      if (Array.isArray(data)) {
        setIssues(data);
        alert("Issues loaded successfully!");
      }
    } catch {
      alert("Could not load issues.");
    }
  }

  function changeStatus(id: number, status: string) {
    const updated = issues.map((issue) => {
      if (issue.id === id) {
        return {
          ...issue,
          status: status,
        };
      }

      return issue;
    });

    setIssues(updated);

    localStorage.setItem(
      "smart-campus-issues",
      JSON.stringify(updated)
    );
  }

  const filteredIssues = issues.filter((issue) => {
    const text = search.toLowerCase();

    const matchesSearch =
      issue.title.toLowerCase().includes(text) ||
      issue.category.toLowerCase().includes(text) ||
      issue.location.toLowerCase().includes(text);

    const matchesFilter =
      filter === "All" || issue.status === filter;

    return matchesSearch && matchesFilter;
  });

  const total = issues.length;

  const pending = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  const progress = issues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const resolved = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  return (
    <main className="min-h-screen bg-slate-100">

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Admin Dashboard
            </h1>

            <p className="text-sm text-slate-500">
              Smart Campus Issue Management
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700"
            >
              Student Portal
            </Link>

            <button
              onClick={loadIssues}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
            >
              Load Student Issues
            </button>

          </div>

        </div>
      </header>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Issues
          </p>
          <p className="mt-2 text-3xl font-bold">
            {total}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>
          <p className="mt-2 text-3xl font-bold">
            {pending}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            In Progress
          </p>
          <p className="mt-2 text-3xl font-bold">
            {progress}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Resolved
          </p>
          <p className="mt-2 text-3xl font-bold">
            {resolved}
          </p>
        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b p-6">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Campus Issues
                </h2>

                <p className="text-sm text-slate-500">
                  View and manage student complaints
                </p>
              </div>

              <div className="flex gap-3">

                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="rounded-lg border px-4 py-2 outline-none"
                />

                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value)
                  }
                  className="rounded-lg border bg-white px-4 py-2"
                >
                  <option value="All">
                    All
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>
                </select>

              </div>

            </div>

          </div>

          <div>

            {filteredIssues.length === 0 ? (

              <div className="p-10 text-center text-slate-500">
                No issues found.
              </div>

            ) : (

              filteredIssues.map((issue) => (

                <div
                  key={issue.id}
                  className="border-b p-6"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-lg font-bold">
                          {issue.title}
                        </h3>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                          {issue.status}
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {issue.category} • {issue.location}
                      </p>

                      <p className="mt-2 text-sm text-slate-700">
                        {issue.description}
                      </p>

                      <p className="mt-2 text-sm font-bold">
                        {issue.priority} Priority
                      </p>

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-semibold">
                        Change Status
                      </label>

                      <select
                        value={issue.status}
                        onChange={(e) =>
                          changeStatus(
                            issue.id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border bg-white px-4 py-3"
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>

                      </select>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </section>

    </main>
  );
}