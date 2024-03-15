/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Readable, Writable } from 'svelte/store'
import type { BooleanStore } from '../utils/customStore.types'

/**
 * Value (of type S) or function with current value as argument and returning new value
 */
export type SetStateAction<S> = S | ((prevState: S) => S)

/**
 * Takes an action as a parameter and returns nothing meaningful (void).
 */
export type Dispatch<A> = (action: A) => void

/**
 *
 * API for JazzSvelte components.
 *
 * @module api
 *
 */
// import { AccordionPassThroughOptions, AccordionTabPassThroughOptions } from '../accordion/accordion'
// import { AutoCompletePassThroughOptions } from '../autocomplete/autocomplete'
// import { AvatarPassThroughOptions } from '../avatar/avatar'
// import { AvatarGroupPassThroughOptions } from '../avatargroup/avatargroup'
import type { BadgePassThroughOptions } from '../badge/badge.types'
// import { BlockUIPassThroughOptions } from '../blockui/blockui'
// import { BreadCrumbPassThroughOptions } from '../breadcrumb/breadcrumb'
//import { ButtonPassThroughOptions } from '../button/button'
// import { CalendarPassThroughOptions } from '../calendar/calendar'
// import { CardPassThroughOptions } from '../card/card'
// import { CarouselPassThroughOptions } from '../carousel/carousel'
// import { CascadeSelectPassThroughOptions } from '../cascadeselect/cascadeselect'
// import { ChartPassThroughOptions } from '../chart/chart'
// import { CheckboxPassThroughOptions } from '../checkbox/checkbox'
// import { ChipPassThroughOptions } from '../chip/chip'
// import { ChipsPassThroughOptions } from '../chips/chips'
// import { ColorPickerPassThroughOptions } from '../colorpicker/colorpicker'
// import { ColumnPassThroughOptions } from '../column/column'
// import { ColumnGroupPassThroughOptions } from '../columngroup/columngroup'
// import { ConfirmDialogPassThroughOptions } from '../confirmdialog/confirmdialog'
// import { ConfirmPopupPassThroughOptions } from '../confirmpopup/confirmpopup'
// import { ContextMenuPassThroughOptions } from '../contextmenu/contextmenu'
// import { DataTablePassThroughOptions } from '../datatable/datatable'
// import { DataViewLayoutOptionsPassThroughOptions, DataViewPassThroughOptions } from '../dataview/dataview'
// import { DeferredContentPassThroughOptions } from '../deferredcontent/deferredcontent'
// import { DialogPassThroughOptions } from '../dialog/dialog'
// import { DividerPassThroughOptions } from '../divider/divider'
// import { DockPassThroughOptions } from '../dock/dock'
// import { DropdownPassThroughOptions } from '../dropdown/dropdown'
// import { EditorPassThroughOptions } from '../editor/editor'
// import { FieldsetPassThroughOptions } from '../fieldset/fieldset'
// import { FileUploadPassThroughOptions } from '../fileupload/fileupload'
// import { GalleriaPassThroughOptions } from '../galleria/galleria'
// import { ImagePassThroughOptions } from '../image/image'
// import { InplacePassThroughOptions } from '../inplace/inplace'
// import { InputNumberPassThroughOptions } from '../inputnumber/inputnumber'
// import { InputSwitchPassThroughOptions } from '../inputswitch/inputswitch'
// import { InputTextPassThroughOptions } from '../inputtext/inputtext'
// import { InputTextareaPassThroughOptions } from '../inputtextarea/inputtextarea'
// import { KnobPassThroughOptions } from '../knob/knob'
// import { ListboxPassThroughOptions } from '../listbox/listbox'
// import { MegaMenuPassThroughOptions } from '../megamenu/megamenu'
// import { MentionPassThroughOptions } from '../mention/mention'
// import { MenuPassThroughOptions } from '../menu/menu'
// import { MenubarPassThroughOptions } from '../menubar/menubar'
// import { MessagePassThroughOptions } from '../message/message'
// import { MessagesPassThroughOptions } from '../messages/messages'
// import { MultiSelectPassThroughOptions } from '../multiselect/multiselect'
// import { MultiStateCheckboxPassThroughOptions } from '../multistatecheckbox/multistatecheckbox'
// import { OrderListPassThroughOptions } from '../orderlist/orderlist'
// import { OrganizationChartPassThroughOptions } from '../organizationchart/organizationchart'
// import { OverlayPanelPassThroughOptions } from '../overlaypanel/overlaypanel'
// import { PaginatorPassThroughOptions } from '../paginator/paginator'
// import { PanelPassThroughOptions } from '../panel/panel'
// import { PanelMenuPassThroughOptions } from '../panelmenu/panelmenu'
// import { PassThroughOptions } from '../passthrough'
// import { PasswordPassThroughOptions } from '../password/password'
// import { PickListPassThroughOptions } from '../picklist/picklist'
// import { ProgressBarPassThroughOptions } from '../progressbar/progressbar'
// import { ProgressSpinnerPassThroughOptions } from '../progressspinner/progressspinner'
// import { RadioButtonPassThroughOptions } from '../radiobutton/radiobutton'
// import { RatingPassThroughOptions } from '../rating/rating'
// import { RowPassThroughOptions } from '../row/row'
// import { ScrollPanelPassThroughOptions } from '../scrollpanel/scrollpanel'
// import { ScrollTopPassThroughOptions } from '../scrolltop/scrolltop'
// import { SelectButtonPassThroughOptions } from '../selectbutton/selectbutton'
// import { SidebarPassThroughOptions } from '../sidebar/sidebar'
// import { SkeletonPassThroughOptions } from '../skeleton/skeleton'
// import { SlideMenuPassThroughOptions } from '../slidemenu/slidemenu'
// import { SliderPassThroughOptions } from '../slider/slider'
// import { SpeedDialPassThroughOptions } from '../speeddial/speeddial'
// import { SplitButtonPassThroughOptions } from '../splitbutton/splitbutton'
// import { SplitterPassThroughOptions } from '../splitter/splitter'
// import { StepsPassThroughOptions } from '../steps/steps'
// import { TabMenuPassThroughOptions } from '../tabmenu/tabmenu'
// import { TabPanelPassThroughOptions, TabViewPassThroughOptions } from '../tabview/tabview'
// import { TagPassThroughOptions } from '../tag/tag'
// import { TerminalPassThroughOptions } from '../terminal/terminal'
// import { TieredMenuPassThroughOptions } from '../tieredmenu/tieredmenu'
// import { TimelinePassThroughOptions } from '../timeline/timeline'
// import { ToastPassThroughOptions } from '../toast/toast'
// import { ToggleButtonPassThroughOptions } from '../togglebutton/togglebutton'
// import { ToolbarPassThroughOptions } from '../toolbar/toolbar'
// import { TooltipPassThroughOptions } from '../tooltip/tooltip'
// import { TreePassThroughOptions } from '../tree/tree'
// import { TreeSelectPassThroughOptions } from '../treeselect/treeselect'
// import { TreeTablePassThroughOptions } from '../treetable/treetable'
// import { VirtualScrollerPassThroughOptions } from '../virtualscroller/virtualscroller'
export type InputStyleType = 'outlined' | 'filled'

