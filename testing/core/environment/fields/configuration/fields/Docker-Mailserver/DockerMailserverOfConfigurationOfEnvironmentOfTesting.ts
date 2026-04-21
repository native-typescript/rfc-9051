import type {ImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting} from "./fields/index.ts";
export type DockerMailserverOfConfigurationOfEnvironmentOfTesting = {
	readonly dockerContainer: {readonly name: string};
	readonly imap: ImapOfDockerMailserverOfConfigurationOfEnvironmentOfTesting;
};
