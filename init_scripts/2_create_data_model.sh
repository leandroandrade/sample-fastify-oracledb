echo "CREATE TABLE heroes (
    hero_id NUMBER NOT NULL,
    name VARCHAR2(100) NOT NULL,
    description VARCHAR2(100) NOT NULL,
    CONSTRAINT pk_heroes PRIMARY KEY (hero_id)
);

INSERT INTO heroes (hero_id, name, description) VALUES (1, 'Superman', 'The Man of Steel');
INSERT INTO heroes (hero_id, name, description) VALUES (2, 'Batman', 'The Dark Knight');
INSERT INTO heroes (hero_id, name, description) VALUES (3, 'Wonder Woman', 'The Amazonian Princess');
INSERT INTO heroes (hero_id, name, description) VALUES (4, 'The Flash', 'The Scarlet Speedster');
INSERT INTO heroes (hero_id, name, description) VALUES (5, 'Aquaman', 'The King of Atlantis');
INSERT INTO heroes (hero_id, name, description) VALUES (6, 'Green Lantern', 'The Emerald Knight');
INSERT INTO heroes (hero_id, name, description) VALUES (7, 'Cyborg', 'Half Man, Half Machine');
INSERT INTO heroes (hero_id, name, description) VALUES (8, 'Shazam', 'The Worlds Mightiest Mortal');
INSERT INTO heroes (hero_id, name, description) VALUES (9, 'Green Arrow', 'The Emerald Archer');
INSERT INTO heroes (hero_id, name, description) VALUES (10, 'Batwoman', 'The Dark Knight Detective');

COMMIT;" | sqlplus -s test/test@//localhost/XEPDB1