export type AppendToType = 'self' | HTMLElement | undefined | null | (() => HTMLElement)

export type StyleContainerType = ShadowRoot | HTMLElement | undefined | null

export interface PassThroughOptions {
    /**
     * Should the passthrough merge sections?
     */
    mergeSections?: boolean | undefined
    /**
     * Should the passthrough merge properties?
     */
    mergeProps?: boolean | undefined
    /**
     * Custom merge function such as twMerge for Tailwind merging.
     * @param className1 the first className to merge
     * @param className2 the second className to merge to className1
     * @returns the merged className
     */
    classNameMergeFunction?: (className1: string, className2: string) => string | undefined
}

/**
 * ZIndex configuration options.
 */
export interface ZIndexOptions {
    /**
     * Sets the base index value for Dialog and Sidebar components.
     * @defaultValue 1100
     */
    modal: number
    /**
     * Sets the base index value for Overlay components such as Dropdown and OverlayPanel.
     * @defaultValue 1000
     */
    overlay: number
    /**
     * Sets the base index value for Overlay menus.
     * @defaultValue 1000
     */
    menu: number
    /**
     * Sets the base index value for Tooltip.
     * @defaultValue 1100
     */
    tooltip: number
    /**
     * Sets the base index value for Toast.
     * @defaultValue 1200
     */
    toast: number
}

