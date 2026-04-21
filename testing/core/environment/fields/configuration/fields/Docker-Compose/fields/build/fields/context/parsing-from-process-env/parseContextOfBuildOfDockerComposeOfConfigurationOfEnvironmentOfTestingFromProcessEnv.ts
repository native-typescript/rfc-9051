import type {schemaForProcessEnvOfTesting} from "../../../../../../../../../../schema-for-process-env/index.ts";
import type {ContextOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting} from "../ContextOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting.ts";
import type {z} from "zod";
export function parseContextOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
	processEnv: z.output<typeof schemaForProcessEnvOfTesting>,
): ContextOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting {
	const context: ContextOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting =
		{path: `./testing`};
	return context;
}
