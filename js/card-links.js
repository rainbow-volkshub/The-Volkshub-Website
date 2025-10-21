// Make card-like divs clickable when they contain a link or have a data-href
document.addEventListener('DOMContentLoaded', function () {
  // Select elements with class names that include '-card'
  const cards = Array.from(document.querySelectorAll('[class*="-card"]'));

  cards.forEach(card => {
    // If the card is already wrapped by an anchor, skip it to avoid nested anchors
    if (card.closest('a')) return;

    // Prefer an internal anchor href if present, otherwise use data-href attribute
    const innerAnchor = card.querySelector('a[href]');
    const href = innerAnchor ? innerAnchor.getAttribute('href') : card.dataset.href;
    if (!href) return; // nothing to link to

    // Make it keyboard accessible
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');

    const target = card.dataset.target || '_blank';

    const navigate = () => {
      // Use window.open so cards can open in new tabs if desired
      window.open(href, target);
    };

    card.addEventListener('click', (e) => {
      // If the click originated on an actual link inside the card, let the browser handle it
      if (e.target.closest('a')) return;
      navigate();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate();
      }
    });
  });
});
