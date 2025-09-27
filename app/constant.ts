// Film table - Contains all movie information
export const filmTable = `
CREATE TABLE IF NOT EXISTS film (
    film_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    release_year INTEGER,
    language_id INTEGER NOT NULL,
    rental_duration INTEGER NOT NULL DEFAULT 3,
    rental_rate REAL NOT NULL DEFAULT 4.99,
    length INTEGER,
    replacement_cost REAL NOT NULL DEFAULT 19.99,
    rating TEXT DEFAULT 'G',
    special_features TEXT,
    last_update TEXT DEFAULT CURRENT_TIMESTAMP
);`

// Customer table - Contains customer information  
export const customerTable = `CREATE TABLE IF NOT EXISTS customer (
    customer_id INTEGER PRIMARY KEY,
    store_id INTEGER NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    address_id INTEGER NOT NULL,
    active INTEGER NOT NULL DEFAULT 1,
    create_date TEXT NOT NULL,
    last_update TEXT DEFAULT CURRENT_TIMESTAMP
);`

// Rental table - Contains rental transactions
export const rentalTable = `CREATE TABLE IF NOT EXISTS rental (
    rental_id INTEGER PRIMARY KEY,
    rental_date TEXT NOT NULL,
    inventory_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    return_date TEXT,
    staff_id INTEGER NOT NULL,
    last_update TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);`

// Payment table - Contains payment transactions
export const paymentTable = `CREATE TABLE IF NOT EXISTS payment (
    payment_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    staff_id INTEGER NOT NULL,
    rental_id INTEGER,
    amount REAL NOT NULL,
    payment_date TEXT NOT NULL,
    last_update TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (rental_id) REFERENCES rental(rental_id)
);`

// Example insert statements (use a fixed date string for last_update)
export const insertIntoFilmTable = `REPLACE INTO film (film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features, last_update) VALUES
(1, 'ACADEMY DINOSAUR', 'A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies', 2006, 1, 6, 0.99, 86, 20.99, 'PG', 'Trailers', '2025-09-27 19:00:00'),
(2, 'ACE GOLDFINGER', 'A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China', 2006, 1, 3, 4.99, 48, 12.99, 'G', 'Commentaries', '2025-09-27 19:00:00'),
(3, 'ADAPTATION HOLES', 'A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory', 2006, 1, 7, 2.99, 50, 18.99, 'NC-17', 'Deleted Scenes', '2025-09-27 19:00:00'),
(4, 'AFFAIR PREJUDICE', 'A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank', 2006, 1, 5, 2.99, 117, 26.99, 'G', 'Behind the Scenes', '2025-09-27 19:00:00'),
(5, 'AFRICAN EGG', 'A Fast-Paced Documentary of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico', 2006, 1, 6, 2.99, 130, 22.99, 'G', 'Trailers', '2025-09-27 19:00:00'),
(6, 'AGENT TRUMAN', 'A Intrepid Panorama of a Robot And a Boy who must Escape a Sumo Wrestler in Ancient China', 2006, 1, 3, 2.99, 169, 17.99, 'PG', 'Commentaries', '2025-09-27 19:00:00'),
(7, 'AIRPLANE SIERRA', 'A Touching Saga of a Hunter And a Butler who must Discover a Butler in A Jet Boat', 2006, 1, 6, 4.99, 62, 28.99, 'PG-13', 'Deleted Scenes', '2025-09-27 19:00:00'),
(8, 'AIRPORT POLLOCK', 'A Epic Tale of a Moose And a Girl who must Confront a Monkey in Ancient India', 2006, 1, 4, 4.99, 54, 15.99, 'R', 'Behind the Scenes', '2025-09-27 19:00:00'),
(9, 'ALABAMA DEVIL', 'A Thoughtful Panorama of a Robot And a Composer who must Outgun a Pioneer in A Jet Boat', 2006, 1, 3, 2.99, 114, 18.99, 'PG-13', 'Trailers', '2025-09-27 19:00:00'),
(10, 'ALADDIN CALENDAR', 'A Action-Packed Tale of a Man And a Dog who must Defeat a Sumo Wrestler in A Jet Boat', 2006, 1, 6, 4.99, 63, 24.99, 'NC-17', 'Commentaries', '2025-09-27 19:00:00'),
(11, 'ALAMO VIDEOTAPE', 'A Boring Epistle of a Girl And a Composer who must Outgun a Moose in A Jet Boat', 2006, 1, 3, 0.99, 126, 19.99, 'R', 'Deleted Scenes', '2025-09-27 19:00:00'),
(12, 'ALASKA PHANTOM', 'A Fanciful Reflection of a Car And a Mad Scientist who must Sink a Sumo Wrestler in Ancient India', 2006, 1, 7, 0.99, 136, 21.99, 'PG', 'Behind the Scenes', '2025-09-27 19:00:00'),
(13, 'ALI FOREVER', 'A Fast-Paced Saga of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico', 2006, 1, 6, 4.99, 150, 23.99, 'PG', 'Trailers', '2025-09-27 19:00:00'),
(14, 'ALICE FANTASIA', 'A Intrepid Documentary of a Robot And a Boy who must Escape a Sumo Wrestler in Ancient China', 2006, 1, 3, 0.99, 94, 16.99, 'NC-17', 'Commentaries', '2025-09-27 19:00:00'),
(15, 'ALIEN CENTER', 'A Touching Panorama of a Hunter And a Butler who must Discover a Butler in A Jet Boat', 2006, 1, 6, 2.99, 46, 27.99, 'NC-17', 'Deleted Scenes', '2025-09-27 19:00:00'),
(16, 'ALLEY EVOLUTION', 'A Epic Tale of a Moose And a Girl who must Confront a Monkey in Ancient India', 2006, 1, 4, 0.99, 180, 14.99, 'PG', 'Behind the Scenes', '2025-09-27 19:00:00'),
(17, 'ALONE TRIP', 'A Thoughtful Panorama of a Robot And a Composer who must Outgun a Pioneer in A Jet Boat', 2006, 1, 3, 0.99, 82, 18.99, 'NC-17', 'Trailers', '2025-09-27 19:00:00'),
(18, 'ALTER VICTORY', 'A Action-Packed Tale of a Man And a Dog who must Defeat a Sumo Wrestler in A Jet Boat', 2006, 1, 6, 2.99, 57, 24.99, 'R', 'Commentaries', '2025-09-27 19:00:00'),
(19, 'AMADEUS HOLY', 'A Boring Epistle of a Girl And a Composer who must Outgun a Moose in A Jet Boat', 2006, 1, 3, 0.99, 113, 19.99, 'G', 'Deleted Scenes', '2025-09-27 19:00:00'),
(20, 'AMELIE HELLFIGHTERS', 'A Fanciful Reflection of a Car And a Mad Scientist who must Sink a Sumo Wrestler in Ancient India', 2006, 1, 7, 4.99, 79, 21.99, 'G', 'Behind the Scenes', '2025-09-27 19:00:00');`

export const insertIntoCustomerTable = `
REPLACE INTO customer (customer_id, store_id, first_name, last_name, email, address_id, active, create_date, last_update) VALUES
(1, 1, 'MARY', 'SMITH', 'MARY.SMITH@sakilacustomer.org', 5, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(2, 1, 'PATRICIA', 'JOHNSON', 'PATRICIA.JOHNSON@sakilacustomer.org', 6, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(3, 1, 'LINDA', 'WILLIAMS', 'LINDA.WILLIAMS@sakilacustomer.org', 7, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(4, 1, 'BARBARA', 'JONES', 'BARBARA.JONES@sakilacustomer.org', 8, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(5, 1, 'ELIZABETH', 'BROWN', 'ELIZABETH.BROWN@sakilacustomer.org', 9, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(6, 1, 'JENNIFER', 'DAVIS', 'JENNIFER.DAVIS@sakilacustomer.org', 10, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(7, 1, 'MARIA', 'MILLER', 'MARIA.MILLER@sakilacustomer.org', 11, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(8, 1, 'SUSAN', 'WILSON', 'SUSAN.WILSON@sakilacustomer.org', 12, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(9, 1, 'MARGARET', 'MOORE', 'MARGARET.MOORE@sakilacustomer.org', 13, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(10, 1, 'DOROTHY', 'TAYLOR', 'DOROTHY.TAYLOR@sakilacustomer.org', 14, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(11, 1, 'LISA', 'ANDERSON', 'LISA.ANDERSON@sakilacustomer.org', 15, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(12, 1, 'NANCY', 'THOMAS', 'NANCY.THOMAS@sakilacustomer.org', 16, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(13, 1, 'KAREN', 'JACKSON', 'KAREN.JACKSON@sakilacustomer.org', 17, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(14, 1, 'BETTY', 'WHITE', 'BETTY.WHITE@sakilacustomer.org', 18, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(15, 1, 'HELEN', 'HARRIS', 'HELEN.HARRIS@sakilacustomer.org', 19, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(16, 1, 'SANDRA', 'MARTIN', 'SANDRA.MARTIN@sakilacustomer.org', 20, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(17, 1, 'DONNA', 'THOMPSON', 'DONNA.THOMPSON@sakilacustomer.org', 21, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(18, 1, 'CAROL', 'GARCIA', 'CAROL.GARCIA@sakilacustomer.org', 22, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(19, 1, 'RUTH', 'MARTINEZ', 'RUTH.MARTINEZ@sakilacustomer.org', 23, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00'),
(20, 1, 'SHARON', 'ROBINSON', 'SHARON.ROBINSON@sakilacustomer.org', 24, 1, '2006-02-14 22:04:36', '2025-09-27 19:00:00');`

