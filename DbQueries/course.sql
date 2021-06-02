create table course (
	id int primary key not null,
	
	title text not null check (length(title) <= 256),
	description text check (length(description) <= 512),
	
	organization_id int not null references organization(id)
);