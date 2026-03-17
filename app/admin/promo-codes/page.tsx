"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type PromoCode = { code: string; discount: number; maxUses: number | null; used: number; validUntil: string | null; active: boolean };

const INIT: PromoCode[] = [
  { code:"WELCOME20",  discount:20, maxUses:500,  used:134, validUntil:"2026-06-30", active:true  },
  { code:"TRIAL50",    discount:50, maxUses:200,  used:200, validUntil:"2026-03-31", active:false },
  { code:"EIGO10",     discount:10, maxUses:null, used:42,  validUntil:null,         active:true  },
  { code:"IELTS25",    discount:25, maxUses:300,  used:88,  validUntil:"2026-05-31", active:true  },
  { code:"BUSINESS15", discount:15, maxUses:null, used:17,  validUntil:null,         active:true  },
  { code:"KIDS30",     discount:30, maxUses:150,  used:63,  validUntil:"2026-04-30", active:true  },
  { code:"HOLI2026",   discount:40, maxUses:100,  used:100, validUntil:"2026-03-17", active:false },
  { code:"NEWUSER",    discount:20, maxUses:null, used:289, validUntil:"2026-12-31", active:true  },
  { code:"REFER50",    discount:50, maxUses:null, used:31,  validUntil:null,         active:true  },
];

export default function PromoCodesPage() {
  const [codes, setCodes] = useState<PromoCode[]>(INIT);
  const [form, setForm] = useState({ code:"", discount:"", maxUses:"", validUntil:"" });

  function addCode(e: React.FormEvent) {
    e.preventDefault();
    setCodes(prev => [...prev, {
      code: form.code.toUpperCase(),
      discount: Number(form.discount),
      maxUses: form.maxUses ? Number(form.maxUses) : null,
      used: 0,
      validUntil: form.validUntil || null,
      active: true,
    }]);
    setForm({ code:"", discount:"", maxUses:"", validUntil:"" });
  }

  function toggle(code: string) {
    setCodes(prev => prev.map(c => c.code === code ? { ...c, active: !c.active } : c));
  }

  return (
    <div className="p-6 max-w-5xl space-y-8">
      <h1 className="text-2xl font-bold text-[#0f172a]">Promo Codes</h1>

      {/* Create form */}
      <Card className="border border-[#fdf2f8]">
        <CardContent className="p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Create promo code</h2>
          <form onSubmit={addCode} className="grid sm:grid-cols-4 gap-3 items-end">
            <div><Label className="text-xs">Code</Label><Input value={form.code} onChange={e => setForm({...form, code:e.target.value})} placeholder="SUMMER25" className="mt-1 uppercase" required/></div>
            <div><Label className="text-xs">Discount %</Label><Input type="number" value={form.discount} onChange={e => setForm({...form, discount:e.target.value})} placeholder="20" min={1} max={100} className="mt-1" required/></div>
            <div><Label className="text-xs">Max uses (blank = unlimited)</Label><Input type="number" value={form.maxUses} onChange={e => setForm({...form, maxUses:e.target.value})} placeholder="500" className="mt-1"/></div>
            <div><Label className="text-xs">Valid until</Label><Input type="date" value={form.validUntil} onChange={e => setForm({...form, validUntil:e.target.value})} className="mt-1"/></div>
            <Button type="submit" className="bg-[#D946EF] text-white sm:col-span-4 sm:w-fit">Create code</Button>
          </form>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="rounded-xl border border-[#fdf2f8] overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#fafafa]">
              <TableHead>Code</TableHead><TableHead>Discount</TableHead>
              <TableHead>Usage</TableHead><TableHead>Valid until</TableHead>
              <TableHead>Status</TableHead><TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {codes.map(c => (
              <TableRow key={c.code}>
                <TableCell className="font-mono font-semibold text-[#D946EF]">{c.code}</TableCell>
                <TableCell className="font-medium">{c.discount}% off</TableCell>
                <TableCell className="text-sm text-[#475569]">
                  {c.used}{c.maxUses ? ` / ${c.maxUses}` : ""}
                  {c.maxUses && c.used >= c.maxUses && <span className="ml-1 text-red-500 text-xs">exhausted</span>}
                </TableCell>
                <TableCell className="text-sm text-[#64748b]">{c.validUntil ?? "No expiry"}</TableCell>
                <TableCell>
                  <Badge className={c.active ? "bg-green-100 text-green-700 text-xs" : "bg-slate-100 text-[#64748b] text-xs"}>
                    {c.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => toggle(c.code)}>
                    {c.active ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
