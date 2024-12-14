// eventEmitter.ts
import { AxiosRequestHeaders } from "axios";
import { EventEmitter } from "events";

export const enum EventType {
    Error = "error",
}

export interface ErrorArgs {
    code: number;
    message: string;
    headers?: AxiosRequestHeaders;
}

const eventEmitter = new EventEmitter();

export default eventEmitter;
