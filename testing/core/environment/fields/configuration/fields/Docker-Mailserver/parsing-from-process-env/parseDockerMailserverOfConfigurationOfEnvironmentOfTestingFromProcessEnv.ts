import type {schemaForProcessEnvOfTesting} from "../../../../../../schema-for-process-env/index.ts";
import type {DockerMailserverOfConfigurationOfEnvironmentOfTesting} from "../DockerMailserverOfConfigurationOfEnvironmentOfTesting.ts";
import {
	type ImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting,
	parseImapOfDockerMailserverOfConfigurationOfEnvironmentOfTestingFromProcessEnv,
} from "../fields/index.ts";
import type {z} from "zod";
export function parseDockerMailserverOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
	processEnv: z.output<typeof schemaForProcessEnvOfTesting>,
): DockerMailserverOfConfigurationOfEnvironmentOfTesting {
	const imap: ImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting =
		parseImapOfDockerMailserverOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
			processEnv,
		);
	const dockerMailserver: DockerMailserverOfConfigurationOfEnvironmentOfTesting =
		{dockerContainer: {name: `docker-mailserver`}, imap: imap};
	return dockerMailserver;
}
