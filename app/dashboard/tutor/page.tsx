"use client";

import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Video, Star, Send, Calendar, DollarSign, Users, BookOpen } from "lucide-react";

const UPCOMING = [
  { id: "l1", student: "Priya Sharma",  date: "Tue Mar 18, 10:00 IST", duration: 50, type: "Regular", status: "SCHEDULED" },
  { id: "l2", student: "Rahul Gupta",   date: "Thu Mar 20, 15:00 IST", duration: 25, type: "Trial",   status: "SCHEDULED" },
];
const PAST = [
  { id: "l3", student: "Anil Kumar",    date: "Mon Mar 10, 11:00 IST", duration: 50, type: "Regular", status: "COMPLETED", amount: 1200 },
  { id: "l4", student: "Priya Sharma",  date: "Wed Mar 5,  09:00 IST", duration: 50, type: "Regular", status: "COMPLETED", amount: 1200 },
  { id: "l5", student: "Meera Patel",   date: "Fri Feb 28, 14:00 IST", duration: 25, type: "Trial",   status: "COMPLETED", amount:  0 },
];
const CONVERSATIONS = [
  { student: "Priya Sharma",  last: "See you Tuesday!",     time: "2h ago",  unread: 0 },
  { student: "Rahul Gupta",   last: "Can we reschedule?",   time: "5h ago",  unread: 2 },
];
const MESSAGES = [
  { from: "Priya Sharma", text: "Hi Sarah! I have a question about writing task 2.", time: "10:10", mine: false },
  { from: "me",           text: "Of course! What's the question?",                  time: "10:12", mine: true  },
  { from: "Priya Sharma", text: "Is it okay to use first person in academic writing?", time: "10:13", mine: false },
];
const TRANSACTIONS = [
  { date: "Mar 10", student: "Anil Kumar",   gross: 1200, fee: 216, payout:  984, status: "Paid" },
  { date: "Mar 05", student: "Priya Sharma", gross: 1200, fee: 216, payout:  984, status: "Paid" },
  { date: "Feb 28", student: "Meera Patel",  gross:  400, fee:  72, payout:  328, status: "Paid" },
  { date: "Feb 20", student: "Anil Kumar",   gross: 1200, fee: 216, payout:  984, status: "Paid" },
];

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const HOURS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
const DEFAULT_AVAIL = new Set(["Mon-09:00","Mon-10:00","Mon-15:00","Tue-09:00","Tue-10:00","Wed-14:00","Thu-09:00","Fri-09:00","Fri-10:00"]);

