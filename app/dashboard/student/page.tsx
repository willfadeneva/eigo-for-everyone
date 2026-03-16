"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TutorCard } from "@/components/tutors/tutor-card";
import { Calendar, BookOpen, Clock, Video, Star, Send } from "lucide-react";

const UPCOMING = [
  { id: "l1", tutor: "Sarah Mitchell", date: "Tue Mar 18, 10:00 IST", duration: 50, type: "Regular", status: "SCHEDULED" },
  { id: "l2", tutor: "Emily Chen",     date: "Thu Mar 20, 15:00 IST", duration: 25, type: "Trial",   status: "SCHEDULED" },
];
const PAST = [
  { id: "l3", tutor: "James O'Brien",  date: "Mon Mar 10, 11:00 IST", duration: 50, type: "Regular", status: "COMPLETED", reviewed: false },
  { id: "l4", tutor: "Sarah Mitchell", date: "Wed Mar 5,  09:00 IST", duration: 50, type: "Regular", status: "COMPLETED", reviewed: true  },
];
const RECOMMENDED = [
  { id: "t4", displayName: "David Thompson",  tagline: "Spoken English · Accent reduction",  hourlyRate: 800,  avgRating: 4.88, totalReviews: 98,  totalLessons: 820,  specialties: ["Conversation","Pronunciation"], currency: "INR" },
  { id: "t8", displayName: "Tom Nakamura",    tagline: "TOEFL 118 · Test prep specialist",  hourlyRate: 1300, avgRating: 4.96, totalReviews: 201, totalLessons: 1750, specialties: ["TOEFL","Academic","IELTS"],     currency: "INR" },
  { id: "t9", displayName: "Lisa Fernandez",  tagline: "Fun conversational English",         hourlyRate: 850,  avgRating: 4.90, totalReviews: 118, totalLessons: 980,  specialties: ["Conversation","Kids","Speaking"],currency: "INR" },
];
const CONVERSATIONS = [
  { tutor: "Sarah Mitchell", last: "See you Tuesday!", time: "2h ago",   unread: 0 },
  { tutor: "Emily Chen",     last: "Great lesson today!", time: "1d ago", unread: 1 },
];
const MESSAGES = [
  { from: "Sarah Mitchell", text: "Hi! Looking forward to our session on Tuesday.",    time: "Yesterday 14:20", mine: false },
  { from: "me",             text: "Me too! I have some questions about IELTS writing.", time: "Yesterday 14:35", mine: true  },
  { from: "Sarah Mitchell", text: "Perfect, we can definitely cover that. See you Tuesday!", time: "Yesterday 14:38", mine: false },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    SCHEDULED: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status] ?? "bg-slate-100 text-slate-600"}`}>{status}</span>;
}

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#3730a3]">英語 Eigo</Link>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8"><AvatarFallback className="bg-[#3730a3] text-white text-sm">P</AvatarFallback></Avatar>
          <span className="text-sm font-medium text-slate-700 hidden sm:block">Priya Sharma</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Student Dashboard</h1>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lessons">My Lessons</TabsTrigger>
            <TabsTrigger value="tutors">Find Tutors</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* ── Overview ── */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: BookOpen,  label: "Lessons completed", value: "12" },
                { icon: Clock,     label: "Hours learned",     value: "9.5h" },
                { icon: Star,      label: "Tutors tried",      value: "3" },
              ].map(({ icon: Icon, label, value }) => (
                <Card key={label} className="border border-slate-100">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#eef2ff] flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#3730a3]" />
                    </div>
                    <div><div className="font-bold text-slate-900">{value}</div><div className="text-xs text-slate-500">{label}</div></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border border-slate-100">
              <CardHeader className="pb-2"><CardTitle className="text-base">Next lesson</CardTitle></CardHeader>
              <CardContent className="p-4">
                {UPCOMING[0] ? (
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <div className="font-semibold text-slate-800">{UPCOMING[0].tutor}</div>
                      <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <Calendar size={13}/> {UPCOMING[0].date} · {UPCOMING[0].duration} min
                      </div>
                    </div>
                    <Link href={`/classroom/${UPCOMING[0].id}`}>
                      <Button className="bg-[#3730a3] text-white flex items-center gap-2">
                        <Video size={15}/> Join lesson
                      </Button>
                    </Link>
                  </div>
                ) : <p className="text-slate-500 text-sm">No upcoming lessons. <Link href="/tutors" className="text-[#3730a3] underline">Find a tutor</Link>.</p>}
              </CardContent>
            </Card>

            <div>
              <h2 className="font-semibold text-slate-800 mb-4">Recommended for you</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {RECOMMENDED.map(t => <TutorCard key={t.id} {...t} />)}
              </div>
            </div>
          </TabsContent>

          {/* ── My Lessons ── */}
          <TabsContent value="lessons" className="space-y-6">
            <div>
              <h2 className="font-semibold text-slate-800 mb-3">Upcoming</h2>
              <div className="space-y-3">
                {UPCOMING.map(l => (
                  <Card key={l.id} className="border border-slate-100">
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-800">{l.tutor}</span>
                          <StatusBadge status={l.status} />
                          <Badge variant="secondary" className="text-xs">{l.type}</Badge>
                        </div>
                        <div className="text-sm text-slate-500 mt-1"><Calendar size={12} className="inline mr-1"/>{l.date} · {l.duration} min</div>
                      </div>
                      <Link href={`/classroom/${l.id}`}>
                        <Button size="sm" className="bg-[#3730a3] text-white"><Video size={13} className="mr-1"/>Join</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 mb-3">Past lessons</h2>
              <div className="space-y-3">
                {PAST.map(l => (
                  <Card key={l.id} className="border border-slate-100">
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-800">{l.tutor}</span>
                          <StatusBadge status={l.status} />
                        </div>
                        <div className="text-sm text-slate-500 mt-1"><Calendar size={12} className="inline mr-1"/>{l.date} · {l.duration} min</div>
                      </div>
                      {!l.reviewed ? (
                        <Button size="sm" variant="outline" className="border-[#3730a3] text-[#3730a3]">
                          <Star size={13} className="mr-1"/>Leave review
                        </Button>
                      ) : <span className="text-xs text-green-600 font-medium">✓ Reviewed</span>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ── Find Tutors ── */}
          <TabsContent value="tutors">
            <div className="mb-4 flex gap-3">
              <Input placeholder="Search tutors…" className="max-w-sm"/>
              <Link href="/tutors"><Button className="bg-[#3730a3] text-white">Browse all</Button></Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RECOMMENDED.map(t => <TutorCard key={t.id} {...t} />)}
            </div>
          </TabsContent>

          {/* ── Messages ── */}
          <TabsContent value="messages">
            <div className="flex border border-slate-200 rounded-xl overflow-hidden h-[520px] bg-white">
              {/* Sidebar */}
              <div className="w-60 border-r border-slate-100 flex flex-col flex-shrink-0">
                <div className="p-3 border-b border-slate-100 font-semibold text-slate-700 text-sm">Conversations</div>
                {CONVERSATIONS.map((c, i) => (
                  <div key={c.tutor} className={`p-3 cursor-pointer hover:bg-slate-50 flex items-start gap-2 ${i === 0 ? "bg-[#eef2ff]" : ""}`}>
                    <Avatar className="w-8 h-8 flex-shrink-0"><AvatarFallback className="bg-[#3730a3] text-white text-xs">{c.tutor.charAt(0)}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800 truncate">{c.tutor}</span>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <div className="text-xs text-slate-500 truncate">{c.last}</div>
                    </div>
                    {c.unread > 0 && <span className="w-4 h-4 rounded-full bg-[#3730a3] text-white text-[9px] flex items-center justify-center">{c.unread}</span>}
                  </div>
                ))}
              </div>
              {/* Thread */}
              <div className="flex-1 flex flex-col">
                <div className="p-3 border-b border-slate-100 font-semibold text-slate-800 text-sm">Sarah Mitchell</div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {MESSAGES.map((m, i) => (
                    <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs px-3 py-2 rounded-xl text-sm ${m.mine ? "bg-[#3730a3] text-white" : "bg-slate-100 text-slate-800"}`}>
                        <p>{m.text}</p>
                        <p className={`text-[10px] mt-1 ${m.mine ? "text-indigo-200" : "text-slate-400"}`}>{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-100 flex gap-2">
                  <Input placeholder="Type a message…" className="flex-1 text-sm"/>
                  <Button size="sm" className="bg-[#3730a3] text-white"><Send size={14}/></Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── Settings ── */}
          <TabsContent value="settings">
            <Card className="border border-slate-100 max-w-lg">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-slate-800">Profile settings</h2>
                <div className="space-y-3">
                  <div><Label>Full name</Label><Input defaultValue="Priya Sharma" className="mt-1"/></div>
                  <div><Label>Email</Label><Input defaultValue="priya@example.com" type="email" className="mt-1"/></div>
                  <div><Label>Timezone</Label><Input defaultValue="Asia/Kolkata" className="mt-1"/></div>
                  <div><Label>Avatar URL</Label><Input placeholder="https://…" className="mt-1"/></div>
                </div>
                <Button className="bg-[#3730a3] text-white">Save changes</Button>
                <hr className="border-slate-100"/>
                <h3 className="font-semibold text-slate-700 text-sm">Change password</h3>
                <div className="space-y-2">
                  <div><Label>Current password</Label><Input type="password" className="mt-1"/></div>
                  <div><Label>New password</Label><Input type="password" className="mt-1"/></div>
                </div>
                <Button variant="outline" className="border-[#3730a3] text-[#3730a3]">Update password</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
