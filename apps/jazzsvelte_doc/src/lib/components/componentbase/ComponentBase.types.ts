/* eslint-disable @typescript-eslint/no-explicit-any */
export type CmpBaseContext = { [key: string]: any }
export type CmpBaseProps = { [key: string]: any }
export type CmpBaseParams = { [key: string]: any }
export type CmpBaseMetadata = { [key: string]: any }
export type CmpBasePtmo = { [key: string]: any }
export type CmpBasePtCallback = (value: any, key: string, params: CmpBaseParams) => any

export interface ComponentBaseDefaultProps {
    pt?: undefined
    ptOptions?: undefined
    unstyled: boolean
}

export interface ComponentBaseProps {
    css?: string
    defaultProps?: object
}

export interface ComponentBaseChild extends ComponentBaseProps {
    getProps: (cProps: CmpBaseProps, context: CmpBaseContext) => CmpBaseProps
    getOtherProps: (cProps: CmpBaseProps) => CmpBaseProps
    setMetaData: (metadata: CmpBaseMetadata) => MetadataHandler
    defaultProps: CmpBaseProps
}

export interface MetadataHandler {
    ptm: (key: string, params: CmpBaseParams) => CmpBaseParams
    ptmo: (obj: CmpBasePtmo, key: string, params: CmpBaseParams) => CmpBaseParams
    sx: (key: string, params: CmpBaseParams, when: boolean) => CmpBaseParams | undefined
    cx: (key: string, params: CmpBaseParams) => any
    isUnstyled: () => boolean
}

export interface ComponentBaseType {
    cProps?: CmpBaseProps
    cParams?: CmpBaseParams
    cName?: string
    defaultProps: ComponentBaseDefaultProps
    context: CmpBaseContext
    globalCSS?: string
    classes: { [key: string]: string }
    styles: string
    extend: (props: ComponentBaseProps, context: CmpBaseContext) => ComponentBaseChild
}

export interface ComponentLifecycle {
    onMount?(): void
    onUnmont?(): void
    onBeforeUpdate?(): void
    onAfterUpdate?(): void
    onTick?(): void
}

/**
 * Custom hook to use to load style options for a component.
 * @param {string} styles - The style text content.
 * @param {boolean} isUnstyled - Flag removes component related styles in the core.
 * @param config - The component configuration.
 */
//export declare function useHandleStyle(styles: string, isUnstyled: () => boolean, config: { name: string; styled?: boolean; hostName?: string }): void;

export interface ComponentBasePassThroughOptions {
    lifecycle?: ComponentLifecycle
}

/**
 * @todo Update all d.ts with it.
 */
/*export interface ComponentBasePassThroughMethodOptions<P = any, S = any> {
    props?: P | undefined | null;
    state?: S | undefined | null;
}*/
