DROP TABLE IF EXISTS organization_logo;

CREATE TABLE organization_logo
(
	id 		  int  NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	file_path text NOT NULL,
	
	organization_detail_id int NOT NULL,
	
	CONSTRAINT organization_detail_fk
		FOREIGN KEY(organization_detail_id)
		REFERENCES organization_detail(id)
);