import type {schemaForProcessEnvOfTesting} from "../../../../../../../../../../schema-for-process-env/index.ts";
import type {PortOfImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting} from "../PortOfImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting.ts";
import type {z} from "zod";
export function parsePortOfImapOfDockerMailserverOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
	processEnv: z.output<typeof schemaForProcessEnvOfTesting>,
): PortOfImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting {
	const port: PortOfImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting =
		{internalNumber: 143, isWithTls: false};
	return port;
}
