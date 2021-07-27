CREATE TABLE recommendations (
    id INTEGER PRIMARY KEY,
    "name" TEXT,
    "youtubeLink" TEXT,
    score INTEGER DEFAULT 0 ,
    genres TEXT[] DEFAULT NULL
)