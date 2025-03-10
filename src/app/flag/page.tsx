"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";
import { LoadingBar, LoadingBarNotCenter } from "@/components/ifl";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  Delete,
  Flag,
  IdCard,
  Search,
  TagIcon,
  Trash,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FlagListPage() {
  return (
    <Suspense fallback={<LoadingBar />}>
      <FlagListPageContent />
    </Suspense>
  );
}

const categories = [
  "All Flags",
  "Direct",
  "Reels",
  "Stories",
  "Feed",
  "Interface",
  "Notes",
  "Quality",
  "Camera",
  "Call",
  "Fixes",
  "Other",
];

interface Note {
  text: string;
  type: number; // 0 = info ve 1 = warning olabiler
}

interface Flag {
  deneme: string;
}

interface Data {
  id: number;
  name: string;
  fnames: string;
  author: string;
  description: string;
  imgs: string[];
  notes: Note[];
  uncompitable_flags: string[];
  flag_data: Flag[];
  category_id: number;
  addate: string;
  rv: number;
  rv_at: string;
  ad_at: string;
}

interface ResponseScheme {
  manifest_version: number;
  status: string;
  data: Data;
}

function FlagListPageContent() {
  const router = useRouter();

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const flagId = searchParams.get("id") ?? "0";
  const [data, setData] = useState<ResponseScheme | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      var requestUrl = `https://stunning-palm-tree-x4j74qgwjvqh664v-3040.app.github.dev/flag?id=${flagId}`;

      const res = await fetch(requestUrl);
      const result: ResponseScheme = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  const getTypeColor = (type: string) => {
    const colors = {
      c0: "bg-blue-50 text-blue-600 border-blue-100",
      c1: "bg-violet-50 text-violet-600 border-violet-100",
      c2: "bg-emerald-50 text-emerald-600 border-emerald-100",
      c3: "bg-orange-50 text-orange-600 border-orange-100",
      c4: "bg-indigo-50 text-indigo-600 border-indigo-100",
      c5: "bg-rose-50 text-rose-600 border-rose-100",
      c6: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100",
      c7: "bg-amber-50 text-amber-600 border-amber-100",
      c8: "bg-cyan-50 text-cyan-600 border-cyan-100",
      c9: "bg-indigo-50 text-indigo-600 border-indigo-100",
      c10: "bg-emerald-50 text-emerald-600 border-emerald-100",
      c11: "bg-teal-50 text-teal-600 border-teal-100",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-50 text-gray-600 border-gray-100"
    );
  };
  return (
    <AnimatePresence>
      {data ? <div>{data.data.notes[0].text}</div> : <LoadingBar />}
    </AnimatePresence>
  );
}
