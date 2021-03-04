DROP TABLE IF EXISTS organization;

CREATE TABLE organization
(
	id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	
	name text NOT NULL,
	kind text NOT NULL,
	
	owner_id int NOT NULL REFERENCES user_account(id),
	
	UNIQUE (name, kind)
);