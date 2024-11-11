/**
 * Represents a user with nested properties.
 *
 * @public
 */
export interface User {
  /** The user's name. */
  name: Name;

  /** The user's email address. */
  email: string;

  /** The user's picture. */
  picture: Picture;
}

/**
 * Represents the name of a user.
 *
 * @public
 */
export interface Name {
  /** The title of the user (e.g., Mr, Ms, Dr). */
  title: string;

  /** The first name of the user. */
  first: string;

  /** The last name of the user. */
  last: string;
}

/**
 * Represents a user's picture in different sizes.
 *
 * @public
 */
export interface Picture {
  /** URL for the large version of the user's picture. */
  large: string;

  /** URL for the medium version of the user's picture. */
  medium: string;

  /** URL for the thumbnail version of the user's picture. */
  thumbnail: string;
}
