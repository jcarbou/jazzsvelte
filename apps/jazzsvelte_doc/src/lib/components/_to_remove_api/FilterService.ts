/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectUtils } from '../utils/Utils'

type DateLike = {
    getTime: () => number
}

function toValues(
    value: any,
    filter: string | DateLike,
    filterLocale?: string
): { noValues: true; filterValue: undefined; stringValue: undefined; filterAsDate: undefined } | { noValues: false; filterValue: string; stringValue: string; filterAsDate: DateLike } {
    if (value === undefined || value === null) {
        return { noValues: true, filterValue: undefined, stringValue: undefined, filterAsDate: undefined }
    }

    return {
        noValues: false,
        filterValue: ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale),
        stringValue: ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale),
        filterAsDate: filter as DateLike
    }
}

export const FilterService = {
    filter(value: any, fields: string[], filterValue: any, filterMatchMode: string, filterLocale?: string): any[] {
        const filteredItems: any[] = []

        if (!value) {
            return filteredItems
        }

        const filters: any = this.filters
        for (const item of value) {
            if (typeof item === 'string') {
                if (filters[filterMatchMode](item, filterValue, filterLocale)) {
                    filteredItems.push(item)
                    continue
                }
            } else {
                for (const field of fields) {
                    const fieldValue = ObjectUtils.resolveFieldData(item, field)

                    if (filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                        filteredItems.push(item)
                        break
                    }
                }
            }
        }

        return filteredItems
    },
    filters: {
        startsWith(value: any, filter: string, filterLocale?: string): boolean {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true
            }

            const { noValues, filterValue, stringValue } = toValues(value, filter, filterLocale)

            if (noValues) {
                return false
            }

            return stringValue.slice(0, filterValue.length) === filterValue
        },
        contains(value: any, filter: string, filterLocale?: string): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true
            }

            const { noValues, filterValue, stringValue } = toValues(value, filter, filterLocale)

            if (noValues) {
                return false
            }

            return stringValue.indexOf(filterValue) !== -1
        },
        notContains(value: any, filter: string, filterLocale?: string): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true
            }

            const { noValues, filterValue, stringValue } = toValues(value, filter, filterLocale)

            if (noValues) {
                return false
            }

            return stringValue.indexOf(filterValue) === -1
        },
        endsWith(value: any, filter: string, filterLocale?: string): boolean {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true
            }

            const { noValues, filterValue, stringValue } = toValues(value, filter, filterLocale)

            if (noValues) {
                return false
            }

            return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1
        },
        equals(value: any, filter: string | DateLike, filterLocale?: string): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true
            }

            const { noValues, filterValue, stringValue, filterAsDate } = toValues(value, filter, filterLocale)

            if (noValues) {
                return false
            }

            if (value.getTime && filterAsDate.getTime) return value.getTime() === filterAsDate.getTime()
            else return stringValue === filterValue
        },
        notEquals(value: any, filter: string, filterLocale?: string): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true
            }

            const { noValues, filterValue, stringValue, filterAsDate } = toValues(value, filter, filterLocale)

            if (noValues) {
                return false
            }

            if (value.getTime && filterAsDate.getTime) return value.getTime() !== filterAsDate.getTime()
            else return stringValue !== filterValue
        },
        in(value: any, filter: string): boolean {
            if (filter === undefined || filter === null || filter.length === 0) {
                return true
            }

            for (let i = 0; i < filter.length; i++) {
                if (ObjectUtils.equals(value, filter[i])) {
                    return true
                }
            }

            return false
        },
        between(value: any, filter: null | [any, any]): boolean {
            if (filter == null || filter[0] == null || filter[1] == null) {
                return true
            }

            if (value === undefined || value === null) {
                return false
            }

            if (value.getTime) return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime()
            else return filter[0] <= value && value <= filter[1]
        },
        lt(value: any, filter: any): boolean {
            if (filter === undefined || filter === null) {
                return true
            }

            if (value === undefined || value === null) {
                return false
            }

            if (value.getTime && filter.getTime) return value.getTime() < filter.getTime()
            else return value < filter
        },
        lte(value: any, filter: any): boolean {
            if (filter === undefined || filter === null) {
                return true
            }

            if (value === undefined || value === null) {
                return false
            }

            if (value.getTime && filter.getTime) return value.getTime() <= filter.getTime()
            else return value <= filter
        },
        gt(value: any, filter: any): boolean {
            if (filter === undefined || filter === null) {
                return true
            }

            if (value === undefined || value === null) {
                return false
            }

            if (value.getTime && filter.getTime) return value.getTime() > filter.getTime()
            else return value > filter
        },
        gte(value: any, filter: any): boolean {
            if (filter === undefined || filter === null) {
                return true
            }

            if (value === undefined || value === null) {
                return false
            }

            if (value.getTime && filter.getTime) return value.getTime() >= filter.getTime()
            else return value >= filter
        },
        dateIs(value: any, filter: any): boolean {
            if (filter === undefined || filter === null) {
                return true
            }

            if (value === undefined || value === null) {
                return false
            }

            return value.toDateString() === filter.toDateString()
        },
        dateIsNot(value: any, filter: any): boolean {
            if (filter === undefined || filter === null) {
                return true
            }

            if (value === undefined || value === null) {
                return false
            }

            return value.toDateString() !== filter.toDateString()
        },
        dateBefore(value: any, filter: any): boolean {
            if (filter === undefined || filter === null) {
                return true
            }

            if (value === undefined || value === null) {
                return false
            }

            return value.getTime() < filter.getTime()
        },
        dateAfter(value: any, filter: any): boolean {
            if (filter === undefined || filter === null) {
                return true
            }

            if (value === undefined || value === null) {
                return false
            }

            return value.getTime() > filter.getTime()
        }
    },
    register(rule: string, fn: (...arg: any[]) => boolean): void {
        const filters: any = this.filters
        filters[rule] = fn
    }
}
