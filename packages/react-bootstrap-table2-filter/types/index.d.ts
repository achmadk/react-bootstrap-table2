/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="node" />
import { CSSProperties, ComponentType, Consumer } from 'react';
import { ReactBootstrapTableUtilities, BootstrapTableColumns, DefaultTableData, EventEmitter } from 'react-bootstrap-table-next-esm';
export declare const FILTER_TYPES: {
    TEXT: 'TEXT';
    SELECT: 'SELECT';
    MULTISELECT: 'MULTISELECT';
    NUMBER: 'NUMBER';
    DATE: 'DATE';
};

export declare type FilterType = typeof FILTER_TYPES
/**
 * Filter comparators used for table filters
 */
export declare const Comparator: {
    LIKE: 'LIKE';
    EQ: '=';
    NE: '!=';
    GT: '>';
    GE: '>=';
    LT: '<';
    LE: '<=';
};

export declare type ComparatorType = typeof Comparator

export declare type DefaultReactBootstrapTableFilter<FilterProps = any, FilterComponentProps = any> = {
    Filter: ComponentType<FilterComponentProps>;
    props: FilterProps;
};
export interface TextFilterOptionalProps {
    /**
     * custom element HTML id for filter
     *
     * @type {string}
     * @memberof TextFilterOptionalProps
     */
    id: string;
    /**
     * custom the input placeholder
     *
     * @type {string}
     * @memberof TextFilterOptionalProps
     */
    placeholder: string;
    /**
     * custom class name on input
     *
     * @type {string}
     * @memberof TextFilterOptionalProps
     */
    className: string;
    /**
     * default filtering value
     *
     * @type {string}
     * @memberof TextFilterOptionalProps
     */
    defaultValue: string;
    /**
     * Specify what kind of comparator to compare.
     * @default Comparator.LIKE
     *
     * @type {ComparatorType[keyof ComparatorType]}
     * @memberof TextFilterOptionalProps
     */
    comparator: ComparatorType[keyof ComparatorType];
    /**
     * this props able to set true if comparator is LIKE.
     * @default false
     *
     * @type {boolean}
     * @memberof TextFilterOptionalProps
     */
    caseSensitive: boolean;
    /**
     * your custom inline styles on input
     *
     * @type {CSSProperties}
     * @memberof TextFilterOptionalProps
     */
    style: CSSProperties;
    /**
     * Debounce time in millisecond, which means how long will trigger filtering after user typing
     * @default 500
     *
     * @type {number}
     * @memberof TextFilterOptionalProps
     */
    delay: number;
    /**
     * export filter function to allow users to access. For textFilter, filter(value) to filter columns dynamically.
     *
     * @param {*} filter
     * @memberof TextFilterOptionalProps
     */
    getFilter(filter: any): void;
    /**
     * Register a listener which will be called when column filter being triggered.
     * If you return an array value, react-bootstrap-table2 will adopt this value as final filtered result.
     *
     * @param {TableData[TableDataKeys]} value
     * @return {*}  {(void | Promise<void>)}
     * @memberof TextFilterOptionalProps
     */
    onFilter(value: any): void | Promise<void> | any[];
}
export interface TextFilterProps extends Partial<TextFilterOptionalProps> {
}
/**
 * text column filter
 * @param props text filter options
 */
export declare function textFilter<FilterComponentProps = any>(props?: TextFilterProps, filterComponent?: ComponentType<FilterComponentProps>): DefaultReactBootstrapTableFilter<TextFilterProps, FilterComponentProps>;
export interface SelectFilterOptionalProps {
    /**
     * custom element HTML id for filter
     *
     * @type {string}
     * @memberof SelectFilterOptionalProps
     */
    id: string;
    /**
     * custom class name on input
     *
     * @type {string}
     * @memberof SelectFilterOptionalProps
     */
    className: string;
    /**
     * When it was set to true, the drop down list would hide the default selection.
     *
     * @type {boolean}
     * @memberof SelectFilterOptionalProps
     */
    withoutEmptyOption: boolean;
    /**
     * default filtering value
     *
     * @type {string}
     * @memberof SelectFilterOptionalProps
     */
    defaultValue: string;
    /**
     * Specify what kind of comparator to compare.
     * @default EQ
     *
     * @type {ComparatorType[keyof ComparatorType]}
     * @memberof SelectFilterOptionalProps
     */
    comparator: ComparatorType[keyof ComparatorType];
    /**
     * your custom inline styles on input
     *
     * @type {CSSProperties}
     * @memberof SelectFilterOptionalProps
     */
    style: CSSProperties;
    /**
     * export filter function to allow users to access. For selectFilter, filter(value) to filter columns dynamically.
     *
     * @param {*} filter
     * @memberof SelectFilterOptionalProps
     */
    getFilter(filter: any): void;
    /**
     * Register a listener which will be called when column filter being triggered.
     * If you return an array value, react-bootstrap-table2 will adopt this value as final filtered result.
     *
     * @param {TableData[TableDataKeys]} value
     * @return {*}  {(void | Promise<void>)}
     * @memberof TextFilterOptionalProps
     */
    onFilter(value: any): void | Promise<void> | any[];
}
export interface SelectFilterOptions {
    value: number;
    label: string;
}
export interface SelectFilterProps extends Partial<SelectFilterOptionalProps> {
    /**
     * the options for the list of dropdown.
     *
     * @memberof SelectFilterProps
     * @example
     * ```js
     * const selectOptions = {
     *   0: 'good',
     *   1: 'Bad',
     *   2: 'unknown'
     * };
     * ```
     * OR
     * ```js
     * const selectOptions = [
     *   { value: 0, label: 'good' },
     *   { value: 1, label: 'Bad' },
     *   { value: 2, label: 'unknown' }
     * ];
     * ```
     * OR
     * ```js
     * const selectOptions = () = [
     *   { value: 0, label: 'good' },
     *   { value: 1, label: 'Bad' },
     *   { value: 2, label: 'unknown' }
     * ];
     * ```
     */
    options: Record<number, string> | SelectFilterOptions[] | (() => SelectFilterOptions[]);
}
/**
 * single select column filter
 * @param props Select filter options
 */
export declare function selectFilter<FilterComponentProps = any>(props: SelectFilterProps, filterComponent: ComponentType<FilterComponentProps>): DefaultReactBootstrapTableFilter<SelectFilterProps, FilterComponentProps>;
export interface MultiSelectFilterOptionalProps {
    /**
     * custom element HTML id for filter
     *
     * @type {string}
     * @memberof MultiSelectFilterOptionalProps
     */
    id: string;
    /**
     * custom class name on input
     *
     * @type {string}
     * @memberof MultiSelectFilterOptionalProps
     */
    className: string;
    /**
     * When it was set to true, the drop down list would hide the default selection.
     *
     * @type {boolean}
     * @memberof MultiSelectFilterOptionalProps
     */
    withoutEmptyOption: boolean;
    /**
     * default filtering value
     *
     * @type {number[]}
     * @memberof MultiSelectFilterOptionalProps
     */
    defaultValue: number[];
    /**
     * Specify what kind of comparator to compare.
     * @default EQ
     *
     * @type {ComparatorType[keyof ComparatorType]}
     * @memberof MultiSelectFilterOptionalProps
     */
    comparator: ComparatorType[keyof ComparatorType];
    /**
     * your custom inline styles on input
     *
     * @type {CSSProperties}
     * @memberof MultiSelectFilterOptionalProps
     */
    style: CSSProperties;
    /**
     * export filter function to allow users to access.
     * For multiSelectFilter, filter(value) to filter columns dynamically.
     *
     * @param {*} filter
     * @memberof MultiSelectFilterOptionalProps
     */
    getFilter(filter: any): void;
    /**
     * Register a listener which will be called when column filter being triggered.
     * If you return an array value, react-bootstrap-table2 will adopt this value as final filtered result.
     *
     * @param {*} value
     * @return {*}  {(void | Promise<void> | any[])}
     * @memberof MultiSelectFilterOptionalProps
     */
    onFilter(value: any): void | Promise<void> | any[];
}
export interface MultiSelectFilterProps extends Partial<MultiSelectFilterOptionalProps> {
    options: Record<number, string>;
}
/**
 * multiSelectFilter adds multi select filtering to a column
 * @param props filter options
 */
