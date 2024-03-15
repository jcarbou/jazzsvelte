/* eslint-disable @typescript-eslint/no-explicit-any */
import { get as storeGet } from 'svelte/store'
import { JAZZ_SVELTE } from './JazzSvelte'

const enEntries = {
    startsWith: 'Starts with',
    contains: 'Contains',
    notContains: 'Not contains',
    endsWith: 'Ends with',
    equals: 'Equals',
    notEquals: 'Not equals',
    noFilter: 'No Filter',
    filter: 'Filter',
    lt: 'Less than',
    lte: 'Less than or equal to',
    gt: 'Greater than',
    gte: 'Greater than or equal to',
    dateIs: 'Date is',
    dateIsNot: 'Date is not',
    dateBefore: 'Date is before',
    dateAfter: 'Date is after',
    custom: 'Custom',
    clear: 'Clear',
    close: 'Close',
    apply: 'Apply',
    matchAll: 'Match All',
    matchAny: 'Match Any',
    addRule: 'Add Rule',
    removeRule: 'Remove Rule',
    accept: 'Yes',
    reject: 'No',
    choose: 'Choose',
    upload: 'Upload',
    cancel: 'Cancel',
    completed: 'Completed',
    pending: 'Pending',
    fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    chooseYear: 'Choose Year',
    chooseMonth: 'Choose Month',
    chooseDate: 'Choose Date',
    prevDecade: 'Previous Decade',
    nextDecade: 'Next Decade',
    prevYear: 'Previous Year',
    nextYear: 'Next Year',
    prevMonth: 'Previous Month',
    nextMonth: 'Next Month',
    prevHour: 'Previous Hour',
    nextHour: 'Next Hour',
    prevMinute: 'Previous Minute',
    nextMinute: 'Next Minute',
    prevSecond: 'Previous Second',
    nextSecond: 'Next Second',
    prevMilliSecond: 'Previous Second',
    nextMilliSecond: 'Next Second',
    am: 'am',
    pm: 'pm',
    today: 'Today',
    now: 'Now',
    weekHeader: 'Wk',
    firstDayOfWeek: 0,
    showMonthAfterYear: false,
    dateFormat: 'mm/dd/yy',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordPrompt: 'Enter a password',
    emptyFilterMessage: 'No available options',
    emptyMessage: 'No results found',
    aria: {
        trueLabel: 'True',
        falseLabel: 'False',
        nullLabel: 'Not Selected',
        star: '1 star',
        stars: '{star} stars',
        selectAll: 'All items selected',
        unselectAll: 'All items unselected',
        close: 'Close',
        previous: 'Previous',
        next: 'Next',
        navigation: 'Navigation',
        scrollTop: 'Scroll Top',
        moveTop: 'Move Top',
        moveUp: 'Move Up',
        moveDown: 'Move Down',
        moveBottom: 'Move Bottom',
        moveToTarget: 'Move to Target',
        moveToSource: 'Move to Source',
        moveAllToTarget: 'Move All to Target',
        moveAllToSource: 'Move All to Source',
        pageLabel: 'Page {page}',
        firstPageLabel: 'First Page',
        lastPageLabel: 'Last Page',
        nextPageLabel: 'Next Page',
        previousPageLabel: 'Previous Page',
        rowsPerPageLabel: 'Rows per page',
        jumpToPageDropdownLabel: 'Jump to Page Dropdown',
        jumpToPageInputLabel: 'Jump to Page Input',
        selectRow: 'Row Selected',
        unselectRow: 'Row Unselected',
        expandRow: 'Row Expanded',
        collapseRow: 'Row Collapsed',
        showFilterMenu: 'Show Filter Menu',
        hideFilterMenu: 'Hide Filter Menu',
        filterOperator: 'Filter Operator',
        filterConstraint: 'Filter Constraint',
        editRow: 'Row Edit',
        saveEdit: 'Save Edit',
        cancelEdit: 'Cancel Edit',
        listView: 'List View',
        gridView: 'Grid View',
        slide: 'Slide',
        slideNumber: '{slideNumber}',
        zoomImage: 'Zoom Image',
        zoomIn: 'Zoom In',
        zoomOut: 'Zoom Out',
        rotateRight: 'Rotate Right',
        rotateLeft: 'Rotate Left',
        selectLabel: 'Select',
        unselectLabel: 'Unselect',
        expandLabel: 'Expand',
        collapseLabel: 'Collapse'
    }
}

