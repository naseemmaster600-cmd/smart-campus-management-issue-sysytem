"use client";

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";

type Issue = {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  priority: string;
  status: string;
};

const STORAGE_KEY = "smart-campus-issues";

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

type Action =
  | {
      type: "load";
      data: Issue[];
    }
  | {
      type: "add";
      data: Issue;
    };

function issueReducer(
  state: Issue[],
  action: Action
): Issue[] {
  if (action.type === "load") {
    return action.data;
  }

  if (action.type === "add") {
    return [action.data, ...state];
  }

  return state;
}

export default function Home() {
  const [issues, dispatch] = useReducer(
    issueReducer,
    defaultIssues
  );

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(
        STORAGE_KEY
      );

      if (saved) {
        const data = JSON.parse(saved);

        if (Array.isArray(data)) {
          dispatch({
            type: "load",
            data: data as Issue[],
          });
        }
      }
    } catch {
      console.log("Could not load issues.");
    }
  }, []);

  function submitIssue() {
    if (
      title.trim() === "" ||
      category === "" ||
      location.trim() === "" ||
      description.trim() === "" ||
      priority === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newIssue: Issue = {
      id: Date.now(),
      title: title.trim(),
      category,
      location: location.trim(),
      description: description.trim(),
      priority,
      status: "Pending",
    };

    const updatedIssues = [
      newIssue,
      ...issues,
    ];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedIssues)
    );

    dispatch({
      type: "add",
      data: newIssue,
    });

    setTitle("");
    setCategory("");
    setLocation("");
    setDescription("");
    setPriority("");
    setShowForm(false);

    alert("Issue reported successfully!");
  }

  const totalIssues = issues.length;

  const pendingIssues = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  const progressIssues = issues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const resolvedIssues = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              Smart Campus
            </h1>

            <p className="text-sm text-slate-500">
              Issue Management System
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              href="/admin"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700"
            >
              Admin Dashboard
            </Link>

            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              + Report Issue
            </button>

          </div>

        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">

        <div className="rounded-2xl bg-blue-600 p-8 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">
            CAMPUS SUPPORT
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Make your campus better.
          </h2>

          <p className="mt-3 max-w-2xl text-blue-100">
            Report campus problems quickly and track their
            resolution in one place.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 rounded-lg bg-white px-5 py-3 font-semibold text-blue-600"
          >
            Report an Issue
          </button>

        </div>

      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-8 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Total Issues"
          value={totalIssues}
        />

        <StatCard
          title="Pending"
          value={pendingIssues}
        />

        <StatCard
          title="In Progress"
          value={progressIssues}
        />

        <StatCard
          title="Resolved"
          value={resolvedIssues}
        />

      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">

            <h3 className="text-xl font-bold">
              Recent Issues
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Latest problems reported by students
            </p>

          </div>

          <div className="divide-y divide-slate-200">

            {issues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
              />
            ))}

          </div>

        </div>

      </section>

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mb-6 flex items-start justify-between">

              <div>
                <h3 className="text-xl font-bold">
                  Report an Issue
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Tell us what needs to be fixed.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="text-2xl font-bold text-slate-400"
              >
                ×
              </button>

            </div>

            <div className="space-y-4">

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Issue Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Example: Wi-Fi not working"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Classroom">
                    Classroom
                  </option>

                  <option value="Hostel">
                    Hostel
                  </option>

                  <option value="Wi-Fi">
                    Wi-Fi
                  </option>

                  <option value="Electricity">
                    Electricity
                  </option>

                  <option value="Water">
                    Water
                  </option>

                  <option value="Cleanliness">
                    Cleanliness
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="Example: Block A, Room 204"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe the problem..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
                >
                  <option value="">
                    Select priority
                  </option>

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>
                </select>
              </div>

              <button
                onClick={submitIssue}
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white"
              >
                Submit Issue
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}

function IssueCard({
  issue,
}: {
  issue: Issue;
}) {
  let statusClass =
    "bg-yellow-100 text-yellow-700";

  if (issue.status === "In Progress") {
    statusClass =
      "bg-blue-100 text-blue-700";
  }

  if (issue.status === "Resolved") {
    statusClass =
      "bg-green-100 text-green-700";
  }

  let priorityClass = "text-green-600";

  if (issue.priority === "Medium") {
    priorityClass = "text-orange-600";
  }

  if (issue.priority === "High") {
    priorityClass = "text-red-600";
  }

  return (
    <div className="px-6 py-5">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h4 className="font-semibold">
              {issue.title}
            </h4>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
            >
              {issue.status}
            </span>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            {issue.category} • {issue.location}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            {issue.description}
          </p>

          <p
            className={`mt-2 text-xs font-bold ${priorityClass}`}
          >
            {issue.priority} Priority
          </p>

        </div>

      </div>

    </div>
  );
}