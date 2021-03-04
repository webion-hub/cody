DROP TABLE IF EXISTS organization_detail;

CREATE TABLE organization_detail 
(
	id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	
	city 	text NOT NULL,
	country text NOT NULL,
	
	description text,
	website		text,
	
	organization_id int UNIQUE NOT NULL REFERENCES organization(id)
);