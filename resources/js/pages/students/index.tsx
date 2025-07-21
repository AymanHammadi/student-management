// Types
import { type BreadcrumbItem, Student, PaginationResponse } from '@/types';

// React & Inerita
import { Head, router } from '@inertiajs/react';
import { usePage, Link } from '@inertiajs/react';

// Hooks
import { useFormSubmission } from '@/hooks/use-form-submission';

// Components
import AppLayout from '@/layouts/app-layout';
import Pagination from '@/components/app-pagination'

// UI
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Icons
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import React, { useRef, useState } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Students',
        href: '/students',
    }
];

type PageProps = {
    students: PaginationResponse<Student>;
    filters: {
        search?: string;
    };
}

export default function StudentsPage() {

    const { students, filters } = usePage<PageProps>().props;
    const { submit } = useFormSubmission();
    const [search, setSearch] = useState(filters.search || "");
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)

        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => {
            router.get(route('students.index'), { search: value }, { preserveState: true })
        }, 300)
    }


    function handleEditStudent(id: number) {
        router.visit(route('students.edit', id));
    }


    function handleDeleteStudent(id: number) {
        if (confirm('Are you sure you want to delete this student?')) {
            submit(route('students.destroy', id), {}, {
                method: 'delete',
                successMessage: 'Student deleted successfully!',
                errorMessage: 'Failed to delete student. Please try again.',
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="container mx-auto px-4 py-8">

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>Students</CardTitle>
                            <Link href='/students/create'>
                                <Button className='w-full sm:w-auto cursor-pointer'>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Student
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>

                    <CardContent>

                        {/* Search  */}
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <Search
                                    className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    value={search}
                                    className="pl-10 w-1/3 focus:w-1/2 transition-all duration-300 ease-in-out"
                                    onChange={handleSearch}
                                    placeholder="Search" />
                            </div>
                        </div>

                        {/* Students Tabel */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Student Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Section</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.data.map(student => (
                                        <TableRow key={student.id}>
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            <TableCell>{student.class?.name || 'N/A'}</TableCell>
                                            <TableCell>{student.section?.name || 'N/A'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button onClick={() => handleEditStudent(student.id)}
                                                            variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDeleteStudent(student.id)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                    ))}

                                </TableBody>
                            </Table>

                            {students.data.length === 0 && (
                                <div className="p-4 text-center">
                                    <div className="mb-2 text-lg text-gray-500">No students found</div>
                                    <div className="text-gray-400">Try adjusting your search or filter criteria</div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Pagination
                            meta={students.meta}
                            preserveScroll={true}
                            preserveState={true}

                        />
                    </CardFooter>

                </Card>
            </div>
        </AppLayout>
    );
}
