// ONE place for brand details, books and testimonials. Replace once, updates every page.
const site = {
  name: 'Story Bloom Publishers',
  email: '[EMAIL ADDRESS]',
  phone: '[PHONE NUMBER]',
  location: '[UK LOCATION]',
  // Enquiry form: paste your Formspree URL, e.g. 'https://formspree.io/f/abcdwxyz'. Empty = opens the visitor's email app instead.
  formEndpoint: '',
  // WhatsApp button: digits only with country code, e.g. '447123456789'. Empty = button hidden.
  whatsapp: '',
  socials: { Facebook: '#', Instagram: '#', LinkedIn: '#', X: '#' },
};
// Future pages: point these at their own files, e.g. 'publishing.html'.
const nav = [
  ['Home', 'index.html'], ['Publishing', 'publishing.html'], ['Ghostwriting', 'ghostwriting.html'],
  ['Book Marketing', 'book-marketing.html'], ['Distribution', 'distribution.html'], ['About Us', 'about.html'],
];
// Books (general readers). Cover files live in assets/books.
const books = [
  {
    "cover": "assets/books/book-01.jpg",
    "title": "Ten Quiet Minutes with God",
    "author": "Clara J. Whitman",
    "genre": "Christian Devotional",
    "link": "https://www.amazon.com/dp/B0HG57QKCB",
    "c1": "#6b7a5c",
    "c2": "#0f1f3d"
  },
  {
    "cover": "assets/books/snippets.jpg",
    "title": "Snippets",
    "author": "Jacquelyn Pendergraft",
    "genre": "Faith & Family Stories",
    "link": "https://www.amazon.com/dp/B0HNTVWYZK",
    "c1": "#f3e9dc",
    "c2": "#c9b79c"
  },
  {
    "cover": "assets/books/book-04.jpg",
    "title": "Six Bullets to a Man",
    "author": "Jethro Wegener",
    "genre": "Thriller",
    "link": "https://www.amazon.com/dp/B0C5HLJQ5C",
    "c1": "#b80f0a",
    "c2": "#111111"
  },
  {
    "cover": "assets/books/book-02.jpg",
    "title": "Vita Brevis",
    "author": "Marco Vidal",
    "genre": "Self-Help",
    "link": "https://www.amazon.com/dp/B0HJBB55V4",
    "c1": "#efe6d2",
    "c2": "#d9cba9"
  },
  {
    "cover": "assets/books/pretty-ugly-words.jpg",
    "title": "pretty ugly words",
    "author": "Piper Winter",
    "genre": "Poetry",
    "link": "https://www.amazon.com/dp/B0HNJXXD65",
    "c1": "#7f8d6e",
    "c2": "#5d6b4e"
  },
  {
    "cover": "assets/books/book-03.jpg",
    "title": "Dosis diaria de terapia",
    "author": "Clara Montes",
    "genre": "Self-Help (Spanish)",
    "link": "https://www.amazon.com/dp/B0H7LGYZDX",
    "c1": "#e9c982",
    "c2": "#c9a45c"
  },
  {
    "cover": "assets/books/growing-better.jpg",
    "title": "Growing Better Not Older",
    "author": "Sean O'Mara MD, JD",
    "genre": "Health & Wellness",
    "link": "https://www.amazon.com/dp/B0DSV4H96Z",
    "c1": "#0f1f3d",
    "c2": "#07122a"
  },
  {
    "cover": "assets/books/book-06.jpg",
    "title": "A Coffee with God",
    "author": "Sofia Fiore",
    "genre": "Christian Inspiration",
    "link": "https://www.amazon.com/dp/B0H8Z9C5BW",
    "c1": "#f3e6cf",
    "c2": "#d9c4a0"
  },
  {
    "cover": "assets/books/book-05.jpg",
    "title": "God Wants You to Know...",
    "author": "Clara Solano",
    "genre": "Christian Devotional",
    "link": "https://www.amazon.com/dp/B0HFY52CTX",
    "c1": "#f6d9d0",
    "c2": "#e9b9ad"
  },
  {
    "cover": "assets/books/book-07.jpg",
    "title": "Dear God",
    "author": "Elisha Trask",
    "genre": "Christian Prayer",
    "link": "https://www.amazon.com/dp/B0HKP4MLFB",
    "c1": "#efe3c8",
    "c2": "#c8cf9f"
  }
];
// Children's books
const childrenBooks = [
  {
    "cover": "assets/books/kids-murphys-law.jpg",
    "title": "Murphy's Law for Kids",
    "author": "Ethereal Ray",
    "genre": "Children's Non-Fiction",
    "link": "https://www.amazon.com/dp/B0GWLBSWJT",
    "c1": "#1d3a5f",
    "c2": "#0f1f3d"
  },
  {
    "cover": "assets/books/kids-little-spooky.jpg",
    "title": "Little Spooky",
    "author": "CocoWyo",
    "genre": "Colouring Book",
    "link": "https://www.amazon.com/dp/B0DF33DSNF",
    "c1": "#2a3c63",
    "c2": "#121f3d"
  },
  {
    "cover": "assets/books/kids-secret-jobs.jpg",
    "title": "The Secret Jobs of Backyard Creatures",
    "author": "Claire Monroe Books",
    "genre": "Children's Non-Fiction",
    "link": "https://www.amazon.com/dp/B0GZKRW8JH",
    "c1": "#5d8a3c",
    "c2": "#c9a45c"
  },
  {
    "cover": "assets/books/kids-would-you-rather.jpg",
    "title": "Would You Rather Book for Kids",
    "author": "Stephen J. Ellis",
    "genre": "Children's Humour",
    "link": "https://www.amazon.com/dp/B09GXDQ122",
    "c1": "#f1d14a",
    "c2": "#a30f0f"
  },
  {
    "cover": "assets/books/kids-spooky-girl.jpg",
    "title": "Spooky Girl",
    "author": "CocoWyo",
    "genre": "Colouring Book",
    "link": "https://www.amazon.com/dp/B0HG61DH76",
    "c1": "#3b3b4a",
    "c2": "#1b1b26"
  }
];
// Testimonials supplied by the owner. Set testimonialsReady = false to hide the section.
const testimonialsReady = true;
const testimonials = [
  {
    "quote": "I had been working on my manuscript for a long time, so handing it over to someone else was a big decision. The team explained the publishing process clearly and helped me understand what needed to be done. I appreciated the communication and the attention given to preparing my book.",
    "name": "Michael R.",
    "role": "First-time author · Publishing Services"
  },
  {
    "quote": "The hardest part for me was knowing where to start. I had the story written, but I wasn't familiar with formatting, cover design, or getting everything ready for publication. Having guidance through those steps made the process much easier to manage.",
    "name": "Sarah W.",
    "role": "Independent author · Book Preparation"
  },
  {
    "quote": "I wanted my book to look professional without losing the original feel of my writing. The formatting and cover presentation were important to me, and I appreciated being able to discuss my preferences and review the work before moving forward.",
    "name": "David M.",
    "role": "Author · Formatting & Cover Design"
  },
  {
    "quote": "I had questions about distribution and how readers would be able to find my book after publication. The team walked me through the available options and helped me understand the difference between publishing a book and actually marketing it. That clarity was valuable.",
    "name": "Linda T.",
    "role": "Independent author · Distribution Guidance"
  },
  {
    "quote": "What I valued most was having someone explain the next steps instead of making everything feel complicated. From discussing my requirements to reviewing the publishing options, the process felt more manageable. I would recommend taking the time to understand the services that best fit your book.",
    "name": "Robert H.",
    "role": "Author · Publishing Consultation"
  }
];
