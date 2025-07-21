import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Users,
    BookOpen,
    School,
    TrendingUp,
    Calendar,
    UserPlus,
    BarChart3,
    PieChart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardStats {
    totalStudents: number;
    totalClasses: number;
    totalSections: number;
}

interface Student {
    id: number;
    name: string;
    email: string;
    created_at: string;
    class: {
        id: number;
        name: string;
    };
    section: {
        id: number;
        name: string;
    };
}

interface ClassDistribution {
    name: string;
    students_count: number;
}

interface SectionDistribution {
    class_name: string;
    sections: {
        name: string;
        students_count: number;
    }[];
}

interface DashboardProps {
    stats: DashboardStats;
    recentStudents: Student[];
    classDistribution: ClassDistribution[];
    sectionDistribution: SectionDistribution[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentStudents, classDistribution, sectionDistribution }: DashboardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Header with Theme Switcher */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome to your student management dashboard</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Total Students Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalStudents}</div>
                            <p className="text-xs text-muted-foreground">
                                <TrendingUp className="inline h-3 w-3 mr-1" />
                                Active students in the system
                            </p>
                        </CardContent>
                    </Card>

                    {/* Total Classes Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalClasses}</div>
                            <p className="text-xs text-muted-foreground">
                                <School className="inline h-3 w-3 mr-1" />
                                Available classes
                            </p>
                        </CardContent>
                    </Card>

                    {/* Total Sections Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Sections</CardTitle>
                            <School className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalSections}</div>
                            <p className="text-xs text-muted-foreground">
                                <BarChart3 className="inline h-3 w-3 mr-1" />
                                Sections across all classes
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Students */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserPlus className="h-5 w-5" />
                                Recent Students
                            </CardTitle>
                            <CardDescription>
                                Latest 5 students added to the system
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentStudents.length > 0 ? (
                                    recentStudents.map((student) => (
                                        <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{student.name}</span>
                                                <span className="text-sm text-muted-foreground">{student.email}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {student.class.name} - {student.section.name}
                                                </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground flex items-center">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {formatDate(student.created_at)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-muted-foreground py-4">
                                        No students found
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Class Distribution */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChart className="h-5 w-5" />
                                Students by Class
                            </CardTitle>
                            <CardDescription>
                                Distribution of students across classes
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {classDistribution.length > 0 ? (
                                    classDistribution.map((classData, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                                            <span className="font-medium">{classData.name}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="bg-primary/20 px-2 py-1 rounded text-sm">
                                                    {classData.students_count} students
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-muted-foreground py-4">
                                        No classes found
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Section Distribution
                        </CardTitle>
                        <CardDescription>
                            Students distribution across sections in each class
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {sectionDistribution.length > 0 ? (
                                sectionDistribution.map((classData, index) => (
                                    <div key={index} className="space-y-2">
                                        <h4 className="font-semibold text-lg flex items-center gap-2">
                                            <BookOpen className="h-4 w-4" />
                                            {classData.class_name}
                                        </h4>
                                        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                                            {classData.sections.map((section, sectionIndex) => (
                                                <div key={sectionIndex} className="flex items-center justify-between p-2 border rounded">
                                                    <span className="text-sm font-medium">{section.name}</span>
                                                    <span className="bg-secondary px-2 py-1 rounded text-xs">
                                                        {section.students_count} students
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        {classData.sections.length === 0 && (
                                            <div className="text-center text-muted-foreground py-2 text-sm">
                                                No sections found for this class
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted-foreground py-4">
                                    No data available
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
