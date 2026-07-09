/**
 * Gestion des modales plein écran Boleto
 * - Ouverture via [data-modal-open] ou [data-commerce-open]
 * - Fermeture : croix, clic voile, touche Échap
 * - Focus trap basique
 */

let lastFocusedElement: HTMLElement | null = null;

function getModal(id: string): HTMLElement | null {
  return document.getElementById(id);
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
}

export function openModal(id: string): void {
  const modal = getModal(id);
  if (!modal) return;

  lastFocusedElement = document.activeElement as HTMLElement;
  modal.removeAttribute('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const focusable = getFocusableElements(modal);
  const closeBtn = modal.querySelector<HTMLElement>('[data-modal-close]');
  (closeBtn ?? focusable[0])?.focus();
}

export function closeModal(id: string): void {
  const modal = getModal(id);
  if (!modal) return;

  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

export function closeAllModals(): void {
  document.querySelectorAll<HTMLElement>('.modal[aria-hidden="false"]').forEach((modal) => {
    closeModal(modal.id);
  });
}

function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    closeAllModals();
    return;
  }

  if (e.key !== 'Tab') return;

  const openModal = document.querySelector<HTMLElement>('.modal[aria-hidden="false"]');
  if (!openModal) return;

  const focusable = getFocusableElements(openModal);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function initModals(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const openTrigger = target.closest<HTMLElement>('[data-modal-open]');
    if (openTrigger) {
      e.preventDefault();
      const modalId = openTrigger.dataset.modalOpen;
      if (modalId) openModal(modalId);
      return;
    }

    const commerceTrigger = target.closest<HTMLElement>('[data-commerce-open]');
    if (commerceTrigger) {
      e.preventDefault();
      const commerceId = commerceTrigger.dataset.commerceOpen;
      if (commerceId) {
        showCommerceDetail(commerceId);
      }
      return;
    }

    if (target.closest('[data-modal-close]')) {
      const modal = target.closest<HTMLElement>('.modal');
      if (modal) closeModal(modal.id);
    }
  });

  document.addEventListener('keydown', handleKeydown);
}

function showCommerceDetail(commerceId: string): void {
  const allDetails = document.querySelectorAll<HTMLElement>('[data-commerce-detail]');
  allDetails.forEach((detail) => {
    const isMatch = detail.dataset.commerceDetail === commerceId;
    if (isMatch) {
      detail.removeAttribute('hidden');
      detail.style.display = 'block';
    } else {
      detail.setAttribute('hidden', '');
      detail.style.display = 'none';
    }
  });
  openModal('commerce-modal');
}

function initCatalogueFilters(): void {
  const chips = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = document.querySelectorAll<HTMLElement>('.commerce-card[data-commerce-id]');

  if (chips.length === 0 || cards.length === 0) return;

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter ?? 'Toutes';

      chips.forEach((c) => {
        const isActive = c === chip;
        c.classList.toggle('chip--active', isActive);
        c.setAttribute('aria-pressed', String(isActive));
      });

      cards.forEach((card) => {
        const category = card.dataset.category ?? '';
        const show = filter === 'Toutes' || category === filter;
        (card as HTMLElement).style.display = show ? '' : 'none';
      });
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initModals();
      initCatalogueFilters();
    });
  } else {
    initModals();
    initCatalogueFilters();
  }
}
