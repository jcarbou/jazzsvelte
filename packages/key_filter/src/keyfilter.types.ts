/**
 *
 * This module contains common options and types of components that use KeyFilter.
 *
 * @module keyfilter
 *
 */

/**
 * Defines the type of keyfilter property in components.
 *
 * @see {@link inputtext}
 * @see {@link password}
 * ...
 */
export type KeyFilterRegExp = KeyFilterRegExpAlias | RegExp
export type KeyFilterRegExpAlias = 'pint' | 'int' | 'pnum' | 'money' | 'num' | 'hex' | 'email' | 'alpha' | 'alphanum'

export type ValidatedInputEvent = CustomEvent<{ event: Event; valid: boolean }>