/**
 * Filter match modes for DataTable filter menus.
 */
export interface FilterMatchModeOptions {
    /**
     * Array of filter match modes for text filtering.
     */
    text: any[]
    /**
     * Array of filter match modes for numeric filtering.
     */
    numeric: any[]
    /**
     * Array of filter match modes for date filtering.
     */
    date: any[]
}

/**
 * This option allows to direct implementation of all relevant attributes (e.g., style, classnames) within the respective HTML tag globally for all components.
 */
export interface JazzSveltePTOptions {
    // /**
    //  * Custom passthrough(pt) options for Accordion.
    //  */
    // accordion?: AccordionPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for AccordionTab.
    //  */
    // accordiontab?: AccordionTabPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for AutoComplete.
    //  */
    // autocomplete?: AutoCompletePassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Avatar.
    //  */
    // avatar?: AvatarPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for AvatarGroup.
    //  */
    // avatargroup?: AvatarGroupPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Badge.
    //  */
    badge?: BadgePassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for BlockUI.
    //  */
    // blockui?: BlockUIPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Breadcrumb.
    //  */
    // breadcrumb?: BreadCrumbPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Button.
    //  */
    // button?: ButtonPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Calendar.
    //  */
    // calendar?: CalendarPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Card.
    //  */
    // card?: CardPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Carousel.
    //  */
    // carousel?: CarouselPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for CascadeSelect.
    //  */
    // cascadeselect?: CascadeSelectPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Chart.
    //  */
    // chart?: ChartPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Checkbox.
    //  */
    // checkbox?: CheckboxPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Chip.
    //  */
    // chip?: ChipPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Chips.
    //  */
    // chips?: ChipsPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for ColorPicker.
    //  */
    // colorpicker?: ColorPickerPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Column.
    //  */
    // column?: ColumnPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for ColumnGroup.
    //  */
    // columngroup?: ColumnGroupPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for ConfirmDialog.
    //  */
    // confirmdialog?: ConfirmDialogPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for ConfirmPopup.
    //  */
    // confirmpopup?: ConfirmPopupPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for ContextMenu.
    //  */
    // contextmenu?: ContextMenuPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for DataTable.
    //  */
    // datatable?: DataTablePassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for DataView.
    //  */
    // dataview?: DataViewPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for DataViewLayoutOptions.
    //  */
    // dataviewlayoutoptions?: DataViewLayoutOptionsPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for DeferredContent.
    //  */
    // deferredcontent?: DeferredContentPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Dialog.
    //  */
    // dialog?: DialogPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Divider.
    //  */
    // divider?: DividerPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Dock.
    //  */
    // dock?: DockPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Dropdown.
    //  */
    // dropdown?: DropdownPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Editor.
    //  */
    // editor?: EditorPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Fieldset.
    //  */
    // fieldset?: FieldsetPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for FileUpload.
    //  */
    // fileupload?: FileUploadPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for FullCalendar.
    //  */
    // galleria?: GalleriaPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Galleria.
    //  */
    // image?: ImagePassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Inplace.
    //  */
    // inplace?: InplacePassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for InputMask.
    //  */
    // inputmask?: InputTextPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for InputNumber.
    //  */
    // inputnumber?: InputNumberPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for InputSwitch.
    //  */
    // inputswitch?: InputSwitchPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for InputText.
    //  */
    // inputtext?: InputTextPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for InputTextarea.
    //  */
    // inputtextarea?: InputTextareaPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Knob.
    //  */
    // knob?: KnobPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Listbox.
    //  */
    // listbox?: ListboxPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for MegaMenu.
    //  */
    // megamenu?: MegaMenuPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Mention.
    //  */
    // mention?: MentionPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Menu.
    //  */
    // menu?: MenuPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Menubar.
    //  */
    // menubar?: MenubarPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Message.
    //  */
    // message?: MessagePassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Messages.
    //  */
    // messages?: MessagesPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for MultiSelect.
    //  */
    // multiselect?: MultiSelectPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for MultiStateCheckbox.
    //  */
    // multistatecheckbox?: MultiStateCheckboxPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for OrderList.
    //  */
    // orderlist?: OrderListPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for OrganizationChart.
    //  */
    // organizationchart?: OrganizationChartPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for OverlayPanel.
    //  */
    // overlaypanel?: OverlayPanelPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Paginator.
    //  */
    // paginator?: PaginatorPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Panel.
    //  */
    // panel?: PanelPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for PanelMenu.
    //  */
    // panelmenu?: PanelMenuPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Password.
    //  */
    // password?: PasswordPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for PickList.
    //  */
    // picklist?: PickListPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for ProgressBar.
    //  */
    // progressbar?: ProgressBarPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for ProgressSpinner.
    //  */
    // progressspinner?: ProgressSpinnerPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for RadioButton.
    //  */
    // radiobutton?: RadioButtonPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Rating.
    //  */
    // rating?: RatingPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Row.
    //  */
    // row?: RowPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for ScrollPanel.
    //  */
    // scrollpanel?: ScrollPanelPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for ScrollTop.
    //  */
    // scrolltop?: ScrollTopPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for SelectButton.
    //  */
    // selectbutton?: SelectButtonPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Sidebar.
    //  */
    // sidebar?: SidebarPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Skeleton.
    //  */
    // skeleton?: SkeletonPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for SliderMenu.
    //  */
    // slidemenu?: SlideMenuPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Slider.
    //  */
    // slider?: SliderPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for SpeedDial.
    //  */
    // speeddial?: SpeedDialPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for SplitButton.
    //  */
    // splitbutton?: SplitButtonPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Splitter.
    //  */
    // splitter?: SplitterPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Steps.
    //  */
    // steps?: StepsPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for TabMenu.
    //  */
    // tabmenu?: TabMenuPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for TabPanel.
    //  */
    // tabpanel?: TabPanelPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for TabView.
    //  */
    // tabview?: TabViewPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Tag.
    //  */
    // tag?: TagPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Terminal.
    //  */
    // terminal?: TerminalPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for TieredMenu.
    //  */
    // tieredmenu?: TieredMenuPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Timeline.
    //  */
    // timeline?: TimelinePassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Toast.
    //  */
    // toast?: ToastPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for ToffleButton.
    //  */
    // togglebutton?: ToggleButtonPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Toolbar.
    //  */
    // toolbar?: ToolbarPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Tooltip.
    //  */
    // tooltip?: TooltipPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for Tree.
    //  */
    // tree?: TreePassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for TreeSelect.
    //  */
    // treeselect?: TreeSelectPassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for TreeTable.
    //  */
    // treetable?: TreeTablePassThroughOptions
    // /**
    //  * Custom passthrough(pt) options for VirtualScroller.
    //  */
    // virtualscroller?: VirtualScrollerPassThroughOptions
    /**
     * Custom passthrough(pt) options for global css.
     */
    global?: {
        css?: (options: any) => string | string | undefined
    }
}

