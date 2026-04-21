import type {User} from "../user/index.ts";
import {waitForDockerMailserverToRememberAddedUsers} from "../waiting-for-Docker-Mailserver-to-remember-added-users/index.ts";
import type {StartedTestContainer} from "testcontainers";
export async function addUsersToDockerMailserver(
	dockerMailserverDockerContainer: StartedTestContainer,
	users: readonly User[],
): Promise<void> {
	await Promise.all(
		users.map<Promise<void>>(async function addUser(user: User): Promise<void> {
			await dockerMailserverDockerContainer.exec(
				`setup email add ${user.address.stringify()} ${user.password}`,
			);
			return;
		}),
	);
	await waitForDockerMailserverToRememberAddedUsers();
	return;
}
