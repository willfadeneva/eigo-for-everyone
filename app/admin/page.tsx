import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, GraduationCap, BookOpen, TrendingUp, AlertCircle } from "lucide-react";

// TODO: replace with real DB queries
const STATS = [
  { label: "Total users",        value: "1,284", change: "+32 this week",      icon: Users,        color: "text-blue-600"   },
  { label: "Active tutors",      value: "89",    change: "4 pending approval", icon: GraduationCap,color: "text-indigo-600" },
  { label: "Lessons this month", value: "312",   change: "+18% vs last month", icon: BookOpen,     color: "text-green-600"  },
  { label: "Revenue (demo)",     value: "₹2.4L", change: "+₹38k this week",   icon: TrendingUp,   color: "text-amber-600"  },
];

const RECENT_SIGNUPS = [
  { name: "Ananya Bose",   email: "ananya@example.com",   role: "STUDENT", joined: "Mar 16" },
  { name: "Vikram Singh",  email: "vikram@example.com",   role: "TUTOR",   joined: "Mar 16" },
  { name: "Sneha Pillai",  email: "sneha@example.com",    role: "STUDENT", joined: "Mar 15" },
  { name: "Carlos Rivera", email: "carlos@example.com",   role: "TUTOR",   joined: "Mar 15" },
  { name: "Divya Menon",   email: "divya@example.com",    role: "STUDENT", joined: "Mar 14" },
];

const PENDING_TUTORS = [
  { name: "Vikram Singh",  tagline: "Corporate trainer · 10yr exp", submitted: "Mar 16" },
  { name: "Carlos Rivera", tagline: "IELTS 9.0 · Native speaker",   submitted: "Mar 15" },
  { name: "Hana Watanabe", tagline: "Kids English specialist",       submitted: "Mar 14" },
  { name: "Marco Patel",   tagline: "Cambridge English trainer",     submitted: "Mar 13" },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard</h1>
        <p className="text-[#64748b] text-sm mt-1">Eigo for Everyone — Admin overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, change, icon: Icon, color }) => (
          <Card key={label} className="border border-[#fdf2f8]">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className={color}/>
                <span className="text-xs text-[#64748b]">{label}</span>
              </div>
              <div className="text-2xl font-bold text-[#0f172a]">{value}</div>
              <div className="text-xs text-slate-400 mt-1">{change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending approvals */}
        <Card className="border border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-amber-800">
              <AlertCircle size={16}/> Pending Tutor Approvals ({PENDING_TUTORS.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              {PENDING_TUTORS.map(t => (
                <div key={t.name} className="flex items-center justify-between bg-white rounded-lg p-3 border border-amber-100">
                  <div>
                    <div className="font-medium text-sm text-slate-800">{t.name}</div>
                    <div className="text-xs text-[#64748b]">{t.tagline}</div>
                    <div className="text-xs text-slate-400">Submitted {t.submitted}</div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link href={`/admin/tutors/${encodeURIComponent(t.name.toLowerCase().replace(/ /g,"-"))}`}>
                      <Button size="sm" className="bg-[#C76FD8] text-white text-xs h-7">Review</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent signups */}
        <Card className="border border-[#fdf2f8]">
          <CardHeader className="pb-2"><CardTitle className="text-base">Recent signups</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#fafafa]">
                  <TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_SIGNUPS.map(u => (
                  <TableRow key={u.email}>
                    <TableCell>
                      <div className="font-medium text-sm">{u.name}</div>
                      <div className="text-xs text-slate-400">{u.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={u.role === "TUTOR" ? "bg-[#fce7f3] text-[#C76FD8] text-xs" : "bg-slate-100 text-[#475569] text-xs"}>
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#64748b] text-sm">{u.joined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
