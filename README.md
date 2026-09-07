# AIM Church Busan — Frontend

The official website frontend for AIM Church Busan, built with Next.js. Provides service information, sermons, announcements, and online giving for the congregation.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 18 |
| Styling | Tailwind CSS 4, Relume UI |
| Animation | Framer Motion, GSAP |
| Data fetching | TanStack Query (React Query), Axios |
| Utilities | js-cookie |

## Architecture

This project follows a **Feature-Based Architecture**.

### Design Principles

- `app` is responsible only for routing.
- `features` contains all page-specific UI, business logic, hooks, services, and data.
- Shared resources are managed through top-level directories such as `components`, `context`, `hooks`, and `lib`.
- Each feature is independently maintainable and scalable.

### Directory Structure

```text
app
├── layout.js
├── page.js
├── providers.jsx
├── globals.css
├── about-us
│   └── page.js
├── plan-your-visit
│   └── page.js
├── sermons
│   └── page.js
├── join
│   └── page.js
├── announcements
│   └── page.js
└── offering
    └── page.js

features
├── home
│   ├── HomePage.jsx
│   ├── sections
│   │   ├── HeroSection.jsx
│   │   ├── SundayServiceInfoSection.jsx
│   │   ├── UpcomingEventsSection.jsx
│   │   ├── SermonsSection.jsx
│   │   └── ContactSection.jsx
│   ├── components
│   ├── hooks
│   ├── services
│   ├── data
│   └── index.js
│
├── about-us
│   ├── AboutUsPage.jsx
│   ├── sections
│   │   ├── OurMissionSection.jsx
│   │   ├── StatementOfFaithSection.jsx
│   │   ├── LeadershipStaffSection.jsx
│   │   ├── SooyoungroChurchSection.jsx
│   │   └── FAQSection.jsx
│   ├── components
│   ├── hooks
│   ├── services
│   ├── data
│   └── index.js
│
├── plan-your-visit
│   ├── PlanYourVisitPage.jsx
│   ├── sections
│   │   ├── ServiceInformationSection.jsx
│   │   ├── ChildrensMinistrySection.jsx
│   │   └── SooyoungroChurchSection.jsx
│   ├── components
│   ├── hooks
│   ├── services
│   ├── data
│   └── index.js
│
├── sermons
│   ├── SermonsPage.jsx
│   ├── sections
│   │   ├── SeriesInformationSection.jsx
│   │   ├── WatchSection.jsx
│   │   └── SermonsSection.jsx
│   ├── components
│   ├── hooks
│   ├── services
│   ├── data
│   └── index.js
│
├── join
│   ├── JoinPage.jsx
│   ├── sections
│   │   ├── NewMembersClassSection.jsx
│   │   ├── ServiceMinistriesSection.jsx
│   │   ├── LifeGroupSection.jsx
│   │   └── SNSSection.jsx
│   ├── components
│   ├── hooks
│   ├── services
│   ├── data
│   └── index.js
│
├── announcements
│   ├── AnnouncementsPage.jsx
│   ├── sections
│   │   ├── OfferingSection.jsx
│   │   ├── UpcomingEventsSection.jsx
│   │   ├── RegularAnnouncementsSection.jsx
│   │   └── ChildrensMinistrySection.jsx
│   ├── components
│   ├── hooks
│   ├── services
│   ├── data
│   └── index.js
│
└── offering
    ├── OfferingPage.jsx
    ├── sections
    ├── components
    ├── hooks
    ├── services
    ├── data
    └── index.js

components
├── CircleGrid.jsx
├── CrossGrid.jsx
├── FlipDotShape.jsx
├── LiquidBox.jsx
├── common
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Container.jsx
│   └── SectionTitle.jsx
│
└── layout
    ├── Header.jsx
    ├── Footer.jsx
    └── MobileNav.jsx

context
└── BannerContext.jsx

hooks
├── useMediaQuery.js
├── useScrollLock.js
└── useDebounce.js

lib
├── axios.js
├── queryClient.js
├── token.js
└── constants.js

public
└── images
```

### Routing Structure

| Route              | Feature         |
| ------------------ | --------------- |
| `/`                | Home            |
| `/about-us`        | About Us        |
| `/plan-your-visit` | Plan Your Visit |
| `/sermons`         | Sermons         |
| `/join`            | Join            |
| `/announcements`   | Announcements   |
| `/offering`        | Offering        |

### Page Structure

**Home**
- Hero
- Sunday Service Information
- Upcoming Events
- Sermons
- Contact

**About Us**
- Our Mission
- Statement of Faith
- Leadership & Staff
- Sooyoungro Church
- FAQ

**Plan Your Visit**
- Service Information
- Children's Ministry
- Sooyoungro Church

**Sermons**
- Series Information
- Watch Live / Watch Previous / Upcoming
- Sermons

**Join**
- New Member's Class
- Service Ministries
- Life Group
- SNS

**Announcements**
- Offering
- Upcoming Events
- Regular Announcements
- Children's Ministry

**Offering**
- Online Giving Information
- Donation Instructions
- Frequently Asked Questions

### Anchor Navigation

Sections can be accessed directly through anchor links.

Examples:

```text
/#contact
/about-us#faq
/sermons#watch
/announcements#offering
```

Each section should define a unique HTML id.

Example:

```jsx
<section id="contact">
  ...
</section>
```

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)

### Installation

```bash
cd aim-client
npm install
```

### Environment Variables

Create an `.env` file with the following values:

```env
NEXT_PUBLIC_API_URL=
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