function StatusBadge({ s }: { s: string }) {
  const m: Record<string, string> = { SCHEDULED: "bg-blue-100 text-blue-700", COMPLETED: "bg-green-100 text-green-700" };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m[s] ?? "bg-slate-100 text-[#475569]"}`}>{s}</span>;
}

export default function TutorDashboard() {
  const [avail, setAvail] = useState(new Set(DEFAULT_AVAIL));
  const [msgInput, setMsgInput] = useState("");
  const [msgs, setMsgs] = useState(MESSAGES);

  function toggleSlot(day: string, hour: string) {
    const key = `${day}-${hour}`;
    setAvail(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
  }

  function sendMsg(e: React.FormEvent) {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setMsgs(prev => [...prev, { from: "me", text: msgInput.trim(), time: new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}), mine: true }]);
    setMsgInput("");
  }

  const totalGross = TRANSACTIONS.reduce((a, t) => a + t.gross, 0);
  const totalPayout = TRANSACTIONS.reduce((a, t) => a + t.payout, 0);
  const totalFee = TRANSACTIONS.reduce((a, t) => a + t.fee, 0);

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="bg-white border-b border-[#fdf2f8] px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#8774DB]">英語 Eigo</Link>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-100 text-green-700 text-xs">✓ Approved Tutor</Badge>
          <Avatar className="w-8 h-8"><AvatarFallback className="bg-[#8774DB] text-white text-sm">S</AvatarFallback></Avatar>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Tutor Dashboard</h1>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6 bg-slate-100 flex-wrap h-auto gap-1">
            {["overview","lessons","availability","earnings","messages","profile"].map(t => (
              <TabsTrigger key={t} value={t} className="capitalize">{t}</TabsTrigger>
            ))}
          </TabsList>

          {/* ── Overview ── */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: DollarSign, label: "This month",      value: "₹2,400",  sub: "earned" },
                { icon: BookOpen,   label: "Lessons",         value: "2,840",   sub: "total" },
                { icon: Users,      label: "Active students", value: "14",      sub: "this month" },
                { icon: Star,       label: "Avg rating",      value: "4.98",    sub: "from 312 reviews" },
              ].map(({ icon: Icon, label, value, sub }) => (
                <Card key={label} className="border border-[#fdf2f8]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} className="text-[#8774DB]"/>
                      <span className="text-xs text-[#64748b]">{label}</span>
                    </div>
                    <div className="font-bold text-lg text-[#0f172a]">{value}</div>
                    <div className="text-xs text-slate-400">{sub}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border border-[#fdf2f8]">
              <CardHeader className="pb-2"><CardTitle className="text-base">Next lesson</CardTitle></CardHeader>
              <CardContent className="p-4">
                {UPCOMING[0] ? (
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <div className="font-semibold text-slate-800">{UPCOMING[0].student}</div>
                      <div className="text-sm text-[#64748b] mt-1"><Calendar size={12} className="inline mr-1"/>{UPCOMING[0].date} · {UPCOMING[0].duration} min</div>
                    </div>
                    <Link href={`/classroom/${UPCOMING[0].id}`}>
                      <Button className="bg-[#8774DB] text-white flex items-center gap-2">
                        <Video size={15}/> Start lesson
                      </Button>
                    </Link>
                  </div>
                ) : <p className="text-[#64748b] text-sm">No upcoming lessons.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Lessons ── */}
          <TabsContent value="lessons" className="space-y-6">
            <div>
              <h2 className="font-semibold text-slate-800 mb-3">Upcoming</h2>
              <div className="space-y-3">
                {UPCOMING.map(l => (
                  <Card key={l.id} className="border border-[#fdf2f8]">
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-800">{l.student}</span>
                          <StatusBadge s={l.status}/>
                          <Badge variant="secondary" className="text-xs">{l.type}</Badge>
                        </div>
                        <div className="text-sm text-[#64748b] mt-1"><Calendar size={12} className="inline mr-1"/>{l.date} · {l.duration} min</div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/classroom/${l.id}`}>
                          <Button size="sm" className="bg-[#8774DB] text-white"><Video size={13} className="mr-1"/>Start</Button>
                        </Link>
                        <Button size="sm" variant="outline" className="text-xs">Mark no-show</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 mb-3">Past lessons</h2>
              <div className="space-y-3">
                {PAST.map(l => (
                  <Card key={l.id} className="border border-[#fdf2f8]">
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-800">{l.student}</span>
                          <StatusBadge s={l.status}/>
                        </div>
                        <div className="text-sm text-[#64748b] mt-1"><Calendar size={12} className="inline mr-1"/>{l.date}</div>
                      </div>
                      <span className="font-semibold text-[#8774DB]">₹{l.amount.toLocaleString()}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ── Availability ── */}
          <TabsContent value="availability">
            <div className="space-y-4">
              <p className="text-sm text-[#64748b]">Click slots to toggle availability. Blue = available.</p>
              <div className="overflow-x-auto">
                <table className="border-collapse text-xs">
                  <thead>
                    <tr>
                      <th className="w-16 text-left text-slate-400 font-normal pb-2 pr-2">Time</th>
                      {DAYS.map(d => <th key={d} className="text-center text-[#475569] font-medium pb-2 px-2 w-16">{d}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {HOURS.map(h => (
                      <tr key={h}>
                        <td className="text-slate-400 py-0.5 pr-2 whitespace-nowrap">{h}</td>
                        {DAYS.map(d => {
                          const on = avail.has(`${d}-${h}`);
                          return (
                            <td key={d} className="px-2 py-0.5 text-center">
                              <button onClick={() => toggleSlot(d, h)}
                                className={`w-12 h-6 rounded transition-colors text-[10px] font-medium ${on ? "bg-[#8774DB] text-white" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>
                                {on ? "Open" : ""}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button className="bg-[#8774DB] text-white" onClick={() => alert("Availability saved! (TODO: sync to DB)")}>
                Save availability
              </Button>
            </div>
          </TabsContent>

          {/* ── Earnings ── */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Gross earned",    value: `₹${totalGross.toLocaleString()}` },
                { label: "Platform fee (18%)", value: `₹${totalFee.toLocaleString()}`, sub: "deducted" },
                { label: "Net payout",      value: `₹${totalPayout.toLocaleString()}`, highlight: true },
              ].map(({ label, value, sub, highlight }) => (
                <Card key={label} className="border border-[#fdf2f8]">
                  <CardContent className="p-4">
                    <div className="text-xs text-[#64748b] mb-1">{label}</div>
                    <div className={`text-xl font-bold ${highlight ? "text-[#8774DB]" : "text-slate-800"}`}>{value}</div>
                    {sub && <div className="text-xs text-slate-400">{sub}</div>}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-semibold text-amber-800">💳 Razorpay payouts</p>
                <p className="text-sm text-amber-700">UPI / bank transfer payouts coming soon. Connect your Razorpay account to receive earnings.</p>
              </div>
              <Button onClick={() => alert("Razorpay Route payouts — coming soon!")} variant="outline" className="border-amber-400 text-amber-700 hover:bg-amber-100">
                Connect Razorpay
              </Button>
            </div>

            <div>
              <h2 className="font-semibold text-slate-800 mb-3">Transaction history</h2>
              <div className="rounded-xl border border-[#fdf2f8] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#fafafa]">
                      <TableHead>Date</TableHead><TableHead>Student</TableHead>
                      <TableHead className="text-right">Gross</TableHead>
                      <TableHead className="text-right">Platform fee</TableHead>
                      <TableHead className="text-right">Your payout</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TRANSACTIONS.map((t, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-[#64748b] text-sm">{t.date}</TableCell>
                        <TableCell className="font-medium text-sm">{t.student}</TableCell>
                        <TableCell className="text-right text-sm">₹{t.gross}</TableCell>
                        <TableCell className="text-right text-sm text-red-500">-₹{t.fee}</TableCell>
                        <TableCell className="text-right text-sm font-semibold text-[#8774DB]">₹{t.payout}</TableCell>
                        <TableCell><Badge className="bg-green-100 text-green-700 text-xs">{t.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* ── Messages ── */}
          <TabsContent value="messages">
            <div className="flex flex-col sm:flex-row border border-[#fce7f3] rounded-xl overflow-hidden h-auto sm:h-[520px] bg-white">
              <div className="w-60 border-r border-[#fdf2f8] flex flex-col flex-shrink-0">
                <div className="p-3 border-b border-[#fdf2f8] font-semibold text-slate-700 text-sm">Students</div>
                {CONVERSATIONS.map((c, i) => (
                  <div key={c.student} className={`p-3 cursor-pointer hover:bg-[#fafafa] flex items-start gap-2 ${i === 0 ? "bg-[#fce7f3]" : ""}`}>
                    <Avatar className="w-8 h-8 flex-shrink-0"><AvatarFallback className="bg-[#8774DB] text-white text-xs">{c.student.charAt(0)}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800 truncate">{c.student}</span>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <div className="text-xs text-[#64748b] truncate">{c.last}</div>
                    </div>
                    {c.unread > 0 && <span className="w-4 h-4 rounded-full bg-[#8774DB] text-white text-[9px] flex items-center justify-center">{c.unread}</span>}
                  </div>
                ))}
              </div>
              <div className="flex-1 flex flex-col">
                <div className="p-3 border-b border-[#fdf2f8] font-semibold text-slate-800 text-sm">Priya Sharma</div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {msgs.map((m, i) => (
                    <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs px-3 py-2 rounded-xl text-sm ${m.mine ? "bg-[#8774DB] text-white" : "bg-slate-100 text-slate-800"}`}>
                        <p>{m.text}</p>
                        <p className={`text-[10px] mt-1 ${m.mine ? "text-pink-200" : "text-slate-400"}`}>{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMsg} className="p-3 border-t border-[#fdf2f8] flex gap-2">
                  <Input value={msgInput} onChange={e => setMsgInput(e.target.value)} placeholder="Type a message…" className="flex-1 text-sm"/>
                  <Button size="sm" type="submit" className="bg-[#8774DB] text-white"><Send size={14}/></Button>
                </form>
              </div>
            </div>
          </TabsContent>

          {/* ── Profile ── */}
          <TabsContent value="profile">
            <Card className="border border-[#fdf2f8] max-w-2xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-slate-800">Edit tutor profile</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Display name</Label><Input defaultValue="Sarah Mitchell" className="mt-1"/></div>
                  <div><Label>Tagline</Label><Input defaultValue="Business English & IELTS specialist" className="mt-1"/></div>
                  <div><Label>Hourly rate (₹)</Label><Input type="number" defaultValue="1200" className="mt-1"/></div>
                  <div><Label>Trial rate</Label><Input type="text" defaultValue="FREE" disabled className="mt-1"/></div>
                  <div><Label>Years of experience</Label><Input type="number" defaultValue="8" className="mt-1"/></div>
                  <div><Label>Response time (hours)</Label><Input type="number" defaultValue="1" className="mt-1"/></div>
                </div>
                <div><Label>Bio</Label><Textarea defaultValue="Hi! I'm Sarah, a native English teacher from New York..." className="mt-1 min-h-[120px]"/></div>
                <div><Label>Specialties (comma-separated)</Label><Input defaultValue="Business, IELTS, Conversation, Writing" className="mt-1"/></div>
                <div><Label>Certifications (comma-separated)</Label><Input defaultValue="CELTA, TESOL" className="mt-1"/></div>
                <div><Label>Video intro URL</Label><Input placeholder="https://youtube.com/…" className="mt-1"/></div>
                <Button className="bg-[#8774DB] text-white">Save profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
