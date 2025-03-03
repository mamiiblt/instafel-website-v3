"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { LoadingBar } from "@/components/ifl";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Calendar, Search, User } from "lucide-react";

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

function FlagListPageContent() {
  const router = useRouter();

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") ?? "0";
  const [pageNumber, setPageNumber] = useState(
    parseInt(searchParams.get("page") ?? "0")
  );
  const filterAuthorName = searchParams.get("flName") ?? "";
  const filterByName = searchParams.get("flByName") ?? false;
  const filterSearchData = searchParams.get("flSearch") ?? "";
  const [searchQuery, setSearchQuery] = useState(filterSearchData);
  const [selectedUser, setSelectedUser] = useState(filterAuthorName);

  useEffect(() => {
    if (selectedUser) {
      reRoute();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (pageNumber) {
      reRoute();
    }
  }, [pageNumber]);

  const response = {
    manifest_version: 1,
    info: {
      page_size: 5,
      total_flag_size: 512,
      authors_of_all_flags: ["mamiiblt", "ahmetk", "ayses", "mehmetc"],
    },
    flags: [
      {
        id: 1,
        name: "Example Flag 1",
        fnames: "igd_launcher_config",
        adder: "mamiiblt",
        adate: "20.16.2036",
      },
      {
        id: 2,
        name: "Example Flag 2",
        fnames: "igd_prim_launcher_config",
        adder: "mamiiblt",
        adate: "20.16.2036",
      },
      {
        id: 3,
        name: "Example Flag 3",
        fnames: "igd_sec_launcher_config",
        adder: "ahmetk",
        adate: "19.16.2036",
      },
      {
        id: 4,
        name: "Example Flag 4",
        fnames: "igd_auth_config",
        adder: "mehmetc",
        adate: "18.16.2036",
      },
      {
        id: 5,
        name: "Example Flag 5",
        fnames: "igd_user_config",
        adder: "ayses",
        adate: "17.16.2036",
      },
      {
        id: 6,
        name: "Example Flag 6",
        fnames: "igd_system_config",
        adder: "mamiiblt",
        adate: "16.16.2036",
      },
    ],
  };

  const reRoute = () => {
    var url = `/flags?category=${categoryId}&page=${pageNumber}`;

    if (selectedUser.trim() != "" && selectedUser != "empty") {
      url = url + `&flName=${selectedUser}`;
    }

    if (searchQuery.toString() != "") {
      url = url + `&flSearch=${encodeURIComponent(searchQuery)}`;
    }

    router.push(url);
  };

  const searchEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      reRoute();
    }
  };

  return (
    <div>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/5 text-sm mb-6"
            >
              <span className="flex items-center gap-1.5">
                Instafel Flag Library
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-5xl font-bold tracking-tight mb-4"
            >
              {categories[categoryId]}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center gap-3 text-muted-foreground"
            >
              <div className="h-[1px] w-10" />
              {parseInt(categoryId) !== 0 ? (
                <p className="text-lg">
                  There are a total of
                  <span className="font-semibold text-gray-900">
                    {" " + response.info.total_flag_size + " "}
                  </span>
                  flags in this category.
                </p>
              ) : (
                <p className="text-lg">
                  There are a total of
                  <span className="font-semibold text-gray-900">
                    {" " + response.info.total_flag_size + " "}
                  </span>
                  in flag library.
                </p>
              )}
              <div className="h-[1px] w-10" />
            </motion.div>
          </div>

          <div className="mb-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="flex gap-4"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search in category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={searchEvent}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                onClick={reRoute}
                className="px-3 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
              >
                <Search className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="flex gap-4 items-center"
            >
              <div className="relative">
                <select
                  value={selectedUser || "empty"}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="appearance-none pl-8 pr-2 py-2 rounded-lg border border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none text-sm font-medium bg-white text-gray-700"
                >
                  <option value="empty">All Users</option>
                  {response.info.authors_of_all_flags.map((user, index) => (
                    <option key={index} value={user}>
                      {user}
                    </option>
                  ))}
                </select>

                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>
          </div>

          <div className="grid gap-4 mb-6">
            {response.flags.map((flag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6 + index * 0.2,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                onMouseEnter={() => setHoveredId(index)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
              >
                {" "}
                <div
                  className={`
            relative overflow-hidden bg-white rounded-xl border border-gray-200
            transition-all duration-300
            ${hoveredId === index ? "shadow-lg scale-[1.01]" : "hover:shadow"}
          `}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {flag.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            Added by {flag.adder}
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {flag.adate}
                          </div>
                        </div>
                      </div>

                      <button
                        className={`
                    p-2 rounded-lg text-gray-400
                    transition-all duration-300 ease-in-out
                    hover:text-gray-900 hover:bg-gray-100
                    ${hoveredId === flag.id ? "opacity-100" : "opacity-0"}
                  `}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div
                    className={`
                absolute inset-0 
                bg-gradient-to-tr from-gray-100/0 via-gray-100/0 to-gray-100/50
                transition-opacity duration-300
                ${hoveredId === flag.id ? "opacity-100" : "opacity-0"}
              `}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center border-t border-gray-200 pt-4">
            <div className="flex gap-2">
              <button
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={pageNumber === 1}
                className={`
                  p-2 rounded-lg border text-sm font-medium
                  ${
                    pageNumber === 1
                      ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              {[...Array(response.info.page_size)].map((_, i) => (
                <button
                  onClick={() => setPageNumber(i + 1)}
                  key={i + 1}
                  className={`
                    w-10 h-10 rounded-lg border text-sm font-medium
                    transition-colors
                    ${
                      pageNumber === i + 1
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={pageNumber === response.info.page_size}
                className={`
                  p-2 rounded-lg border text-sm font-medium
                  ${
                    pageNumber === response.info.page_size
                      ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
