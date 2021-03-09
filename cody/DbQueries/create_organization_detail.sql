DROP TABLE IF EXISTS organization_detail;

CREATE TABLE organization_detail 
(
	id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	
	city 		text,
	country 	text,
	description text CHECK (length(description) <= 512),
	website		text,
	
	organization_id int UNIQUE NOT NULL REFERENCES organization(id)
);