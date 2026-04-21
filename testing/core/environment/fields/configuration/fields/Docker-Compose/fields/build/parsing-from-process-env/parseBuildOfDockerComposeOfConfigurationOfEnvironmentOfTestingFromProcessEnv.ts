import type {schemaForProcessEnvOfTesting} from "../../../../../../../../schema-for-process-env/index.ts";
import type {BuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting} from "../BuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting.ts";
import {
	type ContextOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting,
	type DockerComposeFileOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting,
	parseContextOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv,
	parseDockerComposeFileOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv,
} from "../fields/index.ts";
import type {z} from "zod";
export function parseBuildOfDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
	processEnv: z.output<typeof schemaForProcessEnvOfTesting>,
): BuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting {
	const context: ContextOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting =
		parseContextOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
			processEnv,
		);
	const dockerComposeFile: DockerComposeFileOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting =
		parseDockerComposeFileOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
			processEnv,
		);
	const build: BuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting = {
		context: context,
		dockerComposeFile: dockerComposeFile,
	};
	return build;
}
