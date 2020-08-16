import {Workbook} from 'exceljs'

export async function init(){
    
    const workbook = new Workbook()
    
    await workbook.xlsx.readFile('./public/pool.xlsx')
    
    const worksheet = workbook.getWorksheet('Sheet1');
    
    return worksheet
} 