"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// TODO: replace with real DB query
const STUDENTS = [
  { name:"Priya Sharma",   email:"priya@ex.com",   lessons:12, joined:"Jan 2026", status:"active"    },
  { name:"Rahul Gupta",    email:"rahul@ex.com",   lessons:4,  joined:"Feb 2026", status:"active"    },
  { name:"Anika Patel",    email:"anika@ex.com",   lessons:8,  joined:"Jan 2026", status:"active"    },
  { name:"Anil Kumar",     email:"anil@ex.com",    lessons:2,  joined:"Mar 2026", status:"active"    },
  { name:"Meera Patel",    email:"meera@ex.com",   lessons:1,  joined:"Mar 2026", status:"active"    },
  { name:"Deepak Singh",   email:"deepak@ex.com",  lessons:0,  joined:"Mar 2026", status:"suspended" },
];

export default function AdminStudentsPage() {
  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Student Management</h1>
      <div className="flex gap-3 mb-6">
        <Input placeholder="Search students…" className="max-w-xs"/>
      </div>
      <div className="rounded-xl border border-slate-100 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Student</TableHead><TableHead>Lessons booked</TableHead>
              <TableHead>Joined</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STUDENTS.map(s => (
              <TableRow key={s.email}>
                <TableCell>
                  <div className="font-medium text-sm">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.email}</div>
                </TableCell>
                <TableCell className="text-sm text-slate-600">{s.lessons}</TableCell>
                <TableCell className="text-sm text-slate-500">{s.joined}</TableCell>
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
