DROP TABLE IF EXISTS school_account_state;

CREATE TABLE school_account_state
(
	id 		  int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	school_id int NOT NULL,
	
	has_been_verified bool NOT NULL DEFAULT false,
	
	CONSTRAINT school_id_fk
		FOREIGN KEY (school_id)
		REFERENCES school_account(id)
);