CREATE TABLE restaurants (
    id INTEGER,
    name VARCHAR(50),
    address VARCHAR(50),
    city VARCHAR(50),
    country VARCHAR(50),
    stars INTEGER,
    cuisine VARCHAR(50),
    price_category INTEGER
);
INSERT INTO hotels (
        id,
        name,
        address,
        city,
        country,
        stars,
        cuisine,
        price_category
    )
VALUES (
        13056,
        'Les trois Mousquetaires',
        '22 av des Champs-Élysées',
        'Paris',
        'France',
        4
    ),
    (
        15689,
        'The Fat Guy',
        '47 Jackson Boulevard',
        'New York',
        'US',
        5,
        'burger',
        1
    ),
    (
        18875,
        'Veggies',
        '77 Avenir Street',
        'Sydney',
        'Australia',
        5,
        'vegan',
        2
    );

SELECT * FROM restaurants;