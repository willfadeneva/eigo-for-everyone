"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// TODO: replace with real DB query
const STUDENTS = [
  { name:"Priya Sharma",    email:"priya.sharma@gmail.com",   lessons:14, spent:16800, joined:"Jan 2026",  status:"active"    },
  { name:"Rahul Gupta",     email:"rahul.gupta@outlook.com",  lessons:6,  spent:7200,  joined:"Feb 2026",  status:"active"    },
  { name:"Anika Patel",     email:"anika.patel@yahoo.com",    lessons:9,  spent:8100,  joined:"Jan 2026",  status:"active"    },
  { name:"Suresh Kumar",    email:"suresh.k@gmail.com",       lessons:3,  spent:3900,  joined:"Feb 2026",  status:"active"    },
  { name:"Meera Nair",      email:"meera.nair@gmail.com",     lessons:2,  spent:2200,  joined:"Mar 2026",  status:"active"    },
  { name:"Karan Mehta",     email:"karan.mehta@hotmail.com",  lessons:5,  spent:6000,  joined:"Feb 2026",  status:"active"    },
  { name:"Divya Reddy",     email:"divya.reddy@gmail.com",    lessons:11, spent:9350,  joined:"Dec 2025",  status:"active"    },
  { name:"Aman Joshi",      email:"aman.joshi@gmail.com",     lessons:4,  spent:7200,  joined:"Mar 2026",  status:"active"    },
  { name:"Vikram Singh",    email:"vikram.s@gmail.com",       lessons:1,  spent:0,     joined:"Mar 2026",  status:"active"    },
  { name:"Sneha Pillai",    email:"sneha.pillai@gmail.com",   lessons:7,  spent:9800,  joined:"Jan 2026",  status:"active"    },
  { name:"Rohit Verma",     email:"rohit.verma@gmail.com",    lessons:0,  spent:0,     joined:"Mar 2026",  status:"active"    },
  { name:"Deepak Singh",    email:"deepak.singh@yahoo.com",   lessons:0,  spent:0,     joined:"Mar 2026",  status:"suspended" },
  { name:"Ananya Bose",     email:"ananya.bose@gmail.com",    lessons:1,  spent:0,     joined:"Mar 2026",  status:"active"    },
  { name:"Ishaan Kapoor",   email:"ishaan.k@gmail.com",       lessons:22, spent:26400, joined:"Oct 2025",  status:"active"    },
  { name:"Pooja Krishnan",  email:"pooja.k@gmail.com",        lessons:8,  spent:7200,  joined:"Jan 2026",  status:"active"    },
];

export default function AdminStudentsPage() {
  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-[#1e1b4b] mb-6">Student Management</h1>
      <div className="flex gap-3 mb-6">
        <Input placeholder="Search students…" className="max-w-xs"/>
      </div>
      <div className="rounded-xl border border-[#f0ebff] overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#faf8ff]">
              <TableHead>Student</TableHead><TableHead>Lessons</TableHead>
              <TableHead>Total Spent</TableHead><TableHead>Joined</TableHead>
              <TableHead>Status</TableHead><TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STUDENTS.map(s => (
              <TableRow key={s.email}>
                <TableCell>
                  <div className="font-medium text-sm">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.email}</div>
                </TableCell>
                <TableCell className="text-sm text-[#5b5389]">{s.lessons}</TableCell>
                <TableCell className="text-sm font-medium text-[#6366f1]">{s.spent > 0 ? `₹${s.spent.toLocaleString("en-IN")}` : "—"}</TableCell>
                <TableCell className="text-sm text-[#7c6f9e]">{s.joined}</TableCell>
                <TableCell>
                  <Badge className={s.status === "active" ? "bg-green-100 text-green-700 text-xs" : "bg-red-100 text-red-700 text-xs"}>
                    {s.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline" className="text-xs h-7">View</Button>
                    <Button size="sm" variant="outline"
                      className={`text-xs h-7 ${s.status === "active" ? "border-red-300 text-red-600 hover:bg-red-50" : "border-green-300 text-green-600 hover:bg-green-50"}`}
                      onClick={() => alert(`${s.status === "active" ? "Suspend" : "Restore"} ${s.name}`)}>
                      {s.status === "active" ? "Suspend" : "Restore"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