const locales = {
    en: enEntries
}

type LocalesEntries = typeof enEntries
type LocalesEntryKey = keyof LocalesEntries
type LocalesNoAriaKey = keyof Omit<LocalesEntries, 'aria'>
type LocaleType = keyof typeof locales
type AriaEntries = typeof enEntries.aria
type AriaEntryKey = keyof AriaEntries

/**
 * Sets the current locale if installed.
 * @param {string} locale - Locale string.
 * @return {object} - Locale object.
 */
function locale(locale?: LocaleType): { locale: string; options: object } {
    locale && JAZZ_SVELTE.locale.set(locale)
    const newLocale = locale || (storeGet(JAZZ_SVELTE.locale) as LocaleType)

    return {
        locale: newLocale,
        options: locales[newLocale]
    }
}

/**
 * Installs a new locale.
 * @param {string} locale - Locale string.
 * @param {LocaleOptions} options - Locale options. See [PrimeLocale](https://github.com/primefaces/primelocale) on GitHub for possible options.
 */
function addLocale(locale: LocaleType, options: Partial<LocalesEntries>): void {
    locales[locale] = { ...locales['en'], ...options }
}

/**
 * Installs a new locale.
 * @param {string} locale - Locale string.
 * @param {LocaleOptions} options - Locale options. See [PrimeLocale](https://github.com/primefaces/primelocale) on GitHub for possible options.
 */
function updateLocaleOption(key: LocalesNoAriaKey, value: any, locale: LocaleType): void {
    ;(localeOptions(locale)[key] as any) = value
}

/**
 * Changes the option values of a locale.
 * @param {LocaleOptions} options - Locale options.
 * @param {string} locale - Locale string.
 */
function updateLocaleOptions(options: Partial<LocalesEntries>, locale?: LocaleType): void {
    const _locale = locale || (storeGet(JAZZ_SVELTE.locale) as LocaleType)

    locales[_locale] = { ...locales[_locale], ...options }
}

/**
 * Return the value of a specific locale option.
 * @param {string} key - Option key.
 * @param {string} locale - Locale string.
 */
function localeOption(key: LocalesEntryKey, locale?: LocaleType): any {
    const _locale = locale || (storeGet(JAZZ_SVELTE.locale) as LocaleType)

    try {
        return localeOptions(_locale)[key]
    } catch (error) {
        throw new Error(`The ${key} option is not found in the current locale('${_locale}').`)
    }
}

/**
 * Find an ARIA label in the locale by key.  If options are passed it will replace all options:
 * ```ts
 * const ariaValue = "Page {page}, User {user}, Role {role}";
 * const options = { page: 2, user: "John", role: "Admin" };
 * const result = ariaLabel('yourLabel', { page: 2, user: "John", role: "Admin" })
 * console.log(result); // Output: Page 2, User John, Role Admin
 * ```
 * @param {string} ariaKey key of the ARIA label to look up in locale.
 * @param {any} options JSON options like { page: 2, user: "John", role: "Admin" }
 * @returns the ARIA label with replaced values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ariaLabel(ariaKey: AriaEntryKey, options: { [key: string]: any }) {
    const _locale = storeGet(JAZZ_SVELTE.locale) as LocaleType

    try {
        let ariaLabel = localeOptions(_locale)['aria'][ariaKey]

        if (ariaLabel) {
            for (const key in options) {
                if (Object.prototype.hasOwnProperty.call(options, key)) {
                    ariaLabel = ariaLabel.replace(`{${key}}`, options[key])
                }
            }
        }

        return ariaLabel
    } catch (error) {
        throw new Error(`The ${ariaKey} option is not found in the current locale('${_locale}').`)
    }
}

/**
 * Returns the values of locale options.
 * @param {string} locale - Locale string.
 */
function localeOptions(locale?: LocaleType): LocalesEntries {
    const _locale = locale || (storeGet(JAZZ_SVELTE.locale) as LocaleType)

    return locales[_locale]
}

export { addLocale, ariaLabel, locale, localeOption, localeOptions, updateLocaleOption, updateLocaleOptions }
