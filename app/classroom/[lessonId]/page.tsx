"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageCircle, X, Send } from "lucide-react";

// Zoom Video SDK must be loaded client-side only
let ZoomVideo: any = null;

type ClassroomState = "loading" | "joining" | "connected" | "error" | "left";
type Message = { sender: string; text: string; time: string };

export default function ClassroomPage() {
  const { lessonId } = useParams() as { lessonId: string };
  const router = useRouter();

  const [state, setState] = useState<ClassroomState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "Sarah Mitchell", text: "Hi! Ready to start? 😊", time: "10:02" },
  ]);
  const [msgInput, setMsgInput] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);

  const clientRef = useRef<any>(null);
  const sessionRef = useRef<any>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const init = useCallback(async () => {
    try {
      setState("joining");

      // Fetch JWT signature from server
      const res = await fetch("/api/zoom/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, role: 0 }), // 0 = student
      });

      if (!res.ok) throw new Error("Failed to get session credentials");
      const { signature, sdkKey, sessionName } = await res.json();

      // Dynamically import Zoom SDK (client-only)
      const ZoomVideoSDK = (await import("@zoom/videosdk")).default;
      ZoomVideo = ZoomVideoSDK;

      const client = ZoomVideo.createClient();
      await client.init("en-US", "CDN");
      clientRef.current = client;

      // Join session
      await client.join(sessionName, signature, "Student", "");

      const stream = client.getMediaStream();
      sessionRef.current = stream;

      // Start local video
      if (localVideoRef.current) {
        await stream.startVideo({ videoElement: localVideoRef.current });
      }
      await stream.startAudio();

      // Track participants
      const peers = client.getAllUser().map((u: any) => u.displayName);
      setParticipants(peers);

      client.on("user-added", () => setParticipants(client.getAllUser().map((u: any) => u.displayName)));
      client.on("user-removed", () => setParticipants(client.getAllUser().map((u: any) => u.displayName)));

      // Render remote video when peer starts
      client.on("peer-video-state-change", async ({ action, userId }: any) => {
        if (action === "Start" && remoteVideoRef.current) {
          await stream.renderVideo(remoteVideoRef.current, userId, 640, 360, 0, 0, 3);
        }
      });

      setState("connected");
    } catch (err: any) {
      console.error("[classroom]", err);
      setError(err?.message ?? "Failed to join classroom");
      setState("error");
    }
  }, [lessonId]);

  useEffect(() => {
    init();
    return () => {
      // Cleanup on unmount
      if (clientRef.current) {
        clientRef.current.leave().catch(() => {});
      }
    };
  }, [init]);

  async function leaveLesson() {
    try {
      if (sessionRef.current) {
        await sessionRef.current.stopVideo();
        await sessionRef.current.stopAudio();
      }
      if (clientRef.current) await clientRef.current.leave();
    } catch (_) {}
    setState("left");
    router.push("/dashboard/student");
  }

  async function toggleMute() {
    if (!sessionRef.current) return;
    if (muted) await sessionRef.current.unmuteAudio();
    else await sessionRef.current.muteAudio();
    setMuted(!muted);
  }

  async function toggleVideo() {
    if (!sessionRef.current) return;
    if (videoOff) await sessionRef.current.startVideo({ videoElement: localVideoRef.current });
    else await sessionRef.current.stopVideo();
    setVideoOff(!videoOff);
  }

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setMessages(prev => [...prev, { sender: "You", text: msgInput.trim(), time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }]);
    setMsgInput("");
  }

  // ── Loading state ──
  if (state === "loading" || state === "joining") return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#3730a3] border-t-transparent rounded-full animate-spin mx-auto"/>
        <p className="text-lg font-medium">{state === "loading" ? "Preparing classroom…" : "Joining lesson…"}</p>
        <p className="text-sm text-slate-400">Setting up your Zoom session</p>
      </div>
    </div>
  );

  // ── Error state ──
  if (state === "error") return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white px-4">
      <div className="text-center max-w-md space-y-4">
        <div className="text-5xl">⚠️</div>
        <h1 className="text-xl font-bold">Couldn&apos;t join classroom</h1>
        <p className="text-slate-400 text-sm">{error}</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={init} className="bg-[#3730a3] text-white">Retry</Button>
          <Button variant="outline" onClick={() => router.push("/dashboard/student")} className="border-white text-white hover:bg-white/10">
            Back to dashboard
          </Button>
        </div>
      </div>
    </div>
  );

  // ── Connected ──
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Top bar */}
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
        <div className="text-white text-sm font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
          Live lesson · {participants.length} participant{participants.length !== 1 ? "s" : ""}
        </div>
        <span className="text-slate-400 text-xs">Lesson ID: {lessonId}</span>
      </div>

      {/* Video area */}
      <div className="flex-1 flex">
        <div className="flex-1 relative bg-slate-900">
          {/* Remote video (tutor) */}
          <video
            ref={remoteVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
          {/* Local video (picture-in-picture) */}
          <div className="absolute bottom-4 right-4 w-36 h-24 rounded-lg overflow-hidden border-2 border-slate-600 bg-slate-800">
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            {videoOff && (
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                <span className="text-white text-xs">Camera off</span>
              </div>
            )}
          </div>
          {/* Placeholder when no remote video */}
          {participants.length < 2 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-white">
                <div className="w-20 h-20 rounded-full bg-[#3730a3] flex items-center justify-center text-4xl font-bold mx-auto mb-3">S</div>
                <p className="text-lg font-medium">Waiting for tutor to join…</p>
              </div>
            </div>
          )}
        </div>

        {/* Chat sidebar */}
        {chatOpen && (
          <div className="w-72 bg-slate-800 flex flex-col border-l border-slate-700">
            <div className="p-3 border-b border-slate-700 flex items-center justify-between">
              <span className="text-white text-sm font-medium">Chat</span>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white"><X size={16}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((m, i) => (
                <div key={i}>
                  <span className="text-xs text-slate-400">{m.sender} · {m.time}</span>
                  <p className="text-white text-sm bg-slate-700 rounded-lg px-3 py-1.5 mt-0.5">{m.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="p-3 border-t border-slate-700 flex gap-2">
              <input
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                placeholder="Type…"
                className="flex-1 bg-slate-700 text-white text-sm rounded-lg px-3 py-2 outline-none placeholder-slate-400"
              />
              <button type="submit" className="text-[#3730a3] hover:text-indigo-400"><Send size={16}/></button>
            </form>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-slate-800 py-4 flex items-center justify-center gap-4">
        <button onClick={toggleMute}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${muted ? "bg-red-600 hover:bg-red-700" : "bg-slate-600 hover:bg-slate-500"}`}>
          {muted ? <MicOff size={20} className="text-white"/> : <Mic size={20} className="text-white"/>}
        </button>
        <button onClick={toggleVideo}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${videoOff ? "bg-red-600 hover:bg-red-700" : "bg-slate-600 hover:bg-slate-500"}`}>
          {videoOff ? <VideoOff size={20} className="text-white"/> : <Video size={20} className="text-white"/>}
        </button>
        <button onClick={() => setChatOpen(!chatOpen)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${chatOpen ? "bg-[#3730a3]" : "bg-slate-600 hover:bg-slate-500"}`}>
          <MessageCircle size={20} className="text-white"/>
        </button>
        <button onClick={leaveLesson}
          className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center">
          <PhoneOff size={20} className="text-white"/>
        </button>
      </div>
    </div>
  );
}
