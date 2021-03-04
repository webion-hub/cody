DROP TABLE IF EXISTS organization_state;

CREATE TABLE organization_state
(
	id 		  		int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	organization_id int UNIQUE NOT NULL REFERENCES organization(id),
	
	has_been_verified bool NOT NULL DEFAULT false
);