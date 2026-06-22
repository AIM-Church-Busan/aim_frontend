# Frontend Architecture

## Project Structure

This project follows a **Feature-Based Architecture**.

### Design Principles

* `app` is responsible only for routing.
* `features` contains all page-specific UI, business logic, hooks, services, and data.
* Shared resources are managed through top-level directories such as `components`, `context`, `hooks`, and `lib`.
* Each feature is independently maintainable and scalable.

---

## Directory Structure

```text
app
├── layout.js
├── page.js
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
├── AuthContext.jsx
└── ThemeContext.jsx

hooks
├── useMediaQuery.js
├── useScrollLock.js
└── useDebounce.js

lib
├── apiClient.js
├── cn.js
├── utils.js
└── constants.js

public
└── images
```

---

## Routing Structure

| Route              | Feature         |
| ------------------ | --------------- |
| `/`                | Home            |
| `/about-us`        | About Us        |
| `/plan-your-visit` | Plan Your Visit |
| `/sermons`         | Sermons         |
| `/join`            | Join            |
| `/announcements`   | Announcements   |
| `/offering`        | Offering        |

---

## Page Structure

### Home

* Hero
* Sunday Service Information
* Upcoming Events
* Sermons
* Contact

### About Us

* Our Mission
* Statement of Faith
* Leadership & Staff
* Sooyoungro Church
* FAQ

### Plan Your Visit

* Service Information
* Children's Ministry
* Sooyoungro Church

### Sermons

* Series Information
* Watch Live / Watch Previous / Upcoming
* Sermons

### Join

* New Member's Class
* Service Ministries
* Life Group
* SNS

### Announcements

* Offering
* Upcoming Events
* Regular Announcements
* Children's Ministry

### Offering

* Online Giving Information
* Donation Instructions
* Frequently Asked Questions

---

## Anchor Navigation

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
