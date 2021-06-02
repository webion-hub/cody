CREATE OR REPLACE FUNCTION notify_update() RETURNS trigger AS $$ 
DECLARE 
	what text := TG_ARGV[0]::text;
BEGIN
	PERFORM pg_notify(what, row_to_json(NEW)::text);
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;