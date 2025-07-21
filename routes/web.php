<?php

use App\Http\Controllers\ClassController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('students', StudentController::class);

    Route::resource('sections', SectionController::class);

    Route::resource('classes', ClassController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
