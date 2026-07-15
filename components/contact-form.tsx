"use client";

import { useState } from "react";
import { company } from "@/lib/data";

/**
 * Composes a pre-filled email in the visitor's mail client — the site has no
 * form backend yet. Swap the submit handler for a Server Action once one exists.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [topic, setTopic] = useState("General enquiry");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Website] ${topic} — ${name}${org ? `, ${org}` : ""}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${org ? `\n${org}` : ""}`);
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-lg border border-line bg-night px-4 py-3 text-sm text-frost placeholder:text-mist/50 outline-none transition focus:border-signal/60";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-mist">Your name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
            placeholder="Full name"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-mist">Organisation</span>
          <input
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            className={field}
            placeholder="Company / authority"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-mist">Topic</span>
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
          <option>General enquiry</option>
          <option>UTMS platform</option>
          <option>AI Traffic Intelligence</option>
          <option>Digital Twin</option>
          <option>Project tender / RFP</option>
          <option>Operation & maintenance</option>
          <option>Careers</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-mist">Message</span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={field}
          placeholder="Tell us about your project…"
        />
      </label>
      <button
        type="submit"
        className="w-full btn-brand rounded-full px-6 py-3 text-sm font-semibold sm:w-auto"
      >
        Compose email →
      </button>
      <p className="text-xs text-mist/60">
        Opens your email client addressed to {company.email}.
      </p>
    </form>
  );
}
