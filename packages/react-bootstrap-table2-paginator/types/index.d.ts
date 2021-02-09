/// <reference types="node" />
import { ReactNode, Consumer, ComponentType, ReactElement } from 'react';
import { BootstrapTableProps, DefaultTableData, EventEmitter } from 'react-bootstrap-table-next-esm';
export interface ReactBootstrapTablePaginatorOptionalProps {
    /**
     * you will enable it only when you need to implement a customization completely.
     * @default false
     *
     * @type {boolean}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    custom: boolean;
    /**
     * Specify the current page. It's necessary when remote is enabled
     *
     * @type {number}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    page: number;
    /**
     * Specify the size per page. It's necessary when remote is enabled
     *
     * @type {number}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    sizePerPage: number;
    /**
     * Total data size. It's necessary when remote is enabled
     *
     * @type {number}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    totalSize: number;
    /**
     * set first page index,
     * @default 1
     *
     * @type {number}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    pageStartIndex: number;
    /**
     * the pagination bar size,
     * @default 5
     *
     * @type {number}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    paginationSize: number;
    /**
     * You can assign a number of array to replace this default list.
     * However, `sizePerPageList` is flexible to let you decide the text display on the dropdown list.
     * @default [10,25,30,50]
     *
     * @type {((number | { text: string; value: number })[])}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    sizePerPageList: (number | {
        text: string;
        value: number;
    })[];
    /**
     * hide the going to first and last page button
     * @default true
     *
     * @type {boolean}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    withFirstAndLast: boolean;
    /**
     * react-bootstrap-table2 will hide the next or previous page button if unnecessary.
     * Anyway, you can still show them always via `alwaysShowAllBtns` prop.
     * If you also enable `withFirstAndLast`, this prop also keep to show first and last page when you enable it.
     * @default false
     *
     * @type {boolean}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    alwaysShowAllBtns: boolean;
    /**
     * display pagination information
     *
     * @type {boolean}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    showTotal: boolean;
    /**
     * the text of first page button
     *
     * @type {string}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    firstPageText: string | ReactNode;
    /**
     * the text of previous page button
     *
     * @type {string}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    prePageText: string | ReactNode;
    /**
     * the text of next page button
     *
     * @type {string}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    nextPageText: string | ReactNode;
    /**
     * the text of last page button
     *
     * @type {string}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    lastPageText: string | ReactNode;
    /**
     * the title of next page button
     *
     * @type {string}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    nextPageTitle: string;
    /**
     * the title of previous page button
     *
     * @type {string}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    prePageTitle: string;
    /**
     * the title of first page button
     *
     * @type {string}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    firstPageTitle: string;
    /**
     * the title of last page button
     *
     * @type {string}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    lastPageTitle: string;
    /**
     * hide the size per page dropdown
     *
     * @type {boolean}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    hideSizePerPage: boolean;
    /**
     * hide pagination bar when only one page
     * @default false
     *
     * @type {boolean}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    hidePageListOnlyOnePage: boolean;
    /**
     * callback function when page was changing
     *
     * @param {number} page
     * @param {number} sizePerPage
     * @return {*}  {(void | Promise<void>)}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    onPageChange(page: number, sizePerPage: number): void | Promise<void>;
    /**
     * callback function when page size was changing
     *
     * @param {number} sizePerPage
     * @param {number} page
     * @return {*}  {(void | Promise<void>)}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    onSizePerPageChange(sizePerPage: number, page: number): void | Promise<void>;
    /**
     * custom the pagination total
     *
     * @param {number} from
     * @param {number} to
     * @param {number} size
     * @return {*}  {ReactNode}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    paginationTotalRenderer(from: number, to: number, size: number): ReactNode;
    /**
     * Custom the page button inside the pagination list.
     * This callback function have one argument which is an object and contain following props
     * - **page**: Page number
     * - **active**: If this page is current page or not.
     * - **disabled**: If this page is disabled or not.
     * - **title**: Page title
     * - **onPageChange**: Call it when you need to change page
     * @param {{
     *     page: number
     *     active: boolean
     *     disabled: boolean
     *     title: string
     *     onPageChange: (value: number) => void
     *   }} options
     * @return {*}  {ReactNode}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    pageButtonRenderer(options: {
        page: number;
        active: boolean;
        disabled: boolean;
        title: string;
        onPageChange: (value: number) => void | Promise<void>;
    }): ReactNode;
    /**
     * Custom the pagination list component,
     * this callback function have one argument which is an object and contain following props:
     * - **pages**: Current page
     * - **onPageChange**: Call it when you need to change page
     * @param {({
     *     pages: { page: any }[]
     *     onPageChange: (value: number) => void | Promise<void>
     *   })} options
     * @return {*}  {ReactNode}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    pageListRenderer(options: {
        pages: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            page: any;
        }[];
        onPageChange: (value: number) => void | Promise<void>;
    }): ReactNode;
    /**
     * Custom the size per page dropdown component.
     * this callback function have one argument which is an object and contain following props:
     * - **options**: Dropdown option.
     * - **currSizePerPage**: Current size per page.
     * - **onSizePerPageChange**: Call it when you need to change size per page.
     * @param {({
     *     options: { text: string, page: number }[]
     *     currSizePerPage: number
     *     onSizePerPageChange(page: number): void | Promise<void>
     *   })} renderOptions
     * @return {*}  {ReactNode}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    sizePerPageRenderer(renderOptions: {
        options: {
            text: string;
            page: number;
        }[];
        currSizePerPage: number;
        onSizePerPageChange(page: number): void | Promise<void>;
    }): ReactNode;
    /**
     * Custom the option of size per page dropdown component.
     * this callback function have one argument which is an object and contain following props:
     * - **text**: The text of option.
     * - **page**: The size per page of option.
     * - **onSizePerPageChange**: Call it when you need to change size per page.
     * @param {({
     *     text: string
     *     page: number
     *     onSizePerPageChange(page: number): void | Promise<void>
     *   })} options
     * @return {*}  {ReactNode}
     * @memberof ReactBootstrapTablePaginatorOptionalProps
     */
    sizePerPageOptionRenderer(options: {
        text: string;
        page: number;
        onSizePerPageChange(page: number): void | Promise<void>;
    }): ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReactBootstrapTablePaginatorProps extends Partial<ReactBootstrapTablePaginatorOptionalProps> {
}
export interface PaginationContext<TableData extends DefaultTableData = DefaultTableData> {
    data: TableData[];
    setPaginationRemoteEmitter(remoteEmitter: EventEmitter): void;
}
export interface PaginationFactoryReturn<TableData extends DefaultTableData = DefaultTableData> {
    createContext(): {
        Provider: ComponentType<{
            data: TableData[];
            isRemotePagination(): boolean;
        }>;
        Consumer: Consumer<PaginationContext<TableData>>;
    };
}
declare function paginationFactory<TableData extends DefaultTableData = DefaultTableData>(options?: ReactBootstrapTablePaginatorProps): ReactBootstrapTablePaginatorProps & PaginationFactoryReturn<TableData>;
interface BaseContext {
    paginationProps: ReactBootstrapTablePaginatorProps & {
        bootstrap4: BootstrapTableProps['bootstrap4'];
        tableId: BootstrapTableProps['id'];
    };
    paginationTableProps: {
        pagination: ReactBootstrapTablePaginatorProps;
        setPaginationRemoteEmitter(emitter: EventEmitter): void;
        dataChangeListener: EventEmitter;
    };
}
export declare function createBaseContext(): {
    Provider: ComponentType<{
        pagination: {
            options: ReactBootstrapTablePaginatorProps;
        };
        bootstrap4: BootstrapTableProps['bootstrap4'];
        tableId: BootstrapTableProps['id'];
        children: ReactNode;
    }>;
    Consumer: Consumer<BaseContext>;
};
interface PaginationProviderProps {
    value?: BaseContext;
    children(paginationProps: BaseContext): ReactNode;
}
export declare function PaginationProvider(props: PaginationProviderProps): ReactElement<PaginationProviderProps>;
interface SizePerPageDropdownStandaloneProps {
    /**
     * **open**: `true` to make dropdown show.
     */
    open?: boolean;
    /**
     * **hidden**: `true` to hide the size per page dropdown.
     */
    hidden?: boolean;
    /**
     * **btnContextual**: Set the button contextual
     */
    btnContextual?: string;
    /**
     * **variation**: Variation for dropdown, available value is `dropdown` and `dropup`.
     */
    variation?: 'dropdown' | 'dropup';
    /**
     * **className**: Custom the class on size per page dropdown
     */
    className?: string;
}
export declare function SizePerPageDropdownStandalone(props: SizePerPageDropdownStandaloneProps & BaseContext['paginationProps']): ReactElement<SizePerPageDropdownStandaloneProps & BaseContext['paginationProps']>;
export declare function PaginationListStandalone(props: BaseContext['paginationProps']): ReactElement<BaseContext['paginationProps']>;
export declare function PaginationTotalStandalone(props: BaseContext['paginationProps']): ReactElement<BaseContext['paginationProps']>;
export default paginationFactory;