export declare function multiSelectFilter<FilterComponentProps = any>(props: MultiSelectFilterProps, FilterComponent?: ComponentType<FilterComponentProps>): DefaultReactBootstrapTableFilter<MultiSelectFilterProps, FilterComponentProps>;
/**
 * Number filter configuration options
 */
export interface NumberFilterOptionalProps {
    /**
     * ustom element HTML id for filter
     *
     * @type {string}
     * @memberof NumberFilterOptionalProps
     */
    id: string;
    /**
     * Once the options has been defined, it will render number select drop down instead of number input field.
     *
     * @type {number[]}
     * @memberof NumberFilterOptionalProps
     */
    options: number[];
    /**
     * Debounce time in millisecond. how long will trigger filtering after user typing.
     * @default 500
     *
     * @type {number}
     * @memberof NumberFilterOptionalProps
     */
    delay: number;
    /**
     * customized placeholder for number input.
     *
     * @type {string}
     * @memberof NumberFilterOptionalProps
     */
    placeholder: string;
    /**
     * When set to true comparator dropdown does not show a "no selection" option
     */
    withoutEmptyComparatorOption: boolean;
    /**
     * When it was set to true, the drop down list of number would hide the default selection.
     * Besides, before picking up this prop, please make sure that you've defined the props.options correctly.
     *
     * @type {boolean}
     * @memberof NumberFilterOptionalProps
     */
    withoutEmptyNumberOption: boolean;
    /**
     * It is the default filtering value. Furthermore, it accepts 2 attributes:
     * - number: filter value
     * - comparator: what kind of comparator to compare
     *
     * @type {{ number: number; comparator: Comparator[keyof Comparator] }}
     * @memberof NumberFilterOptionalProps
     */
    defaultValue: {
        number: number;
        comparator: ComparatorType[keyof ComparatorType];
    };
    /**
     * Specify what kind of comparator to compare. Default is to list all of comparators.
     *
     * @type {ComparatorType[keyof ComparatorType][]}
     * @memberof NumberFilterOptionalProps
     */
    comparators: ComparatorType[keyof ComparatorType][];
    /**
     * custom class name on the wrapper of number input and comparator drop down.
     *
     * @type {string}
     * @memberof NumberFilterOptionalProps
     */
    className: string;
    /**
     * custom class name on the comparator drop down.
     *
     * @type {string}
     * @memberof NumberFilterOptionalProps
     */
    comparatorClassName: string;
    /**
     * custom class name on the number input.
     *
     * @type {string}
     * @memberof NumberFilterOptionalProps
     */
    numberClassName: string;
    /**
     * custom inline styles on the wrapper of number input and comparator drop down.
     *
     * @type {CSSProperties}
     * @memberof NumberFilterOptionalProps
     */
    style: CSSProperties;
    /**
     * custom inline styles on the comparator drop down.
     *
     * @type {CSSProperties}
     * @memberof NumberFilterOptionalProps
     */
    comparatorStyle: CSSProperties;
    /**
     * custom inline styles on the number input.
     *
     * @type {CSSProperties}
     * @memberof NumberFilterOptionalProps
     */
    numberStyle: CSSProperties;
    /**
     * export filter function to allow users to access.
     * For numberFilter, filter({ number, comparator }) to filter columns dynamically.
     *
     * @param {*} filter
     * @memberof NumberFilterOptionalProps
     */
    getFilter(filter: any): void;
    /**
     * Register a listener which will be called when column filter being triggered.
     * If you return an array value, react-bootstrap-table2 will adopt this value as final filted result.
     *
     * @param {*} filterValue
     * @return {*}  {(any[] | void | Promise<void>)}
     * @memberof NumberFilterOptionalProps
     */
    onFilter(filterValue: any): any[] | void | Promise<void>;
}
export interface NumberFilterProps extends Partial<NumberFilterOptionalProps> {
}
export declare function numberFilter<FilterComponentProps = any>(props?: NumberFilterProps, filterComponent?: ComponentType<FilterComponentProps>): DefaultReactBootstrapTableFilter<NumberFilterProps, FilterComponentProps>;
export interface DateFilterOptionalProps {
    /**
     * custom element HTML id for filter
     *
     * @type {string}
     * @memberof DateFilterOptionalProps
     */
    id: string;
    /**
     * Debounce time in millisecond.
     * Which means how long will trigger filtering after user typing.
     * @default 0
     *
     * @type {number}
     * @memberof DateFilterOptionalProps
     */
    delay: number;
    /**
     * customized placeholder for date input.
     *
     * @type {string}
     * @memberof DateFilterOptionalProps
     */
    placeholder: string;
    /**
     * When it was set to true, the drop down list of comparator would hide the default selection.
     *
     * @type {boolean}
     * @memberof DateFilterOptionalProps
     */
    withoutEmptyComparatorOption: boolean;
    /**
     * It is the default filtering value. Furthermore, it accepts 2 attributes:
     * - date: a date object which need to be filtered
     * - comparator: what kind of comparator to compare
     *
     * @type {{ date: Date, comparator: ComparatorType[keyof ComparatorType] }}
     * @memberof DateFilterOptionalProps
     */
    defaultValue: {
        date: Date;
        comparator: ComparatorType[keyof ComparatorType];
    };
    /**
     * Specify what kind of comparator to compare.
     * Default is to list all of comparators.
     *
     * @type {ComparatorType[keyof ComparatorType][]}
     * @memberof DateFilterOptionalProps
     */
    comparator: ComparatorType[keyof ComparatorType][];
    /**
     * custom class name on the wrapper of date input and comparator drop down.
     *
     * @type {string}
     * @memberof DateFilterOptionalProps
     */
    className: string;
    /**
     * custom class name on the comparator drop down.
     *
     * @type {string}
     * @memberof DateFilterOptionalProps
     */
    comparatorClassName: string;
    /**
     * custom class name on the date input.
     *
     * @type {string}
     * @memberof DateFilterOptionalProps
     */
    dateClassName: string;
    /**
     * custom inline styles on the wrapper of date input and comparator drop down.
     *
     * @type {CSSProperties}
     * @memberof DateFilterOptionalProps
     */
    style: CSSProperties;
    /**
     * custom inline styles on the comparator drop down.
     *
     * @type {CSSProperties}
     * @memberof DateFilterOptionalProps
     */
    comparatorStyle: CSSProperties;
    /**
     * custom inline styles on the date input.
     *
     * @type {CSSProperties}
     * @memberof DateFilterOptionalProps
     */
    dateStyle: CSSProperties;
    /**
     * export filter function to allow users to access.
     * For dateFilter, filter({ date, comparator }) to filter columns dynamically.
     *
     * @param {*} filter
     * @memberof DateFilterOptionalProps
     */
    getFilter(filter: any): void;
    /**
     * Register a listener which will be called when column filter being triggered.
     * If you return an array value, react-bootstrap-table2 will adopt this value as final filtered result.
     *
     * @param {*} filterValue
     * @return {*}  {(void | Promise<void> | any[])}
     * @memberof DateFilterOptionalProps
     */
    onFilter(filterValue: any): void | Promise<void> | any[];
}
export interface DateFilterProps extends DateFilterOptionalProps {
}
export declare function dateFilter<FilterComponentProps = any>(props?: DateFilterProps, filterComponent?: ComponentType<FilterComponentProps>): DefaultReactBootstrapTableFilter<DateFilterProps, FilterComponentProps>;
/**
 * Custom filter
 */
