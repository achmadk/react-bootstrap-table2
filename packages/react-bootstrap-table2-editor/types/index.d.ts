import { MouseEvent, TdHTMLAttributes, ReactNode, CSSProperties, ThHTMLAttributes, HTMLAttributes, MouseEventHandler } from 'react';
export { ReactBootstrapTableUtilities } from './utils';
export declare type BootstrapTableOrders = 'asc' | 'desc';
export declare type BootstrapTableFilterPosition = 'inline' | 'top' | 'bottom';
export declare type BootstrapTableIndicatorPosition = 'left' | 'right';
export declare type BootstrapTableRowSelectMode = 'radio' | 'checkbox';
export declare type BootstrapTableAlignValues = 'left' | 'right' | 'center' | 'justify';
export declare type BootstrapTableRenderer4Arguments<TableData extends DefaultTableData = DefaultTableData, ReturnType = string> = (cell: TableData[keyof TableData], row: TableData, rowIndex: number, colIndex: number) => ReturnType;
export declare type BootstrapTableRenderer2Arguments<TableData extends DefaultTableData = DefaultTableData, ReturnType = string> = (column: BootstrapTableColumns<TableData>, colIndex: number) => ReturnType;
export declare type BootstrapTableRenderer4ArgumentsDestructured<TableData extends DefaultTableData = DefaultTableData> = Parameters<BootstrapTableRenderer4Arguments<TableData>>;
export declare type BootstrapTableModifiedColumnEvents<TableData extends DefaultTableData = DefaultTableData> = {
    [K in 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseLeave' | 'onContextMenu' | 'onAuxClick']: (event: MouseEvent<TdHTMLAttributes<HTMLTableDataCellElement>>, col: BootstrapTableColumns<TableData>, colIndex: number, row: TableData, rowIndex: number) => void | Promise<void>;
};
export declare type BootstrapTableModifiedColumnHeaderEvents<TableData extends DefaultTableData = DefaultTableData> = {
    [K in 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseLeave' | 'onContextMenu' | 'onAuxClick']: (event: MouseEvent<TdHTMLAttributes<HTMLTableDataCellElement>>, col: BootstrapTableColumns<TableData>, colIndex: number) => void | Promise<void>;
};
export declare type BootstrapTableColumnEvents<TableData extends DefaultTableData = DefaultTableData> = Omit<TdHTMLAttributes<HTMLTableDataCellElement>, 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseLeave' | 'onContextMenu' | 'onAuxClick'> & Partial<BootstrapTableModifiedColumnEvents<TableData>>;
export declare type BootstrapTableModifiedRowEvents<TableData extends DefaultTableData = DefaultTableData> = {
    [K in 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseLeave' | 'onContextMenu' | 'onAuxClick']: (event: MouseEvent<TdHTMLAttributes<HTMLTableDataCellElement>>, row: TableData, rowIndex: number) => void | Promise<void>;
};
export declare type BootstrapTableRowEvents<TableData extends DefaultTableData = DefaultTableData> = Omit<HTMLAttributes<HTMLTableRowElement>, 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseLeave' | 'onContextMenu' | 'onAuxClick'> & Partial<BootstrapTableModifiedRowEvents<TableData>>;
export interface DefaultTableData {
    [field: string]: any;
}
export interface BootstrapTableColumnsOptional<TableData extends DefaultTableData = DefaultTableData> {
    isDummyField: boolean;
    hidden: boolean;
    formatter: (cell: TableData[keyof TableData], row: TableData, rowIndex: number, formatExtraData: any) => ReactNode | string;
    headerFormatter: (column: BootstrapTableColumns<TableData>, colIndex: number, components: {
        sortElement: ReactNode;
        filterElement: ReactNode;
    }) => ReactNode | string;
    formatExtraData: any;
    type: 'string' | 'number' | 'bool' | 'date';
    sort: boolean;
    sortValue: (cell: TableData[keyof TableData], row: TableData) => any;
    sortFunc: (valueA: TableData[keyof TableData], valueB: TableData[keyof TableData], order: BootstrapTableOrders, dataField: keyof TableData, rowA: TableData, rowB: TableData) => number;
    onSort: (field: keyof TableData, order: BootstrapTableOrders) => void | Promise<void>;
    sortCaret: (sortOrder?: BootstrapTableOrders, column?: TableData) => ReactNode;
    classes: string | BootstrapTableRenderer4Arguments<TableData, string>;
    headerClasses: string | BootstrapTableRenderer2Arguments<TableData, string>;
    style: CSSProperties | BootstrapTableRenderer4Arguments<TableData, CSSProperties>;
    headerStyle: CSSProperties | BootstrapTableRenderer2Arguments<TableData, CSSProperties>;
    title: boolean | BootstrapTableRenderer4Arguments<TableData>;
    headerTitle: boolean | BootstrapTableRenderer2Arguments<TableData, string>;
    align: BootstrapTableAlignValues | BootstrapTableRenderer4Arguments<TableData, BootstrapTableAlignValues>;
    headerAlign: BootstrapTableAlignValues | BootstrapTableRenderer2Arguments<TableData, BootstrapTableAlignValues>;
    events: Partial<BootstrapTableColumnEvents<TableData>>;
    headerEvents: Partial<BootstrapTableModifiedColumnHeaderEvents<TableData>>;
    attrs: TdHTMLAttributes<HTMLTableDataCellElement> | ((cell: TableData[keyof TableData], row: TableData, rowIndex: number) => TdHTMLAttributes<HTMLTableDataCellElement>);
    headerAttrs: ThHTMLAttributes<HTMLTableHeaderCellElement> | ((column: BootstrapTableColumns<TableData>, colIndex: number) => ThHTMLAttributes<HTMLTableHeaderCellElement>);
    headerSortingClasses: string | ((column: BootstrapTableColumns<TableData>, sortOrder: BootstrapTableOrders, isLastSorting: boolean, colIndex: number) => string);
    headerSortingStyle: CSSProperties | ((column: BootstrapTableColumns<TableData>, sortOrder: BootstrapTableOrders, isLastSorting: boolean, colIndex: number) => CSSProperties);
    searchable: boolean;
}
export interface BootstrapTableColumns<TableData extends DefaultTableData = DefaultTableData> extends Partial<BootstrapTableColumnsOptional<TableData>> {
    dataField: keyof TableData | string;
    text: string;
}
export interface BootstrapTableFeatures {
    pagination: boolean;
    filter: boolean;
    sort: boolean;
    cellEdit: boolean;
}
export interface BootstrapTableCellEditOptionalProps<TableData extends DefaultTableData = DefaultTableData, TableDataKeys extends keyof TableData = keyof TableData> {
    /**
     * enable it will be able to save the cell automatically when blur from the cell editor.
     * @default false
     *
     * @type {boolean}
     * @memberof BootstrapTableCellEditOptionalProps
     */
    blurToSave: boolean;
    /**
     * `cellEdit.nonEditableRows` accept a callback function and expect return an array which used to restrict all the columns of some rows as non-editable. So the each item in return array should be rowkey(`keyField`)
     *
     * @return {*}  {number[]}
     * @memberof BootstrapTableCellEditOptionalProps
     *
     * @example
     * ```js
     * import BootstrapTable from 'react-bootstrap-table-next';
     * import cellEditFactory from 'react-bootstrap-table2-editor';
     *
     * const columns = [{
     *   dataField: 'id',
     *   text: 'Product ID'
     * }, {
     *   dataField: 'name',
     *   text: 'Product Name'
     * }, {
     *   dataField: 'price',
     *   text: 'Product Price'
     * }];
     *
     * <BootstrapTable
     *   keyField="id"
     *   data={products}
     *   columns={columns}
     *   cellEdit={cellEditFactory({
     *     mode: 'click',
     *     blurToSave: true,
     *     nonEditableRows: () => [0, 3] // row index number 0, 3 is non editable
     *   })}
     * />
     * ```
     */
    nonEditableRows: () => TableData[TableDataKeys][];
    /**
     * When enable it, `react-bootstrap-table2` will help you to select the text in the text input automatically when editing.
     *
     * > NOTE: This props only work for `text` and `textarea`.
     *
     * @default false
     *
     * @type {boolean}
     * @memberof BootstrapTableCellEditOptionalProps
     */
    autoSelectText: boolean;
    /**
     * If a [`column.validator`](./columns.md#validator) defined and the new value is invalid, `react-bootstrap-table2` will popup a alert at the bottom of editor. `cellEdit.timeToCloseMessage` is a chance to let you decide how long the alert should be stay.
     * Default value is 3000 milliseconds (3 seconds).
     *
     * @default 3000
     * @type {number}
     * @memberof BootstrapTableCellEditOptionalProps
     */
    timeToCloseMessage: number;
    /**
     * This callback function will be called before triggering cell update.
     *
     * @param {*} oldValue
     * @param {*} newValue
     * @param {*} row
     * @param {*} column
     * @memberof BootstrapTableCellEditOptionalProps
     *
     * @example
     * ```js
     * const cellEdit = {
     *   // omit...
     *   beforeSaveCell: (oldValue, newValue, row, column) => { ... }
     * }
     * ```
     *
     * If you want to perform a async `beforeSaveCell`, you can do it like that:
     *
     * ```js
     * const cellEdit: {
     *   // omit...
     *   beforeSaveCell(oldValue, newValue, row, column, done) {
     *     setTimeout(() => {
     *       if (confirm('Do you want to accept this change?')) {
     *         done(); // continue to save the changes
     *       } else {
     *         done(false); // reject the changes
     *       }
     *     }, 0);
     *     return { async: true };
     *   }
     * };
     * ```
     */
    beforeSaveCell: ((oldValue: TableData[TableDataKeys], newValue: TableData[TableDataKeys], row: any, column: any) => void) | ((oldValue: TableData[TableDataKeys], newValue: TableData[TableDataKeys], row: any, column: any, done: (value?: boolean) => void) => {
        async: true;
    });
    /**
     * This callback function will be called after updating cell.
     *
     * @param {TableData[TableDataKeys]} oldValue
     * @param {TableData[TableDataKeys]} newValue
     * @param {*} row
     * @param {*} column
     * @memberof BootstrapTableCellEditOptionalProps
     *
     * @example
     * ```js
     * <BootstrapTable
     *   keyField="id"
     *   data={ products }
     *   columns={ columns }
     *   cellEdit={ cellEditFactory({
     *     mode: 'click',
     *     afterSaveCell: (oldValue, newValue, row, column) => {
     *       console.log('After Saving Cell!!');
     *     }
     *   }) }
     * />
     * ```
     */
    afterSaveCell(oldValue: TableData[TableDataKeys], newValue: TableData[TableDataKeys], row: any, column: any): void;
    /**
     * This prop is not often used. Only used when you want to keep the error message in your application state and also handle the cell editing on remote mode.
     *
     * @type {string}
     * @memberof BootstrapTableCellEditOptionalProps
     */
    errorMessage: string;
    /**
     * This callback function will be called when error message discard so that you can sync the newest error message to your state if you have.
     *
     * @memberof BootstrapTableCellEditOptionalProps
     */
    onErrorMessageDisappear(): void;
}
export interface SelectColumnStyleFunctionArguments<TableData extends DefaultTableData = DefaultTableData> {
    /**
     * Whether current row is seleccted or not
     *
     * @type {boolean}
     * @memberof SelectColumnStyleFunctionArguments
     */
    checked: boolean;
    /**
     * Whether current row is disabled or not
     *
     * @type {boolean}
     * @memberof SelectColumnStyleFunctionArguments
     */
    disabled: boolean;
    /**
     * Current row index
     *
     * @type {number}
     * @memberof SelectColumnStyleFunctionArguments
     */
    rowIndex: number;
    /**
     * Current row key
     *
     * @type {TableData[keyof TableData]}
     * @memberof SelectColumnStyleFunctionArguments
     */
    rowKey: TableData[keyof TableData];
}
export interface BootstrapTableCellEdit<TableData extends DefaultTableData = DefaultTableData> extends Partial<BootstrapTableCellEditOptionalProps<TableData>> {
    /**
     * `cellEdit.mode` possible value is `click` and `dbclick`. **It's required value** that tell `react-bootstrap-table2` how to trigger the cell editing.
     *
     * @type {('click' | 'dbclick')}
     * @memberof BootstrapTableCellEdit
     */
    mode: 'click' | 'dbclick';
}
export interface SelectionRendererFunctionArguments {
    mode: BootstrapTableRowSelectMode;
    checked: boolean;
    disabled: boolean;
    rowIndex: number;
    rowKey: string;
}
export interface SelectionHeaderRendererFunctionArguments {
    mode: BootstrapTableRowSelectMode;
    checked: boolean;
    indetermined: boolean;
}
/**
 *
 *
 * @export
 * @interface BootstrapTableSelectRowOptional
 */
export interface BootstrapTableSelectRowOptional<TableData extends DefaultTableData = DefaultTableData> {
    /**
     * `selectRow.selected` allow you have default selections on table.
     *
     * @type {number[]}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   selected: [1, 3] // should be a row keys array
     * };
     * ```
     */
    selected: TableData[keyof TableData][];
    /**
     * `selectRow.style` allow you to have custom style on selected rows.
     *
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   style: { background: 'red' }
     * };
     * ```
     *
     * If you wanna more flexible customization, `selectRow.style` also accept a function:
     *
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   style: (row, rowIndex) => ({ backgroundColor: rowIndex > 1 ? 'green' : 'blue' })
     * };
     * ```
     */
    style: CSSProperties | ((row: TableData, rowIndex: number) => CSSProperties);
    /**
     * `selectRow.classes` allow you to add css class on selected rows.
     *
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   classes: 'custom-class'
     * };
     *  ```
     *
     * If you wanna more flexible customization, `selectRow.classes` also accept a function:
     *
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   classes: (row, rowIndex) => { return rowIndex > 1 ? 'row-index-bigger-than-2101' : 'row-index-small-than-2101' }
     * };
     * ```
     */
    classes: string | ((row: TableData, rowIndex: number) => string);
    /**
     * The background color when row is selected
     *
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   bgColor: 'red'
     * };
     * ```
     *
     * There's also a more good way to custom it:
     *
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   bgColor: (row, rowIndex) => {
     *     return ....;  // return a color code
     *   }
     * };
     * ```
     */
    bgColor: string | ((row: TableData, rowIndex: number) => string);
    /**
     * This prop allow you to restrict some rows which can not be selected by user. `selectRow.nonSelectable` accept an rowkeys array.
     *
     * @type {number[]}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   nonSelectable: [1, 3 ,5]
     * };
     * ```
     */
    nonSelectable: TableData[keyof TableData][];
    /**
     * This prop allow you to customize the non selectable rows.
     * `selectRow.nonSelectableStyle` accepts an style object and a callback function for more flexible customization.
     *
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   nonSelectable: [1, 3 ,5],
     *   nonSelectableStyle: { backgroundColor: 'gray' }
     * };
     * ```
     *
     * Callback Function
     *
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   nonSelectable: [1, 3 ,5],
     *   nonSelectableStyle: (row, rowIndex) => { return ...; }
     * };
     * ```
     */
    nonSelectableStyle: CSSProperties | ((row: TableData, rowIndex: number) => CSSProperties);
    /**
     * This prop allow you to set a custom class for the non selectable rows, or use a callback function for more flexible customization
     *
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   nonSelectable: [1, 3 ,5],
     *   nonSelectableClasses: 'my-class'
     * };
     * ```
     *
     * Callback Function
     *
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   nonSelectable: [1, 3 ,5],
     *   nonSelectableClasses: (row, rowIndex) => { return ...; }
     * };
     * ```
     */
    nonSelectableClasses: string | ((row: TableData, rowIndex: number) => string);
    /**
     * Allow user to select row by clicking on the row.
     * > Note: When you also enable [cellEdit](./cell-edit.md), the `selectRow.clickToSelect` will deactivate the functionality of cell editing
     * > If you want to click on row to select row and edit cell simultaneously, you are suppose to enable [`selectRow.clickToEdit`](#clickToEdit)
     *
     * @type {boolean}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   clickToSelect: true
     * };
     * ```
     */
    clickToSelect: boolean;
    /**
     * Default is false, enable it will let user able to expand and select row when user clicking on the row.
     *
     * @type {boolean}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   clickToExpand: true
     * };
     * ```
     */
    clickToExpand: boolean;
    /**
     * Able to click to edit cell and select row
     *
     * @type {boolean}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   clickToSelect: true
     *   clickToEdit: true
     * };
     * ```
     */
    clickToEdit: boolean;
    /**
     * Provide a callback function which allow you to custom the checkbox/radio box. This callback only have one argument which is an object and contain following properties
     * > By default, `react-bootstrap-table2` will help you to handle the click event, it's not necessary to handle again by developer.
     *
     * @param {SelectionRendererFunctionArguments} params
     * @return {*}  {ReactNode}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   selectionRenderer: ({ mode, checked, disabled, rowIndex }) => (
     *     // ....
     *   )
     * };
     * ```
     */
    selectionRenderer(params: SelectionRendererFunctionArguments): ReactNode;
    /**
     * Provide a callback function which allow you to custom the checkbox/radio box in the selection header column. This callback only have one argument which is an object and contain following properties
     * > By default, `react-bootstrap-table2` will help you to handle the click event, it's not necessary to handle again by developer.
     *
     * @param {SelectionHeaderRendererFunctionArguments} params
     * @return {*}  {ReactNode}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   selectionHeaderRenderer: ({ mode, checked, indeterminate }) => (
     *     // ....
     *   )
     * };
     * ```
     */
    selectionHeaderRenderer(params: SelectionHeaderRendererFunctionArguments): ReactNode;
    /**
     * A way to custom the selection header cell. `headerColumnStyle` not only accept a simple style object but also a callback function for more flexible customization.
     *
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   headerColumnStyle: { backgroundColor: 'blue' }
     * };
     * ```
     *
     * Callback Function
     *
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   headerColumnStyle:  (status) => (
     *     // status available value is checked, indeterminate and unchecked
     *     return { backgroundColor: 'blue' };
     *   )
     * };
     * ```
     */
    headerColumnStyle: CSSProperties | ((checkedStatus: boolean) => CSSProperties);
    /**
     * A way to custom the selection cell. `selectColumnStyle` not only accept a simple style object but also a callback function for more flexible customization
     *
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   selectColumnStyle: { backgroundColor: 'blue' }
     * };
     * ```
     *
     * Callback Function
     * If a callback function present, you can get below information to custom the selection cell:
     *
     *  `checked`: Whether current row is seleccted or not
     * `disabled`: Whether current row is disabled or not
     * `rowIndex`: Current row index
     * `rowKey`: Current row key
     *
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   selectColumnStyle:  ({
     *     checked,
     *     disabled,
     *     rowIndex,
     *     rowKey
     *   }) => {
     *   // ....
     *   return { backgroundColor: 'blue' };
     *   }
     * };
     * ```
     */
    selectColumnStyle: CSSProperties | ((params: SelectColumnStyleFunctionArguments<TableData>) => CSSProperties);
    /**
     * This callback function will be called when a row is select/unselect and pass following 4 arguments:
     * `row`, `isSelect`, `rowIndex` and `e`.
     * > If you want to reject current select action, just return `false`:
     *
     * @param {TableData} row
     * @param {boolean} checked
     * @param {number} rowIndex
     * @param {MouseEventHandler<HTMLTableDataCellElement>} event
     * @return {*}  {(void | false)}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   onSelect: (row, isSelect, rowIndex, e) => {
     *     // ...
     *   }
     * };
     * ```
     *
     * > If you want to reject current select action, just return `false`:
     *
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   onSelect: (row, isSelect, rowIndex, e) => {
     *     if (SOME_CONDITION) {
     *       return false;
     *     }
     *   }
     * };
     * ```
     */
    onSelect(row: TableData, checked: boolean, rowIndex: number, event: MouseEventHandler<HTMLTableDataCellElement>): void | false;
    /**
     * This callback function will be called when select/unselect all and it only work when you configure [`selectRow.mode`](#mode) as `checkbox`.
     * > If you want to control the final selection result, just return a row key array
     *
     * @param {boolean} isSelect
     * @param {TableData[]} rows
     * @param {MouseEventHandler<HTMLTableHeaderCellElement>} event
     * @return {*}  {(void | number[])}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   onSelectAll: (isSelect, rows, e) => {
     *     // ...
     *   }
     * };
     * ```
     *
     * > If you want to control the final selection result, just return a row key array:
     *
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   onSelectAll: (isSelect, rows, e) => {
     *     if (isSelect && SOME_CONDITION) {
     *       return [1, 3, 4];  // finally, key 1, 3, 4 will being selected
     *     }
     *   }
     * };
     * ```
     */
    onSelectAll(isSelect: boolean, rows: TableData[], event: MouseEventHandler<HTMLTableHeaderCellElement>): void | TableData[keyof TableData][];
    /**
     * You can give this as `right` for rendering selection column in the right side.
     * @default left
     *
     * @type {BootstrapTableIndicatorPosition}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   selectColumnPosition: 'right'
     * };
     * ```
     */
    selectColumnPosition: BootstrapTableIndicatorPosition;
    /**
     * if you don't want to have a selection column, give this prop as `true`
     * @default false
     *
     * @type {boolean}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'radio',
     *   hideSelectColumn: true,
     *   clickToSelect: true,
     *   bgColor: 'red'
     * };
     * ```
     */
    hideSelectColumn: boolean;
    /**
     * if you don't want to render the select all checkbox on the header of selection column, give this prop as `true`!
     * @default false
     *
     * @type {boolean}
     * @memberof BootstrapTableSelectRowOptional
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'checkbox',
     *   hideSelectAll: true
     * };
     * ```
     */
    hideSelectAll: boolean;
}
export interface BootstrapTableSelectRow<TableData extends DefaultTableData = DefaultTableData> extends Partial<BootstrapTableSelectRowOptional<TableData>> {
    /**
     * Specifying the selection way for `radio` (single selection), and `checkbox` (multiple selection).
     * If `radio` was assigned, there will be a radio button in the selection column; otherwise, the `checkbox` instead.
     *
     * @type {BootstrapTableRowSelectMode}
     * @memberof BootstrapTableSelectRow
     * @example
     * ```js
     * const selectRow = {
     *   mode: 'radio' // single row selection
     * };
     *
     * <BootstrapTable
     *   keyField='id'
     *   data={ products }
     *   columns={ columns }
     *   selectRow={ selectRowProp }
     * />
     * ```
     * multi row selection
     * ```js
     * const selectRow = {
     *   mode: 'checkbox' // multiple row selection
     * };
     *
     * <BootstrapTable
     *   keyField='id'
     *   data={ products }
     *   columns={ columns }
     *   selectRow={ selectRowProp }
     * />
     * ```
     */
    mode: BootstrapTableRowSelectMode;
}
export interface BootstrapTableExpandRowOptional<TableData extends DefaultTableData = DefaultTableData> {
    /**
     * `expandRow.expanded` allow you have default row expandations on table.
     *
     * @type {TableData[keyof TableData][]}
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   expanded: [1, 3] // should be a row keys array
     * };
     * ```
     */
    expanded: TableData[keyof TableData][];
    /**
     * This prop allow you to restrict some rows which can not be expanded by user. `expandRow.nonExpandable` accept an rowkeys array.
     *
     * @type {TableData[keyof TableData][]}
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   nonExpandable: [1, 3 ,5] // should be a row keys array
     * };
     * ```
     */
    nonExpandable: TableData[keyof TableData][];
    /**
     * This callback function will be called when a row is expand/collapse.
     * Pass following four arguments: `row`, `isExpand`, `rowIndex` and `e`.
     *
     * @param {TableData} row
     * @param {boolean} isExpand
     * @param {number} rowIndex
     * @param {MouseEventHandler<HTMLTableDataCellElement>} event
     * @return {*}  {(void | Promise<void>)}
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   onExpand: (row, isExpand, rowIndex, e) => {
     *     console.log(row.id);
     *     console.log(isExpand);
     *     console.log(rowIndex);
     *     console.log(e);
     *   }
     * };
     * ```
     */
    onExpand(row: TableData, isExpand: boolean, rowIndex: number, event: MouseEventHandler<HTMLTableDataCellElement>): void | Promise<void>;
    /**
     * This callback function will be called when expand/collapse all.
     * It only work when you configure `expandRow.showExpandColumn` as `true`.
     *
     * @param {boolean} isExpandAll
     * @param {TableData[]} expandedRows
     * @param {MouseEventHandler<HTMLTableDataCellElement>} event
     * @return {*}  {(void | Promise<void>)}
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   showExpandColumn: true, // set this to true to enable onExpandAll
     *   onExpandAll: (isExpandAll, rows, e) => {
     *     console.log(isExpandAll);
     *     console.log(rows);
     *     console.log(e);
     *   }
     * };
     * ```
     */
    onExpandAll(isExpandAll: boolean, expandedRows: TableData[], event: MouseEventHandler<HTMLTableDataCellElement>): void | Promise<void>;
    /**
     * Provide a callback function which allow you to custom the expand indicator icon.
     * This callback only have one argument which is an object and contain these properties:
     * `expanded`: If current row is expanded or not
     * `rowKey`: Current row key
     * `expandable`: If current row is expandable or not
     * > By default, `react-bootstrap-table2` will help you to handle the click event, it's not necessary to handle again by developer.
     *
     * @param {{
     *     expanded: boolean
     *     rowKey: TableData[keyof TableData]
     *     expandable: boolean
     *   }} options
     * @return {*}  {ReactNode}
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   expandColumnRenderer({
     *     expandable,
     *     expanded,
     *     rowKey
     *   }) {
     *     return (expandable ? (expanded ? '(-)' : '(+)') : '')
     *   }
     * };
     * ```
     */
    expandColumnRenderer(options: {
        expanded: boolean;
        rowKey: TableData[keyof TableData];
        expandable: boolean;
    }): ReactNode;
    /**
     * Provide a callback function which allow you to custom the expand indicator in the expand header column.
     * This callback only have one argument which is an object and contain one property `isAnyExpands` which indicate if there's any rows are expanded.
     * > By default, `react-bootstrap-table2` will help you to handle the click event, it's not necessary to handle again by developer.
     *
     * @param {{ isAnyExpands: boolean }} options
     * @return {*}  {ReactNode}
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   expandHeaderColumnRenderer({
     *     isAnyExpands
     *   }) {
     *     return isAnyExpands ? '(-)' : '(+)'
     *   }
     * };
     * ```
     */
    expandHeaderColumnRenderer(options: {
        isAnyExpands: boolean;
    }): ReactNode;
    /**
     * Default is `false`, if you want to have a expand indicator, give this prop as `true`.
     *
     * @type {boolean}
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   showExpandColumn: true
     * };
     * ```
     */
    showExpandColumn: boolean;
    /**
     * Default is `false`. Enable this will only allow one row get expand at the same time.
     *
     * @type {boolean}
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   onlyOneExpanding: true
     * };
     * ```
     */
    onlyOneExpanding: boolean;
    /**
     * Default is `false`. If you want to restrict user to expand/collapse row via clicking the expand column only, you can enable it.
     * It only work when you configure `expandRow.showExpandColumn` as `true`.
     *
     * @type {boolean}
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   showExpandColumn: true,
     *   expandByColumnOnly: true
     * };
     * ```
     */
    expandByColumnOnly: boolean;
    /**
     * Default is `left`. You can give this as `right` for rendering expand column in the right side.
     *
     * @type {BootstrapTableIndicatorPosition}
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   expandColumnPosition: 'right'
     * };
     * ```
     */
    expandColumnPosition: BootstrapTableIndicatorPosition;
    /**
     * Apply the custom class name on the expanding row.
     *
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   className: 'foo'
     * };
     * ```
     * following usage is more flexible way for customizing the class name.
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   className: (isExpanded, row, rowIndex) => {
     *     if (rowIndex > 2) return 'foo';
     *     return 'bar';
     *   }
     * };
     * ```
     */
    className: string | ((isExpanded: boolean, row: TableData, rowIndex: number) => string);
    /**
     * Apply the custom class name on parent row of expanded row. For example:
     *
     * @memberof BootstrapTableExpandRowOptional
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   parentClassName: 'foo'
     * };
     * ```
     * following usage is more flexible way for customizing the parent class name.
     * ```js
     * const expandRow = {
     *   renderer: (row) => ... // `renderer` props return value omitted
     *   parentClassName: (isExpanded, row, rowIndex) => {
     *     if (rowIndex > 2) return 'foo';
     *     return 'bar';
     *   }
     * };
     * ```
     */
    parentClassName: string | ((isExpanded: boolean, row: TableData, rowIndex: number) => string);
}
/**
 * definition of row expanding in `react-bootstrap-table2`
 *
 * @export
 * @interface BootstrapTableExpandRow
 * @extends {Partial<BootstrapTableExpandRowOptional>}
 * @template TableData
 */
export interface BootstrapTableExpandRow<TableData extends DefaultTableData = DefaultTableData> extends Partial<BootstrapTableExpandRowOptional<TableData>> {
    /**
     * Specify the content of expand row, `react-bootstrap-table2` will pass a row object and row index as arguments and expect return a react element.
     *
     * @param {TableData} row
     * @param {number} rowIndex
     * @return {*}  {ReactNode}
     * @memberof BootstrapTableExpandRow
     * @example
     * ```js
     * const expandRow = {
     *   renderer: (row, rowIndex) => (
     *     <>
     *       <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
     *       <p>You can render anything here, also you can add additional data on every row object</p>
     *       <p>expandRow.renderer callback will pass the origin row object to you</p>
     *     </>
     *   )
     * };
     *
     * <BootstrapTable
     *   keyField='id'
     *   data={ products }
     *   columns={ columns }
     *   expandRow={ expandRow }
     * />
     * ```
     */
    renderer(row: TableData, rowIndex: number): ReactNode;
}
export interface BootstrapTableState<TableData extends DefaultTableData = DefaultTableData> {
    page: number;
    sizePerPage: number;
    sortField: keyof TableData;
    sortOrder: BootstrapTableOrders;
    filters: any;
    data: TableData;
    cellEdit: {
        rowId: string;
        dataField: keyof TableData;
        newValue: TableData[keyof TableData];
    };
}
/**
 *
 *
 * @export
 * @interface BootstrapTableOptionalProps
 * @template TableData
 */
export interface BootstrapTableOptionalProps<TableData extends DefaultTableData = DefaultTableData> {
    /**
     * Customize ID on `table` element.
     *
     * @type {string}
     * @memberof BootstrapTableOptionalProps
     */
    id: string;
    /**
     * if enable`remote`, you are suppose to handle all the table change events, like: pagination, insert, filtering etc.
     * This is a chance that you can connect to your remote server or database to manipulate your data.
     * For flexibility reason, you can control what functionality should be handled on remote via a object return:
     *
     * ```js
     * remote={{
     *   filter: true,
     *   pagination: true,
     *   sort: true,
     *   cellEdit: true
     * }}
     * ```
     *
     * In above case, only column filter will be handled on remote.
     *
     * > Note: when remote is enable, you are suppose to give [`onTableChange`](#onTableChange) prop on `BootstrapTable`
     * > It's the only way to communicate to your remote server and update table states.
     *
     * A special case for remote pagination:
     * ```js
     *   remote={{ pagination: true, filter: false, sort: false }}
     * ```
     *
     * There is a special case for remote pagination, even you only specified the pagination need to handle as remote, `react-bootstrap-table2` will handle all the table changes(filter, sort etc) as remote mode, because `react-bootstrap-table2` only know the data of current page, but filtering, searching or sort need to work on overall data.
     *
     * @default false
     * @type {(boolean | Partial<BootstrapTableFeatures>)}
     * @memberof BootstrapTableOptionalProps
     */
    remote: boolean | Partial<BootstrapTableFeatures>;
    /**
     * `true` to indicate your bootstrap version is 4. Default version is 3 (false).
     *
     * @default false
     * @type {boolean}
     * @memberof BootstrapTableOptionalProps
     */
    bootstrap4: boolean;
    /**
     * Telling if table is loading or not, for example: waiting data loading, filtering etc. It's **only** valid when [`remote`](#remote) is enabled.
     *
     * When `loading` is `true`, `react-bootstrap-table2` will attend to render a overlay on table via [`overlay`](#overlay) prop, if [`overlay`](#overlay) prop is not given, `react-bootstrap-table2` will ignore the overlay rendering.
     *
     * @type {boolean}
     * @memberof BootstrapTableOptionalProps
     */
    loading: boolean;
    /**
     * `overlay` accept a factory function which should returning a higher order component. By default, `react-bootstrap-table2-overlay` can be a good option for you:
     *
     * ```sh
     * $ npm install react-bootstrap-table2-overlay
     * ```
     *
     * ```js
     * import overlayFactory from 'react-bootstrap-table2-overlay';
     *
     * <BootstrapTable
     *   data={data}
     *   columns={columns}
     *   loading={true}  //only loading is true, react-bootstrap-table will render overlay
     *   overlay={overlayFactory()}
     * />
     * ```
     *
     * Actually, `react-bootstrap-table-overlay` is depends on [`react-loading-overlay`](https://github.com/derrickpelletier/react-loading-overlay) and `overlayFactory` just a factory function and you can pass any props which available for `react-loading-overlay`:
     *
     * ```js
     * overlay={
     *   overlayFactory({
     *     spinner: true,
     *     styles: {
     *       overlay: (base) => ({...base, background: 'rgba(255, 0, 0, 0.5)'})
     *    }
     *  })
     * }
     * ```
     *
     * @memberof BootstrapTableOptionalProps
     */
    overlay: (loading: boolean) => ReactNode;
    /**
     * Same as HTML [caption tag](https://www.w3schools.com/TAgs/tag_caption.asp), you can set it as String or a React JSX.
     *
     * @type {(ReactNode | string)}
     * @memberof BootstrapTableOptionalProps
     */
    caption: ReactNode | string;
    /**
     * Same as bootstrap `.table-striped` class for adding zebra-stripes to a table.
     *
     * @type {boolean}
     * @memberof BootstrapTableOptionalProps
     */
    striped: boolean;
    /**
     * Same as bootstrap `.table-bordered` class for adding borders to a table and table cells.
     *
     * @type {boolean}
     * @memberof BootstrapTableOptionalProps
     */
    bordered: boolean;
    /**
     * Same as bootstrap `.table-hover` class for adding mouse hover effect (grey background color) on table rows.
     *
     * @type {boolean}
     * @memberof BootstrapTableOptionalProps
     */
    hover: boolean;
    /**
     * Same as bootstrap `.table-condensed` class for making a table more compact by cutting cell padding in half.
     *
     * @type {boolean}
     * @memberof BootstrapTableOptionalProps
     */
    condensed: boolean;
    /**
     * Enable the `tabIndex` attribute on `<td>` element.
     *
     * @type {boolean}
     * @memberof BootstrapTableOptionalProps
     */
    tabIndexCell: boolean;
    /**
     * Customize class on `table` element.
     *
     * @type {string}
     * @memberof BootstrapTableOptionalProps
     */
    classes: string;
    /**
     * Customize class on the outer element which wrap up the `table` element.
     *
     * @type {string}
     * @memberof BootstrapTableOptionalProps
     */
    wrapperClasses: string;
    /**
     * Customize class on the header row(`tr`).
     *
     * @type {string}
     * @memberof BootstrapTableOptionalProps
     */
    headerClasses: string;
    /**
     * Customize class on the `thead`.
     *
     * @type {string}
     * @memberof BootstrapTableOptionalProps
     */
    headerWrapperClasses: string;
    /**
     * Makes table cells editable, please see [cellEdit definition](./cell-edit.md) for more detail.
     *
     * @type {BootstrapTableCellEdit<TableData>}
     * @memberof BootstrapTableOptionalProps
     */
    cellEdit: BootstrapTableCellEdit<TableData>;
    /**
     * Makes table rows selectable, please see [selectRow definition](./row-selection.md) for more detail.
     *
     * @type {BootstrapTableSelectRow}
     * @memberof BootstrapTableOptionalProps
     */
    selectRow: BootstrapTableSelectRow;
    /**
     * Makes table rows expandable, please see [expandRow definition](./row-expand.md) for more detail.
     *
     * @type {BootstrapTableExpandRow}
     * @memberof BootstrapTableOptionalProps
     */
    expandRow: BootstrapTableExpandRow;
    /**
     * Custom the style of table rows:
     *
     * @memberof BootstrapTableOptionalProps
     * @example
     * ```js
     * <BootstrapTable
     *   data={ data }
     *   columns={ columns }
     *   rowStyle={ { backgroundColor: 'red' } }
     * />
     * ```
     * This prop also accept a callback function for flexible to custom row style:
     * ```js
     * const rowStyle = (row, rowIndex) => {
     *   return { ... };
     * };
     *
     * <BootstrapTable
     *   data={ data }
     *   columns={ columns }
     *   rowStyle={ rowStyle }
     * />
     * ```
     */
    rowStyle: CSSProperties | ((row: TableData, rowIndex: number) => CSSProperties);
    /**
     * Custom the style of table rows:
     *
     * @memberof BootstrapTableOptionalProps
     * @example
     * ```js
     * <BootstrapTable
     *   data={ data }
     *   columns={ columns }
     *   rowClasses="custom-row-class"
     * />
     * ```
     * This prop also accept a callback function for flexible to custom row style:
     * ```js
     * const rowClasses = (row, rowIndex) => {
     *   return 'custom-row-class';
     * };
     *
     * <BootstrapTable data={ data } columns={ columns } rowClasses={ rowClasses } />
     * ```
     */
    rowClasses: string | ((row: TableData, rowIndex: number) => string);
    rowEvents: BootstrapTableRowEvents<TableData>;
    hiddenRows: TableData[keyof TableData][];
    sort: {
        dataField: keyof TableData;
        order: BootstrapTableOrders;
    } | {
        sortCaret: BootstrapTableColumns<TableData>['sortCaret'];
        sortFunc: BootstrapTableColumns<TableData>['sortFunc'];
    };
    defaultSorted: {
        dataField: keyof TableData | string;
        order: BootstrapTableOrders;
    }[];
    defaultSortDirection: BootstrapTableOrders;
    /**
     * [TODO]: add pagination
     */
    pagination: any;
    /**
     * [TODO]: define filter
     */
    filter: any;
    onTableChange: <Data = TableData>(type: 'filter' | 'pagination' | 'sort' | 'cellEdit' | string, newState: BootstrapTableState<Data>) => void | Promise<void>;
    filterPosition: BootstrapTableFilterPosition;
    onDataSizeChange: (payload: {
        dataSize: number;
    }) => void | Promise<void>;
    noDataIndication: ReactNode | (() => ReactNode);
    bodyClasses: string;
}
/**
 * `BootstrapTable` Props
 *
 * @export
 * @interface BootstrapTableProps
 * @extends {Partial<BootstrapTableOptionalProps<TableData>>}
 * @template TableData
 * @template ColumnAttributes
 */
export interface BootstrapTableProps<TableData extends DefaultTableData = DefaultTableData, ColumnAttributes extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> extends Partial<BootstrapTableOptionalProps<TableData>> {
    /**
     * Tells `react-bootstrap-table2` which column of the data is unique. This should be the name of a property that is unique for each item in your dataset
     *
     * @type {string}
     * @memberof BootstrapTableProps
     */
    keyField: string;
    /**
     * Provides data for your table. It accepts a single Array object.
     *
     * Each item in this array is an object that represents a row in the table. Each "Row" object should have a key-value pair for each column in the table, whose key matches that column's dataField value.
     *
     * @type {TableData[]}
     * @memberof BootstrapTableProps
     *
     * @example
     * For example, if your column definitions look like:
     *
     * ```js
     * columns = [
     *   { dataField: 'id', text: 'Id' },
     *   { dataField: 'name', text: 'Name' },
     *   { dataField: 'animal', text: 'Animal' },
     * ]
     * ```
     *
     * Then your data might look like:
     *
     * ```js
     * data = [
     *   { id: 1, name: 'George', animal: 'Monkey' },
     *   { id: 2, name: 'Jeffrey', animal: 'Giraffe' },
     *   { id: 3, name: 'Alice', animal: 'Giraffe' },
     *   { id: 4, name: 'Alice', animal: 'Tiger' }
     * ]
     * ```
     *
     * And your "keyField" would be `id`
     */
    data: TableData[];
    /**
     * Accepts a single Array object, please see [columns definition](./columns.md) for more detail.
     *
     * @type {ColumnAttributes[]}
     * @memberof BootstrapTableProps
     */
    columns: ColumnAttributes[];
}