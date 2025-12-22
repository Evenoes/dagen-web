"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

type FAQItemProps = {
  question: string;
  answer: string;
};

export default function FAQAccordion({ faqs }: { faqs: FAQItemProps[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
          >
            <span className="font-semibold text-lg">{faq.question}</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 prose prose-sm max-w-none">
              <ReactMarkdown>{faq.answer}</ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
