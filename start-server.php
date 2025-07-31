<?php
$port = getenv('PORT') ?: 8000;
$port = (int) $port;

// Fail early if .env or APP_KEY missing
if (!file_exists(__DIR__ . '/.env')) {
    echo "ERROR: .env file not found. Make sure to inject it before starting.\n";
    exit(1);
}

$appKey = getenv('APP_KEY');
if (empty($appKey)) {
    echo "ERROR: APP_KEY not set in environment.\n";
    exit(1);
}

// Cache configs and routes for performance
exec('php artisan config:cache');
exec('php artisan route:cache');
exec('php artisan view:cache');

echo "Starting Laravel server on port {$port}...\n";
passthru("php artisan serve --host=0.0.0.0 --port={$port}");
