import type {schemaForProcessEnvOfTesting} from "../../../../../../../../schema-for-process-env/index.ts";
import {
	parsePortOfImapOfDockerMailserverOfConfigurationOfEnvironmentOfTestingFromProcessEnv,
	type PortOfImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting,
} from "../fields/index.ts";
import type {ImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting} from "../ImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting.ts";
import type {z} from "zod";
export function parseImapOfDockerMailserverOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
	processEnv: z.output<typeof schemaForProcessEnvOfTesting>,
): ImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting {
	const port: PortOfImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting =
		parsePortOfImapOfDockerMailserverOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
			processEnv,
		);
	const imap: ImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting = {
		port: port,
	};
	return imap;
}
