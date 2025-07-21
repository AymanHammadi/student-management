import AppLogo from '@/components/app-logo';
import { type AppPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Users, BookOpen, Github, ExternalLink } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<AppPageProps>().props;

    const features = [
        {
            icon: Users,
            title: 'Student Management',
            description: 'Complete CRUD operations for student records with profile management'
        },
        {
            icon: BookOpen,
            title: 'Class Organization',
            description: 'Organize students into classes and sections with hierarchical structure'
        },

    ];

    return (
        <>
            <Head title="Student Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 dark:from-background dark:via-background dark:to-primary/5">
                {/* Navigation */}
                <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex items-center justify-between">
                            <AppLogo />
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="container mx-auto px-4 py-16">
                    <div className="text-center space-y-6 mb-16">
                        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-muted">
                            <span className="mr-2">🎓</span>
                            Learning Project
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            Student Management
                            <span className="block text-primary">Made Simple</span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            A modern web application built with Laravel, Inertia.js, and React.
                            This project demonstrates full-stack development skills with CRUD operations,
                            authentication, and responsive design.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {!auth.user && (
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                >
                                    Try Demo
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            )}

                            <a
                                href="https://github.com/AymanHammadi/student-management"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                View Source
                            </a>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid gap-8 md:grid-cols-2 mb-16">
                        {features.map((feature, index) => (
                            <div key={index} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                                <feature.icon className="h-12 w-12 text-primary mb-4" />
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="text-center space-y-6">
                        <h2 className="text-2xl font-semibold">Built With Modern Technologies</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['Laravel 11', 'React 18', 'TypeScript', 'Inertia.js', 'Tailwind CSS', 'shadcn/ui'].map((tech) => (
                                <span key={tech} className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t bg-muted/50">
                    <div className="container mx-auto px-4 py-8">
                        <div className="text-center text-sm text-muted-foreground">
                            <p>Created as a learning project to explore Laravel + Inertia.js + React integration</p>
                            <p className="mt-2">
                                By{' '}
                                <a
                                    href="https://github.com/AymanHammadi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Ayman Hammadi
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
