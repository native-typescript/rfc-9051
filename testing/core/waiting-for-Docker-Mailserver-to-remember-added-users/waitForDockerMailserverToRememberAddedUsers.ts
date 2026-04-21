import {waiting} from "@native-typescript/waiting";
export async function waitForDockerMailserverToRememberAddedUsers(): Promise<void> {
	await waiting.wait(12);
	return;
}
