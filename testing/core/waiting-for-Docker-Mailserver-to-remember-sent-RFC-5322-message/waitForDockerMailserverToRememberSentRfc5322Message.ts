export async function waitForDockerMailserverToRememberSentRfc5322Message(): Promise<void> {
	await new Promise<void>(function resolveAfterDelay(resolve): void {
		setTimeout(resolve, 1500);
		return;
	});
	return;
}
