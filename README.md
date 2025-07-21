# Student Management System

A simple learning project built with Laravel, Inertia.js, and React. This is my first Laravel project created to practice and understand how Laravel works with Inertia and React integration.

> **Note**: This is a practice/learning project and is not intended for production use.

## About This Project

This project demonstrates basic CRUD operations for managing students, classes, and sections. It was built using Laravel's React starter kit to explore modern web development with:

- Laravel backend with Inertia.js
- React frontend with TypeScript
- Modern UI components with shadcn and Tailwind CSS
- Multiple theme support (Light, Dark, Green)

## Tech Stack

- **Backend**: Laravel 11, PHP 8.2+
- **Frontend**: React 18, TypeScript, Inertia.js
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: SQLite (for simplicity)
- **Build Tools**: Vite

## Getting Started

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js & npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AymanHammadi/student-management.git
cd student-management
```

2. **Install PHP dependencies**
```bash
composer install
```

3. **Install Node.js dependencies**
```bash
npm install
```

4. **Environment setup**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Database setup**
```bash
php artisan migrate:fresh --seed
```

6. **Build frontend assets**
```bash
npm run build
# or for development with hot reload:
npm run dev
```

7. **Start the development server**
```bash
php artisan serve
```

Visit `http://localhost:8000` to see the application.

### Alternative: Using Laravel Herd

Or, you can use [Laravel Herd](https://herd.laravel.com/) - a native Laravel development environment:

1. **Install Herd** from [herd.laravel.com](https://herd.laravel.com/)
2. **Add your project** to Herd by opening the project folder in Herd
3. **Access your site** at `http://student-management.test` (or your chosen domain)


## Project Structure

- **Models**: `Student`, `ClassModel`, `Section` - Basic Eloquent models with relationships
- **Controllers**: RESTful controllers for CRUD operations
- **Frontend**: React components with TypeScript, using Inertia.js 
- **Themes**: Multiple appearance options (Light, Dark, Green, System)
- **Authentication**: Laravel Breeze with Inertia React preset

## Learning Goals

This project helped me understand:
- Laravel MVC architecture and Eloquent relationships
- Inertia.js for seamless frontend-backend integration
- React with TypeScript in a Laravel context
- Modern CSS with Tailwind and component libraries
- Database migrations and seeders

## Contributing

Since this is a learning project, feel free to:
- Fork the repository
- Try adding new features
- Suggest improvements
- Use it as a reference for your own Laravel + Inertia + React projects
