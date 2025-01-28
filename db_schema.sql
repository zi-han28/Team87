
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;
-- Create your tables with SQL commands

-- Table for event inputs
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Set as UTC for accuracy
    published_at TIMESTAMP DEFAULT (DATETIME('now', 'localtime')), -- Local time
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- set as UTC for accuracy
    state TEXT NOT NULL CHECK(state IN ('draft', 'published')),
    full_price_tickets INTEGER,
    full_price_ticket_price REAL,-- set to REAL for price decimal points
    concession_tickets INTEGER,
    concession_ticket_price REAL-- set to REAL for price decimal points
);

-- update last_modified when a  draft event is created or editted
CREATE TRIGGER update_last_modified
AFTER UPDATE ON events
BEGIN
    UPDATE events
    SET last_modified = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;

-- Table for settings input
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);
-- Table for bookings data record
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    attendee_name TEXT NOT NULL,
    full_price_tickets INTEGER DEFAULT 0,
    concession_tickets INTEGER DEFAULT 0,
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE --to delete child rows
);
-- essential to site settings
INSERT INTO settings (id, name, description) VALUES (1, 'Default Site Name', 'Default Site Description');

COMMIT;

