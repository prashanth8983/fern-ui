/**
 * Fern UI - Sidebar
 * Handles three sidebar behaviors:
 *   1. Show/hide toggle (data-sidebar-toggle)
 *   2. Collapse to rail (data-sidebar-collapse)
 *   3. Two-level push panel (data-submenu / sidebar-submenu)
 */

function closeAllSubmenus() {
  document.querySelectorAll('.sidebar-submenu.open').forEach(sub => {
    sub.classList.remove('open');
  });
  document.querySelectorAll('[data-submenu].active').forEach(btn => {
    btn.classList.remove('active');
  });
  // Remove push attribute from layout
  const layout = document.querySelector('[data-sidebar-layout]');
  if (layout) layout.removeAttribute('data-submenu-open');
}

document.addEventListener('click', (e) => {
  // 0. Expandable nav sections (.nav-expand-trigger)
  const expandTrigger = e.target.closest('.nav-expand-trigger');
  if (expandTrigger) {
    const li = expandTrigger.closest('.nav-expandable');
    if (!li) return;
    const content = li.querySelector('.nav-expand-content');
    if (!content) return;

    const isOpen = li.classList.toggle('open');
    content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0px';
    return;
  }

  // 1. Show/hide toggle (mobile overlay or full hide)
  const toggle = e.target.closest('[data-sidebar-toggle]');
  if (toggle) {
    const layout = toggle.closest('[data-sidebar-layout]');
    layout?.toggleAttribute('data-sidebar-open');
    return;
  }

  // 2. Collapse to rail / expand back
  const collapse = e.target.closest('[data-sidebar-collapse]');
  if (collapse) {
    const layout = collapse.closest('[data-sidebar-layout]');
    if (!layout) return;
    const isCollapsed = layout.toggleAttribute('data-sidebar-collapsed');

    // Rotate the collapse icon
    const icon = collapse.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = isCollapsed ? 'chevron_right' : 'chevron_left';
    }

    // Close any open submenus when collapsing
    if (isCollapsed) {
      closeAllSubmenus();
    }
    return;
  }

  // 3. Two-level submenu: toggle panel
  const submenuTrigger = e.target.closest('[data-submenu]');
  if (submenuTrigger) {
    const menuId = submenuTrigger.getAttribute('data-submenu');
    const submenu = document.getElementById(menuId);
    if (!submenu) return;

    const layout = submenuTrigger.closest('[data-sidebar-layout]');
    const isAlreadyOpen = submenu.classList.contains('open');

    // Close all open panels and deactivate triggers
    closeAllSubmenus();

    // Toggle: if it was already open, just close; otherwise open the target
    if (!isAlreadyOpen) {
      submenu.classList.add('open');
      submenuTrigger.classList.add('active');
      if (layout) layout.setAttribute('data-submenu-open', '');
    }

    return;
  }

  // 3b. Back button in submenu panel — close it
  const backBtn = e.target.closest('[data-submenu-back]');
  if (backBtn) {
    closeAllSubmenus();
    return;
  }

  // Close submenu when clicking outside sidebar + submenu panels
  if (!e.target.closest('[data-sidebar]') && !e.target.closest('.sidebar-submenu')) {
    closeAllSubmenus();
  }

  // Dismiss sidebar when clicking outside on mobile
  if (!e.target.closest('[data-sidebar]') && !e.target.closest('.sidebar-submenu')) {
    const layout = document.querySelector('[data-sidebar-layout][data-sidebar-open]');
    if (layout && window.matchMedia('(max-width: 768px)').matches) {
      layout.removeAttribute('data-sidebar-open');
    }
  }
});

// Expand rail on hover (optional: add data-sidebar-hover-expand to layout)
document.addEventListener('mouseenter', (e) => {
  const sidebar = e.target.closest?.('[data-sidebar-layout][data-sidebar-collapsed][data-sidebar-hover-expand] aside[data-sidebar]');
  if (sidebar) {
    sidebar.closest('[data-sidebar-layout]')?.removeAttribute('data-sidebar-collapsed');
  }
}, true);
