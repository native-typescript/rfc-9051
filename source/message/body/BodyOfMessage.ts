import type {rfc5322} from "@native-typescript/rfc-5322";
export type BodyOfMessage = null | rfc5322.Message | Uint8Array<ArrayBuffer>;
