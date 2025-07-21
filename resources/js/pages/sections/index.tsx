// Types
import { type BreadcrumbItem, SectionData, PaginationResponse } from '@/types';

// React & Inertia
import { Head, router } from '@inertiajs/react';
import { usePage, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

// Hooks
import { useFormSubmission } from '@/hooks/use-form-submission';

// Components
import AppLayout from '@/layouts/app-layout';
import Pagination from '@/components/app-pagination';

// UI
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Sections',
        href: '/sections',
    }
];

type PageProps = {
    sections: PaginationResponse<SectionData>;
    filters: {
        search?: string;
    };
}

export default function SectionsPage() {
    const { sections, filters } = usePage<PageProps>().props;
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
            router.get(route('sections.index'), { search: value }, { preserveState: true })
        }, 300)
    }

    function handleEditSection(id: number) {
        router.visit(route('sections.edit', id));
    }

    function handleDeleteSection(id: number) {
        if (confirm('Are you sure you want to delete this section?')) {
            submit(route('sections.destroy', id), {}, {
                method: 'delete',
                successMessage: 'Section deleted successfully!',
                errorMessage: 'Failed to delete section. Please try again.',
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sections" />
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>Sections</CardTitle>
                            <Link href="/sections/create">
                                <Button className='w-full sm:w-auto cursor-pointer'>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Section
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* Search */}
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    value={search}
                                    className="pl-10 w-1/3 focus:w-1/2 transition-all duration-300 ease-in-out"
                                    onChange={handleSearch}
                                    placeholder="Search sections..." />
                            </div>
                        </div>

                        {/* Sections Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Section Name</TableHead>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sections.data.map(section => (
                                        <TableRow key={section.id}>
                                            <TableCell>{section.id}</TableCell>
                                            <TableCell className="font-medium">{section.name}</TableCell>
                                            <TableCell>{section.class?.name || 'N/A'}</TableCell>
                                            <TableCell>{section.created_at ? new Date(section.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button onClick={() => handleEditSection(section.id)}
                                                            variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDeleteSection(section.id)}
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

                            {sections.data.length === 0 && (
                                <div className="p-4 text-center">
                                    <div className="mb-2 text-lg text-gray-500">No sections found</div>
                                    <div className="text-gray-400">Try adjusting your search or filter criteria</div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Pagination
                            meta={sections.meta}
                            preserveScroll={true}
                            preserveState={true}
                        />
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
