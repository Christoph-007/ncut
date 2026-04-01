/**
 * Local pickup availability utilities.
 * Fetches store availability for a product variant from the backend.
 */
import api from '../api/index.js';

/**
 * Fetches local pickup availability for a variant.
 * @param {string} productId
 * @param {string} variantId
 * @returns {Promise<Array>} Array of pickup locations with availability info
 */
export async function fetchLocalPickupAvailability(productId, variantId) {
  if (!productId || !variantId) return [];
  try {
    const response = await api.get(`/products/${productId}/pickup-availability?variantId=${variantId}`);
    return response.data?.locations ?? [];
  } catch (_e) {
    return [];
  }
}
