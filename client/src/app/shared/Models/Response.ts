import { IProduct } from "./Product";

export interface IResponse{
    pageIndex : number,
    pageSize: number,
    count: number,
    data: IProduct[]
}