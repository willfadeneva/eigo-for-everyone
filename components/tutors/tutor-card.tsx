import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, BookOpen } from "lucide-react";

interface TutorCardProps {
  id: string;
  displayName: string;
  tagline?: string | null;
  avatarUrl?: string | null;
  hourlyRate: number | string;
  currency?: string;
  avgRating?: number | null;
  totalReviews?: number;
  totalLessons?: number;
  specialties?: string[];
  isFeatured?: boolean;
  responseTimeHours?: number | null;
}

export function TutorCard({
  id,
  displayName,
  tagline,
  avatarUrl,
  hourlyRate,
  currency = "INR",
  avgRating,
  totalReviews = 0,
  totalLessons = 0,
  specialties = [],
  isFeatured = false,
  responseTimeHours,
}: TutorCardProps) {
  const rateDisplay =
    currency === "INR"
      ? `₹${Number(hourlyRate).toLocaleString("en-IN")}`
      : currency === "JPY"
      ? `¥${Number(hourlyRate).toLocaleString()}`
      : `₹${Number(hourlyRate).toLocaleString("en-IN")}`;

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 border border-slate-100 overflow-hidden">
      {isFeatured && (
        <div className="bg-[#f9a8d4] text-[#831843] text-xs font-semibold px-3 py-1 text-center">
          ⭐ Featured Tutor
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#e0e7ff]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#3730a3] flex items-center justify-center text-white text-xl font-bold border-2 border-[#e0e7ff]">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-slate-900 truncate">{displayName}</h3>
                {tagline && (
                  <p className="text-sm text-slate-500 line-clamp-2 mt-0.5">{tagline}</p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-[#3730a3] text-lg">{rateDisplay}</div>
                <div className="text-xs text-slate-400">/ 50min</div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs sm:text-sm text-slate-500">
              {avgRating != null && (
                <span className="flex items-center gap-1">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="font-medium text-slate-700">{avgRating.toFixed(1)}</span>
                  <span>({totalReviews})</span>
                </span>
              )}
              {totalLessons > 0 && (
                <span className="flex items-center gap-1">
                  <BookOpen size={13} />
                  {totalLessons.toLocaleString()} lessons
                </span>
              )}
              {responseTimeHours != null && (
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {responseTimeHours}h reply
                </span>
              )}
            </div>

            {/* Specialties */}
            {specialties.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {specialties.slice(0, 3).map((s) => (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="text-xs capitalize bg-[#eef2ff] text-[#3730a3] hover:bg-[#e0e7ff]"
                  >
                    {s}
                  </Badge>
                ))}
                {specialties.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-500">
                    +{specialties.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/tutors/${id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-[#3730a3] text-[#3730a3] hover:bg-[#eef2ff]"
            >
              View Profile
            </Button>
          </Link>
          <Link href={`/tutors/${id}?book=true`} className="flex-1">
            <Button className="w-full bg-[#3730a3] hover:bg-[#312e81] text-white">
              Book Trial
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
