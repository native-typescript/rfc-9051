import {wait} from "@native-typescript/waiting";
export async function waitForDockerMailserverToRememberAddedUsers(): Promise<void> {
	await wait(12);
	return;
}
