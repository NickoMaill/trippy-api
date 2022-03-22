CREATE TABLE hotels (
    id INTEGER,
    name VARCHAR(50),
    address VARCHAR(50),
    city VARCHAR(50),
	country VARCHAR(50),
    stars INTEGER,
    has_spa BOOLEAN NOT NULL,
    has_pool BOOLEAN NOT NULL,
    price_category INTEGER
);

INSERT INTO hotels (
        id,
        name,
        address,
        city,
		country,
        stars,
        has_spa,
        has_pool,
        price_category
    )
VALUES (
        35689,
        'Imperial Hotel',
        '84 av des Champs-Élysées',
        'Paris',
		'France',
        5,
        true,
        true,
        3
    ),
    (
        78945,
        'The Queen',
        '3 Darwin Street',
        'London',
        'England',
        4,
        true,
        false,
        3
    ),
    (
        12365,
        'Kiwi land',
        '4587 George St.',
        'Auckland',
        'New-Zealand',
        3,
        false,
        true,
        2
    );
	
SELECT * FROM hotels;
