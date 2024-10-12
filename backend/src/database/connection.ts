import { Pool } from "pg";

interface ConnectionContructor {
	connectionString: string | "local";
	max?: number;
	ssl?: {
		rejectUnauthorized?: boolean;
	};
}

class Connection {
	#db: Pool = null;

	constructor(configDatabase: ConnectionContructor) {
		if (!configDatabase) {
			throw new Error("Configurações do banco de dados não informadas");
		}

		if (configDatabase.connectionString === "local") {
			console.log("local");
			this.#db = new Pool({
				max: 15,
				ssl: {
					rejectUnauthorized: false,
				},
				host: "localhost",
				database: "ecommerce_sneakers",
				port: 5432,
				password: "postgres",
				user: "postgres",
			});
		} else {
			this.#db = new Pool(configDatabase);
		}
	}

	async create() {
		try {
			await this.#db.connect();
		} catch (error) {
			console.log(error);
		}
	}

	async close() {
		try {
			await this.#db.end();
		} catch (error) {
			console.log(error);
		}
	}

	async query(sql: string, values = []) {
		try {
			const response = await this.#db.query(sql, values);
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	get database() {
		return this.#db;
	}
}

export { Connection };
