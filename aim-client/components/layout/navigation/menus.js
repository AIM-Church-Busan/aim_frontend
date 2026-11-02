import {
  LuBaby,
  LuBookOpen,
  LuCalendarDays,
  LuChurch,
  LuCircleHelp,
  LuClock,
  LuFileText,
  LuGlobe,
  LuHandHeart,
  LuHeart,
  LuMapPin,
  LuMegaphone,
  LuPlay,
  LuRadio,
  LuUsers,
} from 'react-icons/lu';

// Intro copy can be replaced independently for each dropdown.
export const navigationMenus = [
  {
    id: 'about',
    label: 'About Us',
    eyebrow: 'A little about us',
    description:
      'Many nations. One family. Get to know the faith and people at the heart of AIM.',
    href: '/about-us',
    action: 'Discover AIM',
    links: [
      {
        label: 'Our mission',
        description: 'Why we gather and what moves us.',
        href: '/about-us#our-mission',
        icon: LuHeart,
      },
      {
        label: 'Statement of faith',
        description: 'The beliefs we share together.',
        href: '/about-us#statement-of-faith',
        icon: LuBookOpen,
      },
      {
        label: 'Leadership & staff',
        description: 'Meet the people serving our church.',
        href: '/about-us#leadership-staff',
        icon: LuUsers,
      },
      {
        label: 'Sooyoungro Church',
        description: 'Our church family here in Busan.',
        href: '/about-us#sooyoungro-church',
        icon: LuChurch,
      },
      {
        label: 'Frequently asked questions',
        description: 'A few things you may be wondering.',
        href: '/about-us#faq',
        icon: LuCircleHelp,
      },
    ],
  },
  {
    id: 'visit',
    label: 'Plan Your Visit',
    eyebrow: 'There is a place for you',
    description:
      'New to Busan or just stopping by? We would love to make your first Sunday feel like home.',
    href: '/plan-your-visit',
    action: 'Plan a Sunday',
    links: [
      {
        label: 'Service information',
        description: 'Everything you need for Sunday.',
        href: '/plan-your-visit#service-information',
        icon: LuClock,
      },
      {
        label: 'Find us',
        description: 'Directions to our gathering in Busan.',
        href: '/plan-your-visit#sooyoungro-church',
        icon: LuMapPin,
      },
      {
        label: 'Children’s ministry',
        description: 'A welcoming space for little ones.',
        href: '/plan-your-visit#childrens-ministry',
        icon: LuBaby,
      },
      {
        label: 'First time here?',
        description: 'Get to know us before you arrive.',
        href: '/about-us#faq',
        icon: LuCircleHelp,
      },
    ],
  },
  {
    id: 'sermons',
    label: 'Sermons',
    eyebrow: 'Faith for everyday life',
    description:
      'Make room for the Word. Join us live, revisit a message, or explore what we are learning together.',
    href: '/sermons',
    action: 'Explore sermons',
    links: [
      {
        label: 'Watch live',
        description: 'Worship with us wherever you are.',
        href: '/sermons#watch',
        icon: LuRadio,
      },
      {
        label: 'Previous sermons',
        description: 'Catch up on a Sunday message.',
        href: '/sermons#sermons',
        icon: LuPlay,
      },
      {
        label: 'Current series',
        description: 'Follow the story we are exploring.',
        href: '/sermons#series-information',
        icon: LuBookOpen,
      },
    ],
  },
  {
    id: 'join',
    label: 'Join',
    eyebrow: 'Life is better together',
    description:
      'Find your people, share your gifts, and take your next step with the AIM community.',
    href: '/join',
    action: 'Find your place',
    links: [
      {
        label: 'New members class',
        description: 'Start your journey with AIM.',
        href: '/join#new-members-class',
        icon: LuBookOpen,
      },
      {
        label: 'Service ministries',
        description: 'Put your gifts to work for others.',
        href: '/join#service-ministries',
        icon: LuHandHeart,
      },
      {
        label: 'Life groups',
        description: 'Build friendships beyond Sunday.',
        href: '/join#life-group',
        icon: LuUsers,
      },
      {
        label: 'Stay connected',
        description: 'Follow everyday life in our community.',
        href: '/join#sns',
        icon: LuGlobe,
      },
    ],
  },
  {
    id: 'announcements',
    label: 'Announcements',
    eyebrow: 'Around our community',
    description:
      'Keep up with the little moments and big gatherings that bring our church family together.',
    href: '/announcements',
    action: 'See what is new',
    links: [
      {
        label: 'Upcoming events',
        description: 'Make space for what is coming up.',
        href: '/announcements#upcoming-events',
        icon: LuCalendarDays,
      },
      {
        label: 'Church news',
        description: 'The latest updates from AIM.',
        href: '/announcements#regular-announcements',
        icon: LuMegaphone,
      },
      {
        label: 'Offering',
        description: 'This week’s offering information.',
        href: '/announcements#offering',
        icon: LuHandHeart,
      },
      {
        label: 'Children’s ministry',
        description: 'News for our youngest members.',
        href: '/announcements#childrens-ministry',
        icon: LuBaby,
      },
    ],
  },
  {
    id: 'more',
    label: 'More',
    eyebrow: 'Take another step',
    description:
      'A few more ways to be part of our story. Give, get in touch, or discover something new.',
    href: '/offering',
    action: 'Explore giving',
    links: [
      {
        label: 'Online giving',
        description: 'Help support our shared mission.',
        href: '/offering',
        icon: LuHeart,
      },
      {
        label: 'Giving information',
        description: 'Find donation details and guidance.',
        href: '/offering#donation-instructions',
        icon: LuFileText,
      },
      {
        label: 'Sooyoungro Church',
        description: 'Explore our wider church family.',
        href: 'https://www.sooyoungro.org/main.jsp',
        icon: LuChurch,
      },
      {
        label: 'Giving FAQ',
        description: 'Answers to your giving questions.',
        href: '/offering#frequently-asked-questions',
        icon: LuCircleHelp,
      },
    ],
  },
];
