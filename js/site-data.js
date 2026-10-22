// ONE place for brand details. Replace once, updates every page.
const site = {
  name: 'Story Bloom Publishers',
  email: '[EMAIL ADDRESS]',
  phone: '[PHONE NUMBER]',
  location: '[UK LOCATION]',
};
// Future pages: change '#...' to '/publishing.html' etc.
const nav = [
  ['Home', 'index.html'], ['Publishing', '#publishing'], ['Ghostwriting', '#ghostwriting'],
  ['Book Marketing', '#marketing'], ['Distribution', '#distribution'], ['About Us', '#about'],
];
// PLACEHOLDER BOOKS: replace cover (file in public/assets/books), title, author, genre, link.
const books = [
  { cover: 'assets/books/book-01.jpg', title: 'Ten Quiet Minutes with God', author: 'Clara J. Whitman', genre: 'Christian Devotional', link: 'https://www.amazon.com/dp/B0HG57QKCB', c1: '#6b7a5c', c2: '#0f1f3d' },
  { cover: 'assets/books/book-02.jpg', title: 'Vita Brevis', author: 'Marco Vidal', genre: 'Self-Help', link: 'https://www.amazon.com/dp/B0HJBB55V4', c1: '#efe6d2', c2: '#d9cba9' },
  { cover: 'assets/books/book-03.jpg', title: 'Dosis diaria de terapia', author: 'Clara Montes', genre: 'Self-Help (Spanish)', link: 'https://www.amazon.com/dp/B0H7LGYZDX', c1: '#e9c982', c2: '#c9a45c' },
  { cover: 'assets/books/book-04.jpg', title: 'Six Bullets to a Man', author: 'Jethro Wegener', genre: 'Thriller', link: 'https://www.amazon.com/dp/B0C5HLJQ5C', c1: '#b80f0a', c2: '#111111' },
  { cover: 'assets/books/book-05.jpg', title: 'God Wants You to Know...', author: 'Clara Solano', genre: 'Christian Devotional', link: 'https://www.amazon.com/dp/B0HFY52CTX', c1: '#f6d9d0', c2: '#e9b9ad' },
  { cover: 'assets/books/book-06.jpg', title: 'A Coffee with God', author: 'Sofia Fiore', genre: 'Christian Inspiration', link: 'https://www.amazon.com/dp/B0H8Z9C5BW', c1: '#f3e6cf', c2: '#d9c4a0' },
  { cover: 'assets/books/book-07.jpg', title: 'Dear God', author: 'Elisha Trask', genre: 'Christian Prayer', link: 'https://www.amazon.com/dp/B0HKP4MLFB', c1: '#efe3c8', c2: '#c8cf9f' },
  { cover: 'assets/books/book-08.jpg', title: 'Murphy\'s Law for Kids', author: 'Ethereal Ray', genre: "Children's Non-Fiction", link: 'https://www.amazon.com/dp/B0GWLBSWJT', c1: '#1d3a5f', c2: '#0f1f3d' },
];
// PLACEHOLDER TESTIMONIALS: must be replaced with real, permissioned testimonials.
const testimonials = [
  { quote: 'Placeholder testimonial: replace with a genuine quote from an author about their experience.', name: 'Author Name', book: 'Book Title' },
  { quote: 'Placeholder testimonial: replace with a genuine quote from an author about their experience.', name: 'Author Name', book: 'Book Title' },
  { quote: 'Placeholder testimonial: replace with a genuine quote from an author about their experience.', name: 'Author Name', book: 'Book Title' },
];
