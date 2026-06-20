"use client";
//use client for working in client components

import { useState } from "react";
import Link from "next/link";

export default function StudyForm() {
  const [plan, setPlan] = useState("");

  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [examDate, setExamDate] = useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, topics, examDate }),
    });

    const data = await response.json();
    setPlan(data.plan);

    setLoading(false);
  };

  return (
    //form
    <form
      className="w-full max-w-2xl mt-7 mb-7 p-12 border rounded-2xl shadow-lg flex flex-col gap-5 bg-white text-black"
      onSubmit={handleSubmit}
    >
        <div className="flex flex-row  justify-between">

      <h1 className="text-3xl font-bold mb-7">PrepWise AI</h1>
      <Link href="/plans">
        <button className="bg-[#df7] p-4 cursor-pointer rounded-2xl">View all plans</button>
      </Link>
        </div>

      <input
        type="text"
        placeholder="Subject"
        className="border rounded-lg p-4"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        placeholder="topics"
        className="h-30 border rounded-lg p-4"
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
      />

      <input
        type="date"
        className="border rounded-lg p-4"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
      />
      <button
        className="mt-5 mb-5 text-xl bg-[#D4AF37] p-4 cursor-pointer border-none rounded-full"
        type="submit"
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>
      {plan && (
        <div>
            <div className="border-2 black mb-5"></div>
          <h2>Generated Plan</h2>
          <div>
          <pre className="whitespace-pre-wrap">{plan}</pre>

          </div>
        </div>
      )}
    </form>
  );
}
