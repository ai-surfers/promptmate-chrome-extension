// eventEmitter.ts
import { EventEmitter } from "events";

export const enum EventType {
    Error = "error",
}
const eventEmitter = new EventEmitter();

export default eventEmitter;