/**
 * Configuration options for the JazzSvelte components.
 */
export interface JazzSvelte {
    /**
     * When enabled, it removes all of components styles in the core.
     * @defaultValue false
     */
    unstyled: boolean

    /**
     * This option allows components with overlays like dropdowns or popups to be mounted into either the component or any DOM element, such as document body and self.
     */
    appendTo: AppendToType

    /**
     * This option allows `useStyle` to insert dynamic CSS styles into a specific container. This is useful when styles need to be scoped such as in a Shadow DOM.
     * @defaultValue document.head
     */
    styleContainer: StyleContainerType

    /**
     * ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. When autoZIndex is false, each group increments its zIndex within itself. Each property is optional, so when autoZIndex is enabled you can set the z-index for any component type, and the rest will be calculated automatically.
     * @defaultValue { modal: 1100, overlay: 1000, menu: 1000, tooltip: 1100, toast: 1200}
     */
    zIndex: Partial<ZIndexOptions>

    /**
     * This option allows to direct implementation of all relevant attributes (e.g., style, classnames) within the respective HTML tag.
     */
    pt?: JazzSveltePTOptions

    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions: PassThroughOptions

    /**
     * ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. When autoZIndex is false, each group increments its zIndex within itself.
     */
    autoZIndex: BooleanStore
    /**
     * JazzSvelte components utilize "react-transition-group" internally to implement animations.
     * Setting "cssTransition" to "false" disables all animations.
     * @defaultValue true
     */
    cssTransition: BooleanStore
    /**
     * Default filter modes to display on DataTable filter menus.
     */
    filterMatchModeOptions: Writable<FilterMatchModeOptions>
    /**
     * Define behavior if the browser window is scrolled while displaying an overlay panel like a Dropdown or Calendar. Depending on your organization's accessibility needs some prefer panels to be closed on scrolling and some prefer the overlay follow the scroll.
     * @defaultValue false
     */
    hideOverlaysOnDocumentScrolling: BooleanStore
    /**
     * Input fields have two styles: default (outlined with borders) and filled (background-colored).
     * Applying 'p-input-filled' to an input's ancestor enables the filled style.
     */
    inputStyle: Writable<InputStyleType>
    /**
     * The locale configuration sets up the language and region specific preferences.
     * @defaultValue 'en'
     */
    locale: Writable<string>
    /**
     * The nonce value to use on dynamically generated style elements.
     */
    nonce: Writable<string | null>
    /**
     * Determines how null values are sorted.
     * @defaultValue 1
     */
    nullSortOrder: Writable<number>
    /**
     * Ripple is an optional animation for the supported components such as buttons.
     * @defaultValue false
     */
    ripple: Writable<boolean>
    /**
     * Current theme.
     * @defaultValue 'lara-light-amber'
     */
    theme: Writable<string>

