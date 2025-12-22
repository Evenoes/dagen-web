// This tells React this component uses client-side interactivity (like clicks)
// Similar to saying "this code runs in the browser, not just on the server"
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

// Type definition - like Python's type hints (def function(question: str, answer: str))
// This defines what shape each FAQ item should have
type FAQItemProps = {
  question: string;
  answer: string;
};

// Constant for the chevron/arrow icon used in accordions
// Extracted here so it's reusable and keeps the JSX cleaner
const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"              // Don't fill the shape, just draw outline
    stroke="currentColor"    // Use current text color for the line
    viewBox="0 0 24 24"      // Coordinate system (0,0 to 24,24)
  >
    {/* Path defines the arrow shape: starts at (19,9), line to (12,16), line to (5,9) */}
    {/* This creates a chevron/arrow pointing down: ∨ */}
    <path
      strokeLinecap="round"    // Round the ends of lines
      strokeLinejoin="round"   // Round the corners where lines meet
      strokeWidth={2}          // Line thickness
      d="M19 9l-7 7-7-7"      // Drawing instructions (M=move to, l=line to)
    />
  </svg>
);

// Main component - like defining a function in Python
// It takes a list of FAQs as input (similar to: def FAQAccordion(faqs: list):)
export default function FAQAccordion({ faqs }: { faqs: FAQItemProps[] }) {
  // State variable - tracks which FAQ is currently open
  // Like a variable that automatically triggers re-rendering when changed
  // useState(null) means initially no FAQ is open
  // Similar to: openIndex = None in Python
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Function to toggle FAQ open/closed
  // If clicking the already-open FAQ, close it (set to null)
  // Otherwise, open the clicked FAQ (set to its index)
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Return JSX (HTML-like syntax) - this is what gets displayed
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Loop through all FAQs - similar to: for index, faq in enumerate(faqs): */}
      {faqs.map((faq, index) => (
        <div
          key={index} // Unique identifier for each item (React requirement)
          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          {/* Clickable button for the question */}
          <button
            onClick={() => toggleFAQ(index)} // When clicked, toggle this FAQ
            className="w-full px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex justify-between items-center gap-4"
          >
            {/* Display the question text */}
            <span className="font-semibold text-lg">{faq.question}</span>
            
            {/* SVG arrow icon using our extracted constant component */}
            {/* Dynamic className - adds "rotate-180" when this FAQ is open */}
            {/* Similar to: f"w-5 h-5 {'rotate-180' if openIndex == index else ''}" */}
            <ChevronDownIcon 
              className={`w-5 h-5 shrink-0 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          
          {/* Conditional rendering - only show answer if this FAQ is open */}
          {/* Similar to: if openIndex == index: print(answer) */}
          {openIndex === index && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 prose prose-sm max-w-none">
              {/* ReactMarkdown converts markdown text to formatted HTML */}
              {/* Like using a markdown library in Python to render .md files */}
              <ReactMarkdown>{faq.answer}</ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
