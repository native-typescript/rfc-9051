import type {ConfigurationOfEnvironmentOfTesting} from "../environment/index.ts";
import {startDockerComposeEnvironment} from "../starting-Docker-Compose-environment/index.ts";
import type {DoerInRunningDockerComposeEnvironment} from "./doer/index.ts";
import type {
	StartedDockerComposeEnvironment,
	StartedTestContainer,
} from "testcontainers";
export async function runDockerComposeEnvironment(
	doer: DoerInRunningDockerComposeEnvironment,
	configuration: ConfigurationOfEnvironmentOfTesting,
): Promise<void> {
	const dockerComposeEnvironment: StartedDockerComposeEnvironment =
		await startDockerComposeEnvironment(configuration);
	try {
		const dockerMailserverDockerContainer: StartedTestContainer =
			dockerComposeEnvironment.getContainer(
				configuration.dockerMailserver.dockerContainer.name,
			);
		await doer(dockerMailserverDockerContainer);
		return;
	} finally {
		await dockerComposeEnvironment.down();
	}
}
