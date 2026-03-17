"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";

// TODO: fetch real tutor by id from Prisma
const MOCK = {
  name: "Vikram Singh", email: "vikram@example.com", status: "pending",
  tagline: "Corporate trainer · 10yr exp", bio: "10 years of corporate English training. CELTA certified.",
  specialties: ["Business","Presentations","Grammar"], certifications: ["CELTA"],
  hourlyRate: 1500, trialRate: 500, yearsExperience: 10,
  submittedAt: "Mar 16, 2026",
};

export default function AdminTutorDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [status, setStatus] = useState(MOCK.status);
  const [dialog, setDialog] = useState<"approve"|"reject"|null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAction(action: "approve"|"reject") {
    setLoading(true);
    try {
      await fetch(`/api/admin/tutors/${id}/${action}`, { method: "PATCH" });
      setStatus(action === "approve" ? "approved" : "rejected");
    } catch (e) {
      alert("Action failed — check server logs");
    }
    setLoading(false);
    setDialog(null);
  }

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <Link href="/admin/tutors" className="flex items-center gap-1 text-sm text-[#8774DB] hover:underline">
        <ArrowLeft size={14}/> Back to tutors
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">{MOCK.name}</h1>
          <p className="text-[#64748b] text-sm">{MOCK.email}</p>
        </div>
        <Badge className={{ approved:"bg-green-100 text-green-700", pending:"bg-amber-100 text-amber-700", rejected:"bg-red-100 text-red-700" }[status] + " capitalize"}>
          {status}
        </Badge>
      </div>

      <Card className="border border-[#fdf2f8]">
        <CardContent className="p-5 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              ["Tagline", MOCK.tagline], ["Bio", MOCK.bio],
              ["Hourly rate", `₹${MOCK.hourlyRate}`], ["Trial rate", `₹${MOCK.trialRate}`],
              ["Experience", `${MOCK.yearsExperience} years`], ["Submitted", MOCK.submittedAt],
            ].map(([k,v]) => (
              <div key={k}><span className="text-slate-400 text-xs uppercase tracking-wide">{k}</span><p className="mt-0.5 text-slate-800">{v}</p></div>
            ))}
          </div>
          <div>
            <span className="text-slate-400 text-xs uppercase tracking-wide">Specialties</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {MOCK.specialties.map(s => <Badge key={s} className="bg-[#fce7f3] text-[#8774DB] text-xs">{s}</Badge>)}
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-xs uppercase tracking-wide">Certifications</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {MOCK.certifications.map(c => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
            </div>
          </div>
        </CardContent>
      </Card>

      {status === "pending" && (
        <div className="flex gap-3">
          <Button onClick={() => setDialog("approve")} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
            <CheckCircle size={15}/> Approve tutor
          </Button>
          <Button onClick={() => setDialog("reject")} variant="outline" className="border-red-400 text-red-600 hover:bg-red-50 flex items-center gap-2">
            <XCircle size={15}/> Reject
          </Button>
        </div>
      )}

      <Dialog open={!!dialog} onOpenChange={() => setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialog === "approve" ? "Approve tutor?" : "Reject tutor?"}</DialogTitle>
            <DialogDescription>
              {dialog === "approve"
                ? `${MOCK.name} will be approved and their profile will go live. An approval email will be sent.`
                : `${MOCK.name} will be rejected. They will be notified by email.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialog(null)}>Cancel</Button>
            <Button disabled={loading}
              className={dialog === "approve" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}
              onClick={() => dialog && handleAction(dialog)}>
              {loading ? "Processing…" : dialog === "approve" ? "Yes, approve" : "Yes, reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
