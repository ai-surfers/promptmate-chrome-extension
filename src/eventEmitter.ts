// eventEmitter.ts
import { EventEmitter } from "events";

export const enum EventType {
    Error = "error",
}

export interface ErrorArgs {
    code: number;
    message: string;
}

const eventEmitter = new EventEmitter();

export default eventEmitter;
