import { useState } from "react";

export default function Kontakt() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [contactType, setContactType] = useState("");

  return (
    <main className="max.w.7xl mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-(--primary) mb-8">
          Kontakt oss
        </h1>

        {/* Formspree link med id fra secrets */}
        <form
          className="space-y-6"
          action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`}
          method="POST"
        >

          {/* Anonym? */}
          <div className="flex items-center gap-2">
            <label htmlFor="anonymous" className="text-sm">
              Anonym tilbakemelding? Kryss av her!
            </label>
            <input
              id="anonymous"
              type="checkbox"
              name="anonymous"
              value="true"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="h-4 w-4"
            />
          </div>

          {/* Navn */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Navn
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={isAnonymous ? "Anonym" : "Ola Nordmann"}
              disabled={isAnonymous}
              required={!isAnonymous}
              className={`w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary) ${isAnonymous ? "opacity-60 cursor-not-allowed" : ""
                }`}
            />
          </div>

          {/* E-post */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              E-post
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={isAnonymous ? "Anonym" : "ola@epost.no"}
              disabled={isAnonymous}
              required={!isAnonymous}
              className={`w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary) ${isAnonymous ? "opacity-60 cursor-not-allowed" : ""
                }`}
            />
          </div>

          {/* Type henvendelse */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="contact_type"
            >
              Jeg tar kontakt som
            </label>
            <select
              id="contact_type"
              name="contact_type"
              required
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary)"
            >
              {/* Valg av type! */}
              <option value="">Velg...</option>
              <option value="student">Student</option>
              <option value="bedrift">Bedriftsrepresentant</option>
              <option value="si_fra">Si fra!</option>

            </select>
          </div>

          {/* Melding */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Melding
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="Skriv meldingen din her..."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary)"
            />
          </div>

          {/* Skjulte felt som kan brukes i Formspree Rules / filtrering */}
          <input type="hidden" name="form_name" value="kontakt_skjema" />

          {/* Knapp for å sende */}
          <button
            type="submit"
            className="bg-(--primary) text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Send melding
          </button>

        </form>
      </div>
    </main>
  )
}