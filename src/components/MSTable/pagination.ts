export default {
    getRange(pageSize: number, currentPage: number){
        //end value is exclusive
        const start = (currentPage - 1) * pageSize
        const end = start + pageSize
        return {start, end}
    },
    getPage(data: any[], pageSize: number, currentPage: number){
        const {start, end} = this.getRange(pageSize, currentPage)
        return data.slice(start, end)
    }
}