# Mohammed Areeb Ali Shivji — Portfolio

Premium portfolio website for Mohammed Areeb Ali Shivji, a B.Tech Computer Science & Data Science student at SVKM NMIMS, Hyderabad. The site showcases projects, certifications, technical skills, and achievements with cinematic scroll animations and a Node.js/Express backend.

## Tech Stack

**Frontend**
- HTML5, EJS templating, SCSS (Dart Sass)
- GSAP + ScrollTrigger — scroll-driven character splits, staggered reveals, pinned horizontal scroll, parallax, magnetic buttons
- Lenis — smooth, 60fps virtual scrolling
- Anime.js — supplementary micro-animations
- React + TypeScript (standalone Vite widget) — typewriter hero effect

**Backend**
- Node.js + Express — server, routing, middleware
- Helmet, CORS, rate-limiting — security hardening
- Nodemailer — contact form email delivery
- Compression, EJS view engine

**Pipeline**
- SCSS → compressed CSS (12 modular partials)
- Vite → React typewriter bundle (hybrid mount into existing HTML)
- Single `start.sh` boots everything

## Features

- **Preloader** — progress bar with full name reveal
- **Hero** — particle background, split-character title animation, React typewriter cycling through roles
- **About** — animated bio section with stagger reveals
- **Projects** — 14 entries with grid layout, GSAP-driven scroll animations
- **Certifications** — 12 entries in chronological order (Apr 2025 – Mar 2026), sourced from Forage job simulations
- **Skills** — categorized badges (Languages, Data Science, Frontend, Backend, Cloud)
- **Achievements** — athletics and academic highlights
- **CTA / Contact** — form with Nodemailer backend + WhatsApp direct message button
- **Footer** — social links, phone number, tagline
- **Scroll progress** — fixed top bar
- **Responsive** — mobile-first with clamped typography

## Getting Started

```bash
# Clone the repo
git clone https://github.com/mohammedareebalishivji/Resume.git
cd Resume

# Run the start script (builds CSS + React typewriter, starts server)
./start.sh

# Or manually:
npm install
npm run build    # compiles SCSS → CSS
npm run start   # starts Express on port 3000
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables (Contact Form)

Create a `.env` file in the root:

```
CONTACT_EMAIL=your.email@gmail.com
CONTACT_PASS=your-gmail-app-password
```

The contact form at `/api/contact` uses Nodemailer with Gmail SMTP. Requires an [App Password](https://support.google.com/accounts/answer/185833).

### Custom Port

```bash
./start.sh 8080
```

## Project Structure

```
├── index.html              # Static fallback page
├── views/index.ejs         # Express-rendered EJS template
├── server.js               # Express server
├── start.sh                # Launcher (build + serve)
├── package.json
├── .env                    # Contact form credentials (gitignored)
│
├── public/
│   ├── css/style.css       # Compiled SCSS
│   ├── js/main.js          # GSAP/Lenis/contact form JS
│   ├── react/typewriter.js # Built React typewriter bundle
│   ├── favicon.svg
│   └── assets/             # Images & resources
│
├── scss/
│   ├── style.scss          # Entry point (imports all partials)
│   ├── _variables.scss     # Design tokens
│   ├── _reset.scss
│   ├── _hero.scss          # Hero + cursor keyframes
│   ├── _nav.scss
│   ├── _preloader.scss
│   ├── _projects.scss
│   ├── _certifications.scss
│   ├── _skills.scss
│   ├── _achievements.scss
│   ├── _pinned.scss        # Horizontal scroll section
│   ├── _cta.scss           # Contact form + WhatsApp button
│   ├── _footer.scss
│   ├── _sections.scss      # Shared section layouts
│   ├── _responsive.scss
│   └── _utilities.scss
│
├── data/
│   ├── projects.js         # 14 project entries
│   └── certifications.js   # 12 certification entries
│
├── routes/
│   ├── api.js              # GET /api/projects, /api/certifications, /api/stats
│   └── contact.js          # POST /api/contact
│
├── Certificates/           # 13 PDF certificates (committed, not linked in UI)
│
├── typewriter/             # Standalone Vite + React + TypeScript project
│   ├── src/Typewriter.tsx  # Component (useState, useCallback, useEffect)
│   ├── src/main.tsx        # Mounts on #typewriter-root
│   └── vite.config.ts      # Builds to public/react/
│
└── Mohammed_Areeb_Ali_Shivji_Detailed_Resume.docx  # Source resume
```

## About

**Mohammed Areeb Ali Shivji** is a 1st-year B.Tech student at SVKM NMIMS, Hyderabad, specializing in Computer Science & Data Science. He builds and ships full-stack products — from the Stellaar family-club platform (live at thestellaar.com) to Pediatrack, a health-tech startup concept. He has completed twelve industry job simulations across data science, software engineering, and cybersecurity through Forage, and holds certifications from BCG, J.P. Morgan, Deloitte, British Airways, AWS, and more.

**Phone:** +91 70287 34365
**Email:** mohammedareebalishivji@gmail.com
**GitHub:** [github.com/mohammedareebalishivji](https://github.com/mohammedareebalishivji)
**LinkedIn:** [linkedin.com/in/mohammad-areeb-ali-shivji](https://www.linkedin.com/in/mohammad-areeb-ali-shivji-0801a3350)
**Web:** [thestellaar.com](https://thestellaar.com)

## Technical Skills

| Category | Skills |
|----------|--------|
| Languages | Python, Java (Advanced OOP), C, C++, R, JavaScript / TypeScript |
| Data Science & ML | pandas, NumPy, scikit-learn, Random Forest, GridSearchCV, EDA, Predictive Modeling, Data Labeling, GenAI Tools |
| Frontend & Full-Stack | React, TSX, HTML5, CSS3, Web Application Development |
| Backend & Tools | Spring Boot, Spring Data JPA, Kafka, REST API, H2/SQL, Maven, Git/GitHub, VBA Automation |
| Analytics & Visualization | Tableau, Excel, Matplotlib |
| Cloud & Security | AWS Solutions Architecture, IAM, Cybersecurity Fundamentals |

## License

MIT
