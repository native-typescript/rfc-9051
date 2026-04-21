import type {ConfigurationOfEnvironmentOfTesting} from "../environment/index.ts";
import {
	DockerComposeEnvironment,
	type StartedDockerComposeEnvironment,
	Wait,
} from "testcontainers";
export async function startDockerComposeEnvironment(
	configuration: ConfigurationOfEnvironmentOfTesting,
): Promise<StartedDockerComposeEnvironment> {
	const dockerComposeEnvironment: DockerComposeEnvironment =
		new DockerComposeEnvironment(
			configuration.dockerCompose.build.context.path,
			[configuration.dockerCompose.build.dockerComposeFile.path],
		);
	const startedDockerComposeEnvironment: StartedDockerComposeEnvironment =
		await dockerComposeEnvironment
			.withDefaultWaitStrategy(
				Wait.forLogMessage(
					`You need at least one mail account to start Dovecot (120s left for account creation before shutdown)`,
				),
			)
			.up();
	return startedDockerComposeEnvironment;
}
