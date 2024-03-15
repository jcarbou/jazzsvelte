function handler() {
    let zIndexes: { key: string; value: number }[] = []

    const generateZIndex = (key: string, autoZIndex: boolean, baseZIndex = 999) => {
        const lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex)
        const newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1

        zIndexes.push({ key, value: newZIndex })

        return newZIndex
    }

    const revertZIndex = (zIndex: number) => {
        zIndexes = zIndexes.filter((obj) => obj.value !== zIndex)
    }

    const getCurrentZIndex = (key: string, autoZIndex: boolean) => {
        return getLastZIndex(key, autoZIndex).value
    }

    const getLastZIndex = (key: string, autoZIndex: boolean, baseZIndex = 0) => {
        return [...zIndexes].reverse().find((obj) => (autoZIndex ? true : obj.key === key)) || { key, value: baseZIndex }
    }

    const getZIndex = (el?: HTMLElement): number => {
        return el ? parseInt(el.style.zIndex, 10) || 0 : 0
    }

    return {
        get: getZIndex,
        set: (key: string, el: HTMLElement, autoZIndex?: boolean, baseZIndex?: number): void => {
            if (el) {
                el.style.zIndex = String(generateZIndex(key, !!autoZIndex, baseZIndex))
            }
        },
        clear: (el: HTMLElement): void => {
            if (el) {
                revertZIndex(ZIndexUtils.get(el))
                el.style.zIndex = ''
            }
        },
        getCurrent: (key: string, autoZIndex?: boolean): number => getCurrentZIndex(key, !!autoZIndex)
    }
}

export const ZIndexUtils = handler()