export const insertIntoRentalTable = `
REPLACE INTO rental (rental_id, rental_date, inventory_id, customer_id, return_date, staff_id, last_update) VALUES
(1, '2005-05-24 22:53:30', 367, 1, '2005-05-26 22:04:30', 1, '2025-09-27 19:00:00'),
(2, '2005-05-24 22:54:33', 1525, 1, '2005-05-28 19:40:33', 1, '2025-09-27 19:00:00'),
(3, '2005-05-24 23:03:39', 1711, 1, '2005-05-26 00:03:39', 1, '2025-09-27 19:00:00'),
(4, '2005-05-24 23:04:41', 2452, 1, '2005-05-27 21:17:41', 1, '2025-09-27 19:00:00'),
(5, '2005-05-24 23:05:21', 2941, 1, '2005-05-27 21:44:21', 1, '2025-09-27 19:00:00'),
(6, '2005-05-24 23:06:39', 1545, 1, '2005-05-27 21:44:39', 1, '2025-09-27 19:00:00'),
(7, '2005-05-24 23:07:09', 2825, 1, '2005-05-27 21:44:09', 1, '2025-09-27 19:00:00'),
(8, '2005-05-24 23:08:46', 401, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(9, '2005-05-24 23:10:46', 1185, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(10, '2005-05-24 23:11:46', 2826, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(11, '2005-05-24 23:12:46', 401, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(12, '2005-05-24 23:13:46', 1185, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(13, '2005-05-24 23:14:46', 2826, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(14, '2005-05-24 23:15:46', 401, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(15, '2005-05-24 23:16:46', 1185, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(16, '2005-05-24 23:17:46', 2826, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(17, '2005-05-24 23:18:46', 401, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(18, '2005-05-24 23:19:46', 1185, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(19, '2005-05-24 23:20:46', 2826, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00'),
(20, '2005-05-24 23:21:46', 401, 1, '2005-05-27 21:44:46', 1, '2025-09-27 19:00:00');`

export const insertIntoPaymentTable = `
REPLACE INTO payment (payment_id, customer_id, staff_id, rental_id, amount, payment_date, last_update) VALUES
(1, 1, 1, 1, 2.99, '2005-05-25 11:30:37', '2025-09-27 19:00:00'),
(2, 1, 1, 2, 0.99, '2005-05-28 15:35:57', '2025-09-27 19:00:00'),
(3, 1, 1, 3, 5.99, '2005-06-15 18:24:34', '2025-09-27 19:00:00'),
(4, 1, 1, 4, 0.99, '2005-06-15 21:54:12', '2025-09-27 19:00:00'),
(5, 1, 1, 5, 4.99, '2005-06-15 22:54:33', '2025-09-27 19:00:00'),
(6, 1, 1, 6, 0.99, '2005-06-16 09:54:12', '2025-09-27 19:00:00'),
(7, 1, 1, 7, 2.99, '2005-06-16 10:54:12', '2025-09-27 19:00:00'),
(8, 1, 1, 8, 0.99, '2005-06-16 11:54:12', '2025-09-27 19:00:00'),
(9, 1, 1, 9, 4.99, '2005-06-16 12:54:12', '2025-09-27 19:00:00'),
(10, 1, 1, 10, 0.99, '2005-06-16 13:54:12', '2025-09-27 19:00:00'),
(11, 1, 1, 11, 2.99, '2005-06-16 14:54:12', '2025-09-27 19:00:00'),
(12, 1, 1, 12, 0.99, '2005-06-16 15:54:12', '2025-09-27 19:00:00'),
(13, 1, 1, 13, 4.99, '2005-06-16 16:54:12', '2025-09-27 19:00:00'),
(14, 1, 1, 14, 0.99, '2005-06-16 17:54:12', '2025-09-27 19:00:00'),
(15, 1, 1, 15, 2.99, '2005-06-16 18:54:12', '2025-09-27 19:00:00'),
(16, 1, 1, 16, 0.99, '2005-06-16 19:54:12', '2025-09-27 19:00:00'),
(17, 1, 1, 17, 4.99, '2005-06-16 20:54:12', '2025-09-27 19:00:00'),
(18, 1, 1, 18, 0.99, '2005-06-16 21:54:12', '2025-09-27 19:00:00'),
(19, 1, 1, 19, 2.99, '2005-06-16 22:54:12', '2025-09-27 19:00:00'),
(20, 1, 1, 20, 0.99, '2005-06-16 23:54:12', '2025-09-27 19:00:00');`
