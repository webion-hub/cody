DROP TABLE IF EXISTS organization_member;

CREATE TABLE organization_member
(
	organization_id int NOT NULL REFERENCES organization(id),
	user_account_id int NOT NULL REFERENCES user_account(id),
	
	role text NOT NULL
)