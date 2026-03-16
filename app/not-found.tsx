import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#3730a3] mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
        <p className="text-slate-500 mb-8">The page you&apos;re looking for doesn&apos;t exist. Maybe you took a wrong turn?</p>
        <div className="flex gap-3 justify-center">
          <Link href="/"><Button className="bg-[#3730a3] text-white">Go home</Button></Link>
          <Link href="/tutors"><Button variant="outline">Browse tutors</Button></Link>
        </div>
      </div>
    </div>
  );
}
