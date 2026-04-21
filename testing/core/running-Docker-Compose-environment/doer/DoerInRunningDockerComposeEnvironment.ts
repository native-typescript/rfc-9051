import type {StartedTestContainer} from "testcontainers";
export type DoerInRunningDockerComposeEnvironment = (
	dockerContainerOfDockerMailserver: StartedTestContainer,
) => Promise<void>;
