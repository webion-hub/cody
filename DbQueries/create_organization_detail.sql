DROP TABLE IF EXISTS organization_detail;

CREATE TABLE organization_detail 
(
	id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	
	city 		text CHECK (length(city) <= 256),
	country 	text CHECK (length(country) <= 256),
	region 		text CHECK (length(country) <= 256),
	description text CHECK (length(description) <= 512),
	website		text CHECK (length(website) <= 256),
	
	organization_id int UNIQUE NOT NULL REFERENCES organization(id)
);