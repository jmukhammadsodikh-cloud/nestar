import { ObjectId } from "mongoose";

export interface T {
    [key: string]: any;
}

export interface StatisticModifier {
    _id: ObjectId; // collection doc id
    targetKey: string; // memberPropertise misol
    modifier: number; //  + 1 
}