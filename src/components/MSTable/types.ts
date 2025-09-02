export interface ColumnDefinition{
    key: string,
    title?: string,
    sort?: boolean
    filter?: boolean
    width?: string,
    minWidth?: string,
    show?: boolean,
    transform?: (value: any) => any,
}

export interface ColumnFilterType{
    name: string
    label: string
    func: (dataValue: any, value: string) => boolean
}

export interface ActiveColumnFilter{
    column: ColumnDefinition
    type: ColumnFilterType
    value: string
}

export type getNextPageType = (page: number, pageSize: number) => (any[] | Promise<any[]>)

export type VOnObject = {[key: string]: (event?: Event, item?: object) => void}