DROP TABLE IF EXISTS argon2_password_metadata;

CREATE TABLE argon2_password_metadata (
	id 			int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	password_id int NOT NULL REFERENCES user_account_password(id) ON DELETE CASCADE,

	degree_of_parallelism int NOT NULL,
	iterations    int NOT NULL,
	memory_size   int NOT NULL,
	digest_length int NOT NULL
);