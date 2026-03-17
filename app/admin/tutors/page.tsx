"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";

const ALL_TUTORS = [
  { id:"t1", name:"Sarah Mitchell",  email:"sarah@ex.com",   status:"approved", rating:4.98, lessons:2840, joined:"Jan 2024" },
  { id:"t2", name:"James O'Brien",   email:"james@ex.com",   status:"approved", rating:4.95, lessons:1560, joined:"Mar 2024" },
  { id:"t3", name:"Emily Chen",      email:"emily@ex.com",   status:"approved", rating:4.99, lessons:3200, joined:"Feb 2024" },
  { id:"p1", name:"Vikram Singh",    email:"vikram@ex.com",  status:"pending",  rating:null, lessons:0,    joined:"Mar 2026" },
  { id:"p2", name:"Carlos Rivera",   email:"carlos@ex.com",  status:"pending",  rating:null, lessons:0,    joined:"Mar 2026" },
  { id:"p3", name:"Hana Watanabe",   email:"hana@ex.com",    status:"pending",  rating:null, lessons:0,    joined:"Mar 2026" },
  { id:"r1", name:"Mark Deleted",    email:"mark@ex.com",    status:"rejected", rating:null, lessons:0,    joined:"Feb 2026" },
];

export default function AdminTutorsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_TUTORS.filter(t =>
    (filter === "all" || t.status === filter) &&
    (search === "" || t.name.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-[#1e1b4b] mb-6">Tutor Management</h1>

      <div className="flex gap-3 mb-6 flex-wrap">
        <Input placeholder="Search name, email…" className="max-w-xs" value={search} onChange={e => setSearch(e.target.value)}/>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue/></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tutors</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-[#f0ebff] overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#faf8ff]">
              <TableHead>Tutor</TableHead><TableHead>Status</TableHead>
              <TableHead>Rating</TableHead><TableHead>Lessons</TableHead>
              <TableHead>Joined</TableHead><TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(t => (
              <TableRow key={t.id}>
                <TableCell>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.email}</div>
                </TableCell>
                <TableCell>
                  <Badge className={{
                    approved:"bg-green-100 text-green-700",
                    pending: "bg-amber-100 text-amber-700",
                    rejected:"bg-red-100 text-red-700",
                  }[t.status] + " text-xs capitalize"}>{t.status}</Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {t.rating ? <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400"/>{t.rating}</span> : <span className="text-slate-300">—</span>}
                </TableCell>
                <TableCell className="text-sm text-[#5b5389]">{t.lessons.toLocaleString()}</TableCell>
                <TableCell className="text-sm text-[#7c6f9e]">{t.joined}</TableCell>
                <TableCell>
                  <div className="flex gap-1.5 flex-wrap">
                    <Link href={`/admin/tutors/${t.id}`}>
                      <Button size="sm" variant="outline" className="text-xs h-7">View</Button>
                    </Link>
                    {t.status === "pending" && <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs h-7"
                        onClick={() => alert(`Approve ${t.name} — TODO: call /api/admin/tutors/${t.id}/approve`)}>
                        Approve
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs h-7"
                        onClick={() => alert(`Reject ${t.name}`)}>
                        Reject
                      </Button>
                    </>}
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
