import { ColumnDefinition } from "./types"

function title(text: string){
    text = text.replaceAll('_', ' ')
    const words = text.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    })
    
    return words.join(' ')
}

export default function(columns: ColumnDefinition[], sampleData?: object){    
    if ((columns ?? []).length > 0) {
        for (let column of columns){
            column.title = column.title ?? title(column.key)
            column.filter = column.filter ?? true
            column.sort = column.sort ?? true
            column.show = column.show ?? true
            if (column.transform == null){
                column.transform = (value: any) => value[column.key]
            }
        }
        
        return columns
    }
    else{
        const keys = Object.keys(sampleData ?? {})
        const definedColumns: ColumnDefinition[] = keys.map(key => {
            return {
                key,
                title: title(key),
                filter: true,
                sort: true,
                show: true,
                transform: (value: any) => value[key]
            }
        })
        
        return definedColumns
    }
}