// Generated cover shows if the image file is missing; add the file and it takes over.
function bookCover(b, lazy = true) {
  return `<div class="book" style="--c1:${b.c1};--c2:${b.c2}">
    <span class="book-art"><strong>${b.title}</strong><em>${b.author}</em></span>
    <img src="${b.cover}" alt="Cover of ${b.title} by ${b.author}" ${lazy ? 'loading="lazy"' : ''} width="300" height="450" onerror="this.remove()"></div>`;
}
