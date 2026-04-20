export type ContentTypeOfTextPlainNodeOfBodystructureOfMessage = {
	readonly parameters: {
		readonly charset:
			| `GB18030`
			| `ISO-8859-1`
			| `ISO-8859-2`
			| `US-ASCII`
			| `UTF-8`
			| null;
		readonly format: `flowed` | null;
		readonly name: null | string;
	};
	readonly value: `text/plain`;
};
