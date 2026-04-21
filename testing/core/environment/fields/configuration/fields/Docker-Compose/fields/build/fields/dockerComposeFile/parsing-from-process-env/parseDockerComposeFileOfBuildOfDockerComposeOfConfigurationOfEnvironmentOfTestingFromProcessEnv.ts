import type {schemaForProcessEnvOfTesting} from "../../../../../../../../../../schema-for-process-env/index.ts";
import type {DockerComposeFileOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting} from "../DockerComposeFileOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting.ts";
import type {z} from "zod";
export function parseDockerComposeFileOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
	processEnv: z.output<typeof schemaForProcessEnvOfTesting>,
): DockerComposeFileOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting {
	const dockerComposeFile: DockerComposeFileOfBuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting =
		{path: `./docker-compose.yaml`};
	return dockerComposeFile;
}
