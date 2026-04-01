/**
 * Copy-to-clipboard utility.
 */

/**
 * Copies text to the clipboard.
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} Whether the copy succeeded.
 */
export async function copyToClipboard(text) {
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_e) {
    return false;
  }
}
