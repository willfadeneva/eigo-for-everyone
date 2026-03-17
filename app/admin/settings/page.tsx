"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Save, CheckCircle } from "lucide-react";

const TABS = ["platform", "email", "payment", "seo", "danger"] as const;
type Tab = typeof TABS[number];
const TAB_LABELS: Record<Tab, string> = {
  platform: "Platform",
  email: "Email",
  payment: "Payment",
  seo: "SEO & Meta",
  danger: "⚠️ Danger",
};

function SaveButton({ onClick }: { onClick: () => void }) {
  const [saved, setSaved] = useState(false);
  function handle() {
    setSaved(true);
    onClick();
    setTimeout(() => setSaved(false), 2500);
  }
  return (
    <Button onClick={handle} className="bg-[#38BDF8] hover:bg-[#D946EF] text-white flex items-center gap-2">
      {saved ? <><CheckCircle size={15}/> Saved!</> : <><Save size={15}/> Save changes</>}
    </Button>
  );
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("platform");

  // Platform settings
  const [commission, setCommission] = useState("18");
  const [minRate, setMinRate] = useState("300");
  const [maxRate, setMaxRate] = useState("5000");
  const [trialFree, setTrialFree] = useState(true);
  const [trialDuration, setTrialDuration] = useState("25");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [newRegistrations, setNewRegistrations] = useState(true);
  const [requireApproval, setRequireApproval] = useState(true);

  // Email settings
  const [fromName, setFromName] = useState("Eigo for Everyone");
  const [fromEmail, setFromEmail] = useState("hello@eigo.app");
  const [welcomeEmail, setWelcomeEmail] = useState(true);
  const [lessonReminder, setLessonReminder] = useState(true);
  const [reminderHours, setReminderHours] = useState("24");
  const [reviewRequest, setReviewRequest] = useState(true);

  // Payment settings
  const [payoutCycle, setPayoutCycle] = useState("weekly");
  const [minPayout, setMinPayout] = useState("500");
  const [currency, setCurrency] = useState("INR");
  const [razorpayKey, setRazorpayKey] = useState("rzp_test_••••••••••••");

  // SEO / Meta
  const [siteName, setSiteName] = useState("Eigo for Everyone");
  const [tagline, setTagline] = useState("India's #1 English Tutoring Marketplace");
  const [metaDesc, setMetaDesc] = useState("Book verified native English tutors for IELTS, business English, and more. Trial lesson FREE.");
  const [supportEmail, setSupportEmail] = useState("support@eigo.app");

  return (
    <div className="p-4 sm:p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Settings</h1>
        <p className="text-sm text-[#64748b] mt-1">Manage platform configuration, emails, and payments</p>
      </div>

      <div className="space-y-0">
        {/* Custom tab bar — wraps on mobile */}
        <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl mb-5">
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                t === "danger"
                  ? activeTab === t ? "bg-red-600 text-white" : "text-red-600 hover:bg-red-100"
                  : activeTab === t ? "bg-white text-[#D946EF] shadow-sm" : "text-[#64748b] hover:text-slate-700"
              }`}>
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* ── Platform ── */}
        <div className={activeTab === "platform" ? "space-y-5" : "hidden"}>
          <Card className="border border-[#fdf2f8]">
            <CardHeader className="pb-2"><CardTitle className="text-base">Commission & Pricing</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs">Platform commission (%)</Label>
                  <Input value={commission} onChange={e => setCommission(e.target.value)} className="mt-1" type="number" min={0} max={50}/>
                  <p className="text-xs text-slate-400 mt-1">Currently {commission}% per lesson</p>
                </div>
                <div>
                  <Label className="text-xs">Min tutor rate (₹/50min)</Label>
                  <Input value={minRate} onChange={e => setMinRate(e.target.value)} className="mt-1" type="number"/>
                </div>
                <div>
                  <Label className="text-xs">Max tutor rate (₹/50min)</Label>
                  <Input value={maxRate} onChange={e => setMaxRate(e.target.value)} className="mt-1" type="number"/>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#fdf2f8]">
            <CardHeader className="pb-2"><CardTitle className="text-base">Trial Lessons</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Trial lessons are free</div>
                  <div className="text-xs text-slate-400">Students pay nothing for their first trial lesson</div>
                </div>
                <Switch checked={trialFree} onCheckedChange={setTrialFree}/>
              </div>
              <div>
                <Label className="text-xs">Trial lesson duration (minutes)</Label>
                <Input value={trialDuration} onChange={e => setTrialDuration(e.target.value)} className="mt-1 max-w-xs" type="number"/>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#fdf2f8]">
            <CardHeader className="pb-2"><CardTitle className="text-base">Site Access</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Maintenance mode</div>
                  <div className="text-xs text-slate-400">Show a maintenance page to all visitors</div>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode}/>
              </div>
              <Separator/>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Allow new registrations</div>
                  <div className="text-xs text-slate-400">Let new students and tutors sign up</div>
                </div>
                <Switch checked={newRegistrations} onCheckedChange={setNewRegistrations}/>
              </div>
              <Separator/>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Require tutor approval</div>
                  <div className="text-xs text-slate-400">New tutors must be manually approved before going live</div>
                </div>
                <Switch checked={requireApproval} onCheckedChange={setRequireApproval}/>
              </div>
            </CardContent>
          </Card>

          <SaveButton onClick={() => {}} />
        </div>

        {/* ── Email ── */}
        <div className={activeTab === "email" ? "space-y-5" : "hidden"}>
          <Card className="border border-[#fdf2f8]">
            <CardHeader className="pb-2"><CardTitle className="text-base">Email Identity</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">From name</Label>
                  <Input value={fromName} onChange={e => setFromName(e.target.value)} className="mt-1"/>
                </div>
                <div>
                  <Label className="text-xs">From email</Label>
                  <Input value={fromEmail} onChange={e => setFromEmail(e.target.value)} className="mt-1" type="email"/>
                </div>
              </div>
              <div>
                <Label className="text-xs">Support email</Label>
                <Input value={supportEmail} onChange={e => setSupportEmail(e.target.value)} className="mt-1 max-w-xs" type="email"/>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#64748b] bg-[#fafafa] rounded-lg p-3">
                <Badge className="bg-green-100 text-green-700 text-xs">Resend connected</Badge>
                Emails are sent via Resend API · re_8KP•••••
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#fdf2f8]">
            <CardHeader className="pb-2"><CardTitle className="text-base">Automated Emails</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Welcome email on signup</div>
                  <div className="text-xs text-slate-400">Sent to new students and tutors after registration</div>
                </div>
                <Switch checked={welcomeEmail} onCheckedChange={setWelcomeEmail}/>
              </div>
              <Separator/>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Lesson reminder emails</div>
                  <div className="text-xs text-slate-400">Remind students and tutors before each lesson</div>
                </div>
                <Switch checked={lessonReminder} onCheckedChange={setLessonReminder}/>
              </div>
              {lessonReminder && (
                <div className="pl-4">
                  <Label className="text-xs">Send reminder (hours before lesson)</Label>
                  <Input value={reminderHours} onChange={e => setReminderHours(e.target.value)} className="mt-1 max-w-xs" type="number" min={1} max={72}/>
                </div>
              )}
              <Separator/>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Review request after lesson</div>
                  <div className="text-xs text-slate-400">Ask students to leave a review 1 hour after lesson ends</div>
                </div>
                <Switch checked={reviewRequest} onCheckedChange={setReviewRequest}/>
              </div>
            </CardContent>
          </Card>

          <SaveButton onClick={() => {}} />
        </div>

        {/* ── Payment ── */}
        <div className={activeTab === "payment" ? "space-y-5" : "hidden"}>
          <Card className="border border-[#fdf2f8]">
            <CardHeader className="pb-2"><CardTitle className="text-base">Razorpay Integration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-xs bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800">
                ⚠️ Payment integration is coming soon. Configure keys below for when it goes live.
              </div>
              <div>
                <Label className="text-xs">Razorpay Key ID</Label>
                <Input value={razorpayKey} onChange={e => setRazorpayKey(e.target.value)} className="mt-1 font-mono" placeholder="rzp_live_••••••"/>
                <p className="text-xs text-slate-400 mt-1">Get from dashboard.razorpay.com/app/keys</p>
              </div>
              <div>
                <Label className="text-xs">Razorpay Secret</Label>
                <Input type="password" placeholder="••••••••••••••••" className="mt-1 font-mono"/>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#fdf2f8]">
            <CardHeader className="pb-2"><CardTitle className="text-base">Tutor Payouts</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Payout cycle</Label>
                  <select value={payoutCycle} onChange={e => setPayoutCycle(e.target.value)}
                    className="mt-1 w-full border border-[#fce7f3] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D946EF]">
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Minimum payout (₹)</Label>
                  <Input value={minPayout} onChange={e => setMinPayout(e.target.value)} className="mt-1" type="number"/>
                  <p className="text-xs text-slate-400 mt-1">Tutors need ≥ ₹{minPayout} to request payout</p>
                </div>
              </div>
              <div>
                <Label className="text-xs">Currency</Label>
                <select value={currency} onChange={e => setCurrency(e.target.value)}
                  className="mt-1 w-full border border-[#fce7f3] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D946EF] max-w-xs">
                  <option value="INR">INR — Indian Rupee (₹)</option>
                  <option value="USD">USD — US Dollar ($)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <SaveButton onClick={() => {}} />
        </div>

        {/* ── SEO ── */}
        <div className={activeTab === "seo" ? "space-y-5" : "hidden"}>
          <Card className="border border-[#fdf2f8]">
            <CardHeader className="pb-2"><CardTitle className="text-base">Site Identity</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs">Site name</Label>
                <Input value={siteName} onChange={e => setSiteName(e.target.value)} className="mt-1"/>
              </div>
              <div>
                <Label className="text-xs">Tagline</Label>
                <Input value={tagline} onChange={e => setTagline(e.target.value)} className="mt-1"/>
              </div>
              <div>
                <Label className="text-xs">Meta description</Label>
                <Textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} className="mt-1 min-h-[80px]"/>
                <p className="text-xs text-slate-400 mt-1">{metaDesc.length}/160 characters</p>
              </div>
            </CardContent>
          </Card>

          <SaveButton onClick={() => {}} />
        </div>

        {/* ── Danger Zone ── */}
        <div className={activeTab === "danger" ? "space-y-5" : "hidden"}>
          <Card className="border border-red-200 bg-red-50">
            <CardHeader className="pb-2"><CardTitle className="text-base text-red-700">Danger Zone</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-slate-800">Clear all lesson data</div>
                  <div className="text-xs text-[#64748b]">Permanently delete all lesson records. Cannot be undone.</div>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 shrink-0"
                  onClick={() => alert("This would clear all lesson data — disabled in demo.")}>
                  Clear lessons
                </Button>
              </div>
              <Separator className="bg-red-200"/>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-slate-800">Suspend all new registrations</div>
                  <div className="text-xs text-[#64748b]">Immediately block any new signups from students or tutors.</div>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 shrink-0"
                  onClick={() => setNewRegistrations(false)}>
                  Suspend signups
                </Button>
              </div>
              <Separator className="bg-red-200"/>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-slate-800">Enable maintenance mode</div>
                  <div className="text-xs text-[#64748b]">Take the site offline for all users immediately.</div>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 shrink-0"
                  onClick={() => setMaintenanceMode(true)}>
                  Go offline
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