    /**
     * Theme dark mode enabled (if available).
     * @defaultValue false
     */
    darkMode: BooleanStore

    /**
     * Computed  theme path
     * @defaultValue 'lara-light-amber'
     */
    themePath: Readable<string>

    /**
     * Method to configure JassSvelte on stratup
     * @param options options
     */
    config: (options: Partial<JazzSvelteOptions>) => void
}

/**
 * Configuration options for the JazzSvelte components.
 */
export interface JazzSvelteOptions {
    /**
     * When enabled, it removes all of components styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean

    /**
     * This option allows components with overlays like dropdowns or popups to be mounted into either the component or any DOM element, such as document body and self.
     */
    appendTo?: AppendToType

    /**
     * This option allows `useStyle` to insert dynamic CSS styles into a specific container. This is useful when styles need to be scoped such as in a Shadow DOM.
     * @defaultValue document.head
     */
    styleContainer?: StyleContainerType

    /**
     * ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. When autoZIndex is false, each group increments its zIndex within itself. Each property is optional, so when autoZIndex is enabled you can set the z-index for any component type, and the rest will be calculated automatically.
     * @defaultValue { modal: 1100, overlay: 1000, menu: 1000, tooltip: 1100, toast: 1200}
     */
    zIndex?: Partial<ZIndexOptions>

    /**
     * This option allows to direct implementation of all relevant attributes (e.g., style, classnames) within the respective HTML tag.
     */
    pt?: JazzSveltePTOptions

    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions

    /**
     * ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. When autoZIndex is false, each group increments its zIndex within itself.
     */
    autoZIndex?: boolean
    /**
     * JazzSvelte components utilize "react-transition-group" internally to implement animations.
     * Setting "cssTransition" to "false" disables all animations.
     * @defaultValue true
     */
    cssTransition?: boolean
    /**
     * Default filter modes to display on DataTable filter menus.
     */
    filterMatchModeOptions?: FilterMatchModeOptions
    /**
     * Define behavior if the browser window is scrolled while displaying an overlay panel like a Dropdown or Calendar. Depending on your organization's accessibility needs some prefer panels to be closed on scrolling and some prefer the overlay follow the scroll.
     * @defaultValue false
     */
    hideOverlaysOnDocumentScrolling?: boolean
    /**
     * Input fields have two styles: default (outlined with borders) and filled (background-colored).
     * Applying 'p-input-filled' to an input's ancestor enables the filled style.
     */
    inputStyle?: InputStyleType
    /**
     * The locale configuration sets up the language and region specific preferences.
     * @defaultValue 'en'
     */
    locale?: string
    /**
     * The nonce value to use on dynamically generated style elements.
     */
    nonce?: string
    /**
     * Determines how null values are sorted.
     * @defaultValue 1
     */
    nullSortOrder?: number
    /**
     * Ripple is an optional animation for the supported components such as buttons.
     * @defaultValue false
     */
    ripple?: boolean
    /**
     * Current theme.
     * @defaultValue 'lara-light-amber'
     */
    theme?: string

    /**
     * Theme dark mode enabled (if available).
     * @defaultValue false
     */
    darkMode?: boolean
}
