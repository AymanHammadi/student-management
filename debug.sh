#!/bin/bash

echo "=== Laravel Student Management Debug Info ==="
echo "Current time: $(date)"
echo "Current directory: $(pwd)"
echo "Current user: $(whoami)"
echo ""

echo "=== Environment ==="
echo "APP_ENV: $APP_ENV"
echo "APP_DEBUG: $APP_DEBUG"
echo "DB_CONNECTION: $DB_CONNECTION"
echo "DB_DATABASE: $DB_DATABASE"
echo ""

echo "=== Database File Info ==="
if [ -f "$DB_DATABASE" ]; then
    echo "Database file exists: $DB_DATABASE"
    echo "Database file size: $(ls -lh $DB_DATABASE | awk '{print $5}')"
    echo "Database file permissions: $(ls -l $DB_DATABASE)"
else
    echo "Database file does not exist: $DB_DATABASE"
fi
echo ""

echo "=== Directory Permissions ==="
echo "Database directory:"
ls -la /app/database/ || echo "Directory does not exist"
echo ""

echo "=== Laravel Artisan Status ==="
php artisan --version
echo ""

echo "=== Database Connection Test ==="
php artisan tinker --execute="
try {
    \DB::connection()->getPdo();
    echo 'Database connection: SUCCESS';
} catch (Exception \$e) {
    echo 'Database connection FAILED: ' . \$e->getMessage();
}
" 2>&1
echo ""

echo "=== Table Counts ==="
php artisan tinker --execute="
try {
    echo 'Users: ' . \App\Models\User::count();
    echo 'Classes: ' . \App\Models\ClassModel::count();
    echo 'Sections: ' . \App\Models\Section::count();
    echo 'Students: ' . \App\Models\Student::count();
} catch (Exception \$e) {
    echo 'Error counting records: ' . \$e->getMessage();
}
" 2>&1

echo ""
echo "=== End Debug Info ==="
