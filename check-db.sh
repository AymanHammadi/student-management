#!/bin/bash

# Script to check if database has data and seed if necessary

echo "Checking database state..."

# Check if database file exists and has content
if [ ! -f /app/database/database.sqlite ] || [ ! -s /app/database/database.sqlite ]; then
    echo "Database file doesn't exist or is empty"
    exit 1
fi

# Check if tables exist
TABLES_COUNT=$(php artisan tinker --execute="
try {
    echo \DB::connection()->getPdo()->query('SELECT COUNT(*) FROM sqlite_master WHERE type=\"table\" AND name NOT LIKE \"sqlite_%\"')->fetchColumn();
} catch (Exception \$e) {
    echo '0';
}
" 2>/dev/null || echo "0")

echo "Found $TABLES_COUNT tables in database"

if [ "$TABLES_COUNT" = "0" ] || [ "$TABLES_COUNT" = "" ]; then
    echo "No tables found, database needs migration and seeding"
    exit 1
fi

# Check if we have any users (basic data check)
USER_COUNT=$(php artisan tinker --execute="
try {
    echo \App\Models\User::count();
} catch (Exception \$e) {
    echo '0';
}
" 2>/dev/null || echo "0")

echo "Found $USER_COUNT users in database"

if [ "$USER_COUNT" = "0" ] || [ "$USER_COUNT" = "" ]; then
    echo "No users found, database needs seeding"
    exit 1
fi

# Check if we have any students (seeded data check)
STUDENT_COUNT=$(php artisan tinker --execute="
try {
    echo \App\Models\Student::count();
} catch (Exception \$e) {
    echo '0';
}
" 2>/dev/null || echo "0")

echo "Found $STUDENT_COUNT students in database"

if [ "$STUDENT_COUNT" = "0" ] || [ "$STUDENT_COUNT" = "" ]; then
    echo "No students found, database needs seeding"
    exit 1
fi

echo "Database appears to be properly seeded with data"
exit 0