export interface CustomFilterOptionalProps {
    /**
     * Assign the filter mode when react-bootstrap-table filering your data,
     * please check FILTER_TYPES for available values.
     *
     * @type {FILTER_TYPES[keyof FILTER_TYPES]}
     * @memberof CustomFilterOptionalProps
     */
    type: FilterType[keyof FilterType];
    /**
     * Specify what kind of comparator to compare.
     * Default is Comparator.LIKE. But if customFilter.type is FILTER_TYPES.SELECT, this default value will be Comparator.EQ
     *
     * @type {ComparatorType[keyof ComparatorType]}
     * @memberof CustomFilterOptionalProps
     */
    comparator: ComparatorType[keyof ComparatorType];
    /**
     * default is false, and true will only work when comparator is LIKE.
     * @default false
     *
     * @type {boolean}
     * @memberof CustomFilterOptionalProps
     */
    caseSensitive: boolean;
}
export interface CustomFilterProps extends Partial<CustomFilterOptionalProps> {
}
export declare function customFilter<FilterComponentProps = any>(props?: CustomFilterProps, filter?: ComponentType<FilterComponentProps>): DefaultReactBootstrapTableFilter<CustomFilterProps, FilterComponentProps>;
/**
 * declaration for table filter sub module
 */
export interface FilterFactoryOptionalProps<TableData extends DefaultTableData = DefaultTableData> {
    afterFilter: (filterResults: TableData[], filterObject: any) => void | Promise<void>;
}
export interface FilterFactoryProps<TableData extends DefaultTableData = DefaultTableData> extends Partial<FilterFactoryOptionalProps<TableData>> {
}
interface FilterPayload {
    filterVal: any;
    filterType: FilterType[keyof FilterType];
    comparator: ComparatorType[keyof ComparatorType];
    caseSensitive: boolean;
}
declare type HandleFilterChange = (payload?: Record<string, FilterPayload>) => void | Promise<void>;
interface FilterContext<TableData extends DefaultTableData = DefaultTableData, Column extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> {
    data: TableData[];
    onFilter(column: Column, filterType: FilterType[keyof FilterType], initialize?: boolean): (value: any) => void | Promise<void>;
    onExternalFilter(column: Column, filterType: FilterType[keyof FilterType]): (value: any) => void | Promise<void>;
    currFilters?: FilterPayload;
}
interface FilterContextProviderProps<TableData extends DefaultTableData = DefaultTableData, Column extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>, FilterProps extends FilterFactoryProps<TableData> = FilterFactoryProps<TableData>> {
    dataChangeListener: EventEmitter;
    data: TableData[];
    columns: Column[];
    filter: FilterProps;
}
export interface FilterFactoryReturn<TableData extends DefaultTableData = DefaultTableData, Column extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>, FilterProps extends FilterFactoryProps<TableData> = FilterFactoryProps<TableData>> {
    createContext(_: ReactBootstrapTableUtilities, isRemoteFiltering: () => boolean, HandleFilterChange: HandleFilterChange): {
        Provider: ComponentType<FilterContextProviderProps<TableData, Column, FilterProps>>;
        Consumer: Consumer<FilterContext<TableData, Column>>;
    };
}
declare function filterFactory<TableData extends DefaultTableData = DefaultTableData, Column extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>, FilterProps extends FilterFactoryProps<TableData> = FilterFactoryProps<TableData>>(props?: FilterProps): FilterFactoryReturn<TableData, Column, FilterProps> & FilterProps;
export default filterFactory;
