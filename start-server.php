<?php
$port = getenv('PORT') ?: 8000;
$port = (int) $port;

// Ensure APP_KEY is set
$appKey = getenv('APP_KEY');
if (empty($appKey)) {
    echo "Generating missing APP_KEY...\n";
    exec('php artisan key:generate --force');
}

// Cache configurations for better performance
exec('php artisan config:cache');
exec('php artisan route:cache');
exec('php artisan view:cache');

echo "Starting Laravel development server on port {$port}...\n";
passthru("php artisan serve --host=0.0.0.0 --port={$port}");
