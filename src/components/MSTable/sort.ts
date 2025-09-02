import { sort } from "fast-sort";

export default {
    sortData<T extends {[key: string]: any}>(data: T[], key: string, desc: boolean){      
        if (key){
            if (desc){
                return sort(data).desc(u => u[key])
            }
            else{
                return sort(data).asc(u => u[key])
            }
        }
        else{
            return data
        }
          
    }
}