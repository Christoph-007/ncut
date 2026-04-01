/**
 * RTE (Rich Text Editor) formatter utility.
 * Wraps tables in a scrollable div for responsive display.
 * Use the `formatRTEContent` function on a container ref in a useEffect.
 */

/**
 * Wraps all tables inside a container in a `.rte-table-wrapper` div.
 * @param {HTMLElement} container
 */
export function formatRTEContent(container) {
  if (!container) return;
  container.querySelectorAll('table').forEach((table) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('rte-table-wrapper');
    const parent = table.parentNode;
    if (parent) {
      parent.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
}
