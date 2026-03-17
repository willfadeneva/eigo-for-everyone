"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

type Lesson = {
  id: string; student: string; tutor: string; type: string;
  duration: number; date: string; status: string; amount: number;
};

const MOCK_LESSONS: Lesson[] = [
  { id:"L001", student:"Priya Sharma",    tutor:"Sarah Mitchell",  type:"Regular", duration:50, date:"Mon Mar 17, 10:00 IST", status:"SCHEDULED",  amount:1200 },
  { id:"L002", student:"Rahul Gupta",     tutor:"James O'Brien",   type:"Trial",   duration:25, date:"Mon Mar 17, 11:00 IST", status:"SCHEDULED",  amount:0    },
  { id:"L003", student:"Anika Patel",     tutor:"Emily Chen",      type:"Regular", duration:50, date:"Tue Mar 18, 14:00 IST", status:"SCHEDULED",  amount:900  },
  { id:"L004", student:"Suresh Kumar",    tutor:"Tom Nakamura",    type:"Extended",duration:80, date:"Tue Mar 18, 09:00 IST", status:"SCHEDULED",  amount:1950 },
  { id:"L005", student:"Meera Nair",      tutor:"Priya Williams",  type:"Regular", duration:50, date:"Wed Mar 19, 16:00 IST", status:"SCHEDULED",  amount:1100 },
  { id:"L006", student:"Karan Mehta",     tutor:"Sarah Mitchell",  type:"Trial",   duration:25, date:"Wed Mar 19, 10:00 IST", status:"SCHEDULED",  amount:0    },
  { id:"L007", student:"Divya Reddy",     tutor:"David Thompson",  type:"Regular", duration:50, date:"Thu Mar 20, 15:00 IST", status:"SCHEDULED",  amount:800  },
  { id:"L008", student:"Aman Joshi",      tutor:"Michael Ross",    type:"Regular", duration:50, date:"Thu Mar 20, 18:00 IST", status:"SCHEDULED",  amount:1800 },
  { id:"L009", student:"Priya Sharma",    tutor:"Sarah Mitchell",  type:"Regular", duration:50, date:"Mon Mar 10, 10:00 IST", status:"COMPLETED",  amount:1200 },
  { id:"L010", student:"Rahul Gupta",     tutor:"James O'Brien",   type:"Regular", duration:50, date:"Tue Mar 11, 11:00 IST", status:"COMPLETED",  amount:1400 },
  { id:"L011", student:"Anika Patel",     tutor:"Emily Chen",      type:"Regular", duration:50, date:"Wed Mar 12, 14:00 IST", status:"COMPLETED",  amount:900  },
  { id:"L012", student:"Suresh Kumar",    tutor:"Tom Nakamura",    type:"Regular", duration:50, date:"Fri Mar 14, 09:00 IST", status:"COMPLETED",  amount:1300 },
  { id:"L013", student:"Meera Nair",      tutor:"Anna Kowalski",   type:"Trial",   duration:25, date:"Sat Mar 15, 11:00 IST", status:"COMPLETED",  amount:0    },
  { id:"L014", student:"Karan Mehta",     tutor:"Lisa Fernandez",  type:"Regular", duration:50, date:"Sun Mar 16, 10:00 IST", status:"COMPLETED",  amount:850  },
  { id:"L015", student:"Vikram Singh",    tutor:"Sarah Mitchell",  type:"Trial",   duration:25, date:"Sun Mar 16, 15:00 IST", status:"CANCELLED",  amount:0    },
  { id:"L016", student:"Sneha Pillai",    tutor:"James O'Brien",   type:"Regular", duration:50, date:"Fri Mar 14, 12:00 IST", status:"CANCELLED",  amount:1400 },
  { id:"L017", student:"Divya Reddy",     tutor:"Emily Chen",      type:"Extended",duration:80, date:"Mon Mar 10, 16:00 IST", status:"COMPLETED",  amount:1350 },
  { id:"L018", student:"Aman Joshi",      tutor:"David Thompson",  type:"Regular", duration:50, date:"Thu Mar 13, 09:00 IST", status:"COMPLETED",  amount:800  },
];

const STATUS_COLORS: Record<string, string> = {
  SCHEDULED: "bg-blue-100 text-blue-700",
  COMPLETED:  "bg-green-100 text-green-700",
  CANCELLED:  "bg-red-100 text-red-700",
};

const TYPE_COLORS: Record<string, string> = {
  Trial:    "bg-pink-100 text-pink-700",
  Regular:  "bg-indigo-100 text-indigo-700",
  Extended: "bg-purple-100 text-purple-700",
};

export default function LessonsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const lessons = MOCK_LESSONS.filter(l => {
    const matchStatus = filter === "all" || l.status === filter;
    const matchSearch = !search ||
      l.student.toLowerCase().includes(search.toLowerCase()) ||
      l.tutor.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const total = MOCK_LESSONS.length;
  const scheduled = MOCK_LESSONS.filter(l => l.status === "SCHEDULED").length;
  const completed = MOCK_LESSONS.filter(l => l.status === "COMPLETED").length;
  const cancelled = MOCK_LESSONS.filter(l => l.status === "CANCELLED").length;
  const revenue = MOCK_LESSONS.filter(l => l.status === "COMPLETED").reduce((s, l) => s + l.amount, 0);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl">
      <h1 className="text-2xl font-bold text-[#0f172a]">Lessons</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total",      value: total,                  color: "text-slate-700"  },
          { label: "Scheduled",  value: scheduled,              color: "text-blue-600"   },
          { label: "Completed",  value: completed,              color: "text-green-600"  },
          { label: "Revenue",    value: `₹${revenue.toLocaleString("en-IN")}`, color: "text-indigo-600" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#fdf2f8] rounded-xl p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-[#64748b] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15}/>
          <Input placeholder="Search by student, tutor, or lesson ID…" className="pl-9"
            value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Filter status"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#fdf2f8] overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#fafafa]">
              <TableHead className="text-xs">ID</TableHead>
              <TableHead className="text-xs">Student</TableHead>
              <TableHead className="text-xs">Tutor</TableHead>
              <TableHead className="text-xs">Type</TableHead>
              <TableHead className="text-xs">Date & Time (IST)</TableHead>
              <TableHead className="text-xs">Duration</TableHead>
              <TableHead className="text-xs">Amount</TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map(l => (
              <TableRow key={l.id} className="text-sm">
                <TableCell className="font-mono text-xs text-slate-400">{l.id}</TableCell>
                <TableCell className="font-medium text-slate-800">{l.student}</TableCell>
                <TableCell className="text-[#475569]">{l.tutor}</TableCell>
                <TableCell>
                  <Badge className={`text-xs ${TYPE_COLORS[l.type] ?? ""}`}>{l.type}</Badge>
                </TableCell>
                <TableCell className="text-[#64748b] text-xs whitespace-nowrap">{l.date}</TableCell>
                <TableCell className="text-[#64748b]">{l.duration} min</TableCell>
                <TableCell className="font-medium text-[#D946EF]">
                  {l.amount === 0 ? <span className="text-pink-600 font-semibold">FREE</span> : `₹${l.amount.toLocaleString("en-IN")}`}
                </TableCell>
                <TableCell>
                  <Badge className={`text-xs ${STATUS_COLORS[l.status] ?? ""}`}>{l.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
            {lessons.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center text-slate-400 py-10">No lessons found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-slate-400">Showing {lessons.length} of {total} lessons</p>
    </div>
  );
}
