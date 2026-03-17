import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fdf8ff] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#6366f1] mb-4">404</div>
        <h1 className="text-2xl font-bold text-[#1e1b4b] mb-2">Page not found</h1>
        <p className="text-[#7c6f9e] mb-8">The page you&apos;re looking for doesn&apos;t exist. Maybe you took a wrong turn?</p>
        <div className="flex gap-3 justify-center">
          <Link href="/"><Button className="bg-[#818cf8] text-white">Go home</Button></Link>
          <Link href="/tutors"><Button variant="outline">Browse tutors</Button></Link>
        </div>
      </div>
    </div>
  );
}
