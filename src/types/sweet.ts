/**
 * Sweet Interface
 * ---------------
 * Represents a sweet item returned from the backend API.
 * Matches the MongoDB + Express response structure.
 */

export interface Sweet {
  /** Unique identifier (MongoDB ObjectId) */
  _id: string;

  /** Name of the sweet */
  name: string;

  /** Category of the sweet (e.g., Indian, Chocolate, Baked) */
  category: string;

  /** Price per unit */
  price: number;

  /** Available stock quantity */
  quantity: number;

  /** Timestamp when the sweet was created */
  createdAt?: string;

  /** Timestamp when the sweet was last updated */
  updatedAt?: string;
}
