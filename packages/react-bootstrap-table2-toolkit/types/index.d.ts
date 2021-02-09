/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="node" />
import { Context as ReactContext, Component, ReactNode, ReactElement, CSSProperties, MouseEventHandler, FC, ButtonHTMLAttributes } from 'react';
import { DefaultTableData, BootstrapTableColumns, BootstrapTableProps, ReactBootstrapTableUtilities, EventEmitter } from 'react-bootstrap-table-next-esm';
export interface ToolkitContextValueSearchProps {
    searchText: string;
    onSearch(searchText: string): void;
    onClear(): void;
}
export interface ToolkitContextValueCSVProps<CSVSource = any> {
    onExport(source: CSVSource): void;
}
export interface ToolkitContextValueColumnToggleProps<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> {
    columns: Columns[];
    toggles: null | Record<keyof TableData | string, boolean>;
    onColumnToggle(dataField: keyof TableData | string): void;
}
declare type SearchContext<TableData extends DefaultTableData = DefaultTableData> = ReactContext<{
    data: TableData[];
}>;
interface SearchContextProviderProps<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> {
    data: TableData[];
    columns: Columns[];
    searchText: string;
    dataChangeListener: EventEmitter;
}
declare type createSearchContext<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>, SearchProps extends ToolkitContextProviderPropsSearch<TableData, Columns> = ToolkitContextProviderPropsSearch<TableData, Columns>> = (options: SearchProps) => (_: ReactBootstrapTableUtilities, isRemoteSearch: (() => boolean), handleRemoteSearchChange: (searchText: string) => void | Promise<void>) => {
    Provider: Component<SearchContextProviderProps<TableData, Columns>, {
        data: TableData[];
    }>;
    Consumer: SearchContext<TableData>['Consumer'];
};
export interface ToolkitContextValueBaseProps<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>, SearchProps extends ToolkitContextValueSearchProps = ToolkitContextValueSearchProps, ColumnToggleProps extends ToolkitContextValueColumnToggleProps<TableData, Columns> = ToolkitContextValueColumnToggleProps<TableData, Columns>> {
    keyField: BootstrapTableProps<TableData, Columns>['keyField'];
    columns: BootstrapTableProps<TableData, Columns>['columns'];
    data: BootstrapTableProps<TableData, Columns>['data'];
    bootstrap4: BootstrapTableProps<TableData, Columns>['bootstrap4'];
    setDependencyModules(utilities: ReactBootstrapTableUtilities): void;
    registerExposedAPI(emitter: EventEmitter): void;
    search?: {
        searchContext: createSearchContext<TableData, Columns>;
        searchText: SearchProps['searchText'];
    };
    columnToggle?: {
        toggles: ColumnToggleProps['toggles'];
    };
}
export interface ToolkitContextValue<SearchProps extends ToolkitContextValueSearchProps = ToolkitContextValueSearchProps, CSVSource = any, CSVProps extends ToolkitContextValueCSVProps<CSVSource> = ToolkitContextValueCSVProps<CSVSource>, TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>, ColumnToggleProps extends ToolkitContextValueColumnToggleProps<TableData, Columns> = ToolkitContextValueColumnToggleProps<TableData, Columns>, BaseProps extends ToolkitContextValueBaseProps<TableData, Columns, SearchProps> = ToolkitContextValueBaseProps<TableData, Columns, SearchProps>> {
    searchProps: SearchProps;
    csvProps: CSVProps;
    columnToggleProps: ColumnToggleProps;
    baseProps: BaseProps;
}
export declare type ToolkitContextType = ReactContext<ToolkitContextValue>;
export interface OnColumnMatchOptions<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> {
    searchText: string;
    row: TableData;
    column: Columns;
    value: any;
}
export interface ToolkitContextProviderPropsSearchOptional<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> {
    tableId: string;
    className: string;
    placeholder: string;
    style: CSSProperties;
    delay: number;
    srText: string;
    defaultSearch: string;
    searchFormatted: boolean;
    onColumnMatch(options: OnColumnMatchOptions<TableData, Columns>): boolean | Promise<boolean>;
    afterSearch(newResult: TableData[]): void | Promise<void>;
}
export interface ToolkitContextProviderPropsSearch<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> extends Partial<ToolkitContextProviderPropsSearchOptional<TableData, Columns>> {
}
declare type SearchBar<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> = (props: ToolkitContextProviderPropsSearch<TableData, Columns>) => Component<ToolkitContextProviderPropsSearch<TableData, Columns>>;
declare interface ClearSearchButtonPropsOptional {
    className: string;
    text: string;
}
declare interface ClearSearchButtonProps extends Partial<ClearSearchButtonPropsOptional> {
    onClear(event: MouseEventHandler<HTMLButtonElement>): void | Promise<void>;
}
declare type ClearSearchButton = FC<ClearSearchButtonProps>;
interface ExportCSVButtonPropsOptional extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
}
interface ExportCSVButtonProps extends Partial<ExportCSVButtonPropsOptional> {
    children: ReactNode;
    onExport(event: MouseEventHandler<HTMLButtonElement>): void | Promise<void>;
}
declare type ExportCSVButton = FC<ExportCSVButtonProps>;
export declare type CSVExport = {
    ExportCSVButton: ExportCSVButton;
};
export declare type Search<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> = {
    SearchBar: SearchBar<TableData, Columns>;
    ClearSearchButton: ClearSearchButton;
};
interface ToolkitContextProviderPropsExportCSVOptional {
    fileName: string;
    separator: string;
    ignoreHeader: boolean;
    ignoreFooter: boolean;
    noAutoBOM: boolean;
    blobType: string;
    exportAll: boolean;
    onlyExportFiltered: boolean;
    onlyExportSelection: boolean;
}
export interface ToolkitContextProviderPropsExportCSV extends Partial<ToolkitContextProviderPropsExportCSVOptional> {
}
interface ToolkitContextProviderOptionalProps<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> {
    search: boolean | Partial<ToolkitContextProviderPropsSearch<TableData, Columns>>;
    exportCSV: boolean | Partial<ToolkitContextProviderPropsExportCSV>;
}
interface ToggleListPropsOptional {
    btnClassName: string;
    className: string;
    contextual: string;
}
export interface ToggleListProps<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> extends Partial<ToggleListPropsOptional> {
    columns: Columns[];
    toggles: Record<keyof TableData | string, boolean>;
    onColumnToggle(keyField: keyof TableData | string): void | Promise<void>;
}
declare type ToggleList<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> = (props: ToggleListProps<TableData, Columns>) => ReactElement<ToggleListProps<TableData, Columns>>;
export declare type ColumnToggle<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> = {
    ToggleList: ToggleList<TableData, Columns>;
};
export interface ToolkitContextProviderProps<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> extends Partial<ToolkitContextProviderOptionalProps<TableData, Columns>> {
    keyField: BootstrapTableProps<TableData, Columns>['keyField'];
    columns: BootstrapTableProps<TableData, Columns>['columns'];
    data: BootstrapTableProps<TableData, Columns>['data'];
    bootstrap4: BootstrapTableProps<TableData, Columns>['bootstrap4'];
    children: ReactNode;
}
export declare type ToolkitContext = {
    Provider: Component<ToolkitContextProviderProps>;
    Consumer: ToolkitContextType['Consumer'];
};
export interface ToolkitProviderProps<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>> extends ToolkitContextProviderProps<TableData, Columns> {
    children(props: ToolkitContextProviderProps<TableData, Columns>): ReactNode;
}
declare function ToolkitProvider<TableData extends DefaultTableData = DefaultTableData, Columns extends BootstrapTableColumns<TableData> = BootstrapTableColumns<TableData>>(props: ToolkitProviderProps<TableData, Columns>): ReactElement<ToolkitProviderProps<TableData, Columns>>;
export default ToolkitProvider;
