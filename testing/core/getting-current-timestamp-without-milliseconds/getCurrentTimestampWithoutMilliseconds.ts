export function getCurrentTimestampWithoutMilliseconds(): Date {
	const currentTimestamp: Date = new Date();
	currentTimestamp.setMilliseconds(0);
	return currentTimestamp;
}
