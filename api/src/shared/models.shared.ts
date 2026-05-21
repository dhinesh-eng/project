import { type } from "os";

interface AtPayload {
	readonly sub: string;
	readonly sid: string;
	readonly username: string;
	readonly LoggedUserGuid: string;
}

export type { AtPayload };
