# Dagen Web

Next.js-nettside for **Dagen @ IFI**.  
Bygget med **TypeScript** og **Tailwind CSS**.  
Prosjektet kjører uten backend, men krever at `content/` og `public/` eksisterer lokalt.

---

## Kom i gang

### 1 Klon prosjektet
```bash
git clone <repo-url>
cd dagen-web
```

### 2 Installer npm
```bash
npm install
```

### (Optional) Mapper for innhold
Disse mappene brukes for å hente tekster til de forskjellige sidene 
*Det er lagt opp til at disse vanligvis hentes fra privat content repo*
```bash
mkdir -p content/hjem
mkdir -p content/bedrift
mkdir -p content/bli-med
mkdir -p content/om-oss
mkdir -p content/program
mkdir -p content/stillingsannonser
mkdir -p public
```
*Se lenger ned for hele filstrukturen med filene vi bruker*

### (Optional) Kontaktform
Opprett `.env.local` hvis Formspree skal brukes
```bash
NEXT_PUBLIC_FORMSPREE_ID=...
```

### Kjør lokalt
```bash
npm run dev
```
Åpne:
[http://localhost:3000](http://localhost:3000)

### Eksempel på filstruktur for content
*Oppdatert 22.01.2026*
```markdown
content/
├── hjem/
│   ├── dagen.md
│   ├── ettermiddagen.md
│   ├── hsp-info.md
│   └── what-is-dagen.md
│
├── om-oss/
│   ├── members.csv (header: Name,Title,Email,Picture <- alle = string)
│   ├── varslingsplakat.md
│   └── vedtekter.md
│
├── program/
│   ├── bedrifter.csv (header: Name(string),Logo(string),Spons(standard/sponsor/hsp))
│   └── program.csv (header: Time(string),Text(string)
│
├── bedrift/
│   ├── bedrift_page_info.md
│   ├── hsp_info.md
│   ├── stand_info.md
│   │
│   ├── hsp/
│   │   ├── hsp_extended.md
│   │   ├── hsp_hsp_card.csv (header: Checked(0/1),Text(string))
│   │   ├── hsp_info_text.md
│   │   └── hsp_sponsor_card.csv (header: Checked(0/1),Text(string))
│   │
│   └── stand/
│       ├── sponsor_stand_card.csv (header: Checked(0/1),Text(string))
│       ├── stand_faq.md
│       ├── stand_prices_list.csv (header: Label(string),Price(string))
│       └── standard_stand_card.csv (header: Checked(0/1),Text(string))
│
├── stillingsannonser/
│   └── stillingsannonser.csv (header: Tittel,Stillingstype,Firma,Frist,URL,Logo,Beskrivelse) <- alle = string
│
└── bli-med/
    ├── bli_med.md
    ├── funk_extended.md
    ├── funk_info.md
    ├── intern_extended.md
    ├── intern_info.md
    ├── styret_extended.md
    ├── styret_info.md
    │
    ├── apply-link/
    │   ├── apply_funk.md
    │   └── apply_intern.md
    │
    ├── styret-cards/*.md (en per verv)
    └── intern-cars/*md (en per verv / gruppe)
```


### Eksempel på filstruktur for public
```markdown
public/
├── homepage/     - bilder til hjemsiden
├── logos/        - bedriftslogoer til program og stillingsannonser
├── members/      - bilder av medlemmer - til om-oss
├── program/      - bilde av standkart og logoer for eventene
└── web-design/   - bakgrunnsbilde
    └── dagen-logo/   - logo til header m.m.
```
