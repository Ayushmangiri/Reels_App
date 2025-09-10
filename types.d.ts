import { Connection } from "mongoose";

declare global {
    var mongoose :{
        conn : Connection | null;
        promiss:promise<Connection> | null;

    }
}

export {};