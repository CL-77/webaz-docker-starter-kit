-- Activation de PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Création des tables
CREATE TABLE objet (
    id integer GENERATED ALWAYS AS IDENTITY,
    nom character varying,
    geom geometry(Point, 4326),
    min_zoom_visible integer,
    depart bool,
    lat float,
    lon float,
    code integer,
    indice character varying,
    id_icone integer,
    id_bloque integer
);

CREATE TABLE icone (
    id integer GENERATED ALWAYS AS IDENTITY,
    nom character varying,
    url character varying,
    taille_x integer,
    taille_y integer
);

-- Insertion des données
INSERT INTO objet (nom, geom, min_zoom_visible, depart, lat, lon, code, indice, id_icone, id_bloque) VALUES
    ('tacheometre1', ST_SetSRID(ST_MakePoint(5.774149, 43.962906), 4326), 19, true, 43.962906, 5.774149, NULL, NULL, 1, NULL),
    ('tacheometre2', ST_SetSRID(ST_MakePoint(5.908676, 43.984754), 4326), 19, true, 43.984754, 5.908676, NULL, NULL, 1, NULL),
    ('tacheometre3', ST_SetSRID(ST_MakePoint(5.791172, 43.961542), 4326), 19, true, 43.961542, 5.791172, NULL, NULL, 1, NULL),
    ('gnss', ST_SetSRID(ST_MakePoint(5.772059, 43.978721), 4326), 19, true, 43.978721, 5.772059, NULL, NULL, 2, NULL),
    ('mire', ST_SetSRID(ST_MakePoint(5.909462, 43.983155), 4326), 19, true, 43.983155, 5.909462, NULL, NULL, 3, NULL),
    ('camera', ST_SetSRID(ST_MakePoint(5.794683, 43.933778), 4326), 19, false, 43.933778, 5.794683, NULL, NULL, 4, NULL),
    ('carte', ST_SetSRID(ST_MakePoint(5.782106, 44.112433), 4326), 19, true, 44.112433, 5.782106, 2425, NULL, 5, NULL),
    ('pc', ST_SetSRID(ST_MakePoint(5.773961, 43.962488), 4326), 19, true, 43.962488, 5.773961, NULL, NULL, 6, 9),
    ('cle', ST_SetSRID(ST_MakePoint(5.782126, 43.957144), 4326), 19, false, 43.957144, 5.782126, NULL, NULL, 7, 10),
    ('porte', ST_SetSRID(ST_MakePoint(5.794508, 43.933737), 4326), 19, true, 43.933737, 5.794508, NULL, 'Porte fermée à clé !', 8, NULL)
;

INSERT INTO icone (nom, url, taille_x, taille_y) VALUES
    ('tacheometre', 'img/tacheometre.png', 50, 50),
    ('gnss', 'img/gnss.png', 50, 50),
    ('mire', 'img/mire.png', 50, 50),
    ('camera', 'img/camera.png', 50, 50),
    ('carte', 'img/carte.png', 45, 110),
    ('pc', 'img/pc.png', 50, 50),
    ('cle', 'img/cle.png', 25, 25),
    ('porte', 'img/porte.png', 50, 50)
;

-- Ajout des contraintes
ALTER TABLE IF EXISTS public.icone
    ADD CONSTRAINT icone_pkey PRIMARY KEY (id);

ALTER TABLE IF EXISTS public.objet
    ADD CONSTRAINT objet_pkey PRIMARY KEY (id);

ALTER TABLE IF EXISTS public.objet
    ADD CONSTRAINT objet_fkey_icone FOREIGN KEY (id_icone)
    REFERENCES public.icone (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public.objet
    ADD CONSTRAINT objet_fkey_objet FOREIGN KEY (id_bloque)
    REFERENCES public.objet (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
