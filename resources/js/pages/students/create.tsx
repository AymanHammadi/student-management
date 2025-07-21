// Types
import { type Class } from '@/types';

// React & Inertia
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

// Zod & React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Components
import AppLayout from '@/layouts/app-layout';
import { TextField, SelectField } from '@/components/form-fields';

// UI
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";


// Icons
import { ArrowLeft, Save } from 'lucide-react';

// Configuration and Hooks
import {
    studentFormSchema,
    type StudentFormValues,
    createStudentBreadcrumbs,
    defaultCreateFormValues
} from './student-config';
import { useSections } from '@/hooks/use-sections';
import { useFormSubmission } from '@/hooks/use-form-submission';

// Page props type
type PageProps = {
    classes: Class[];
    errors?: {
        name?: string;
        email?: string;
        class_id?: string;
        section_id?: string;
    };
}

export default function CreateStudentPage() {
    const { classes, errors } = usePage<PageProps>().props;
    const { processing, submit } = useFormSubmission();

    // Initialize form with Zod validation
    const form = useForm<StudentFormValues>({
        resolver: zodResolver(studentFormSchema),
        defaultValues: defaultCreateFormValues,
    });

    const selectedClassId = form.watch("class_id");
    const { sections } = useSections(selectedClassId);

    // Handle cancel action
    const handleCancel = () => {
        window.history.back();
    };

    // Reset section when class changes
    const handleClassChange = (value: string) => {
        form.setValue("class_id", value);
        form.setValue("section_id", "");
    };

    // Form submission
    const onSubmit = (values: StudentFormValues) => {
        submit(route('students.store'), values, {
            successMessage: 'Student created successfully!',
            errorMessage: 'Failed to create student. Please try again.',
        });
    };

    // Prepare options for selects
    const classOptions = classes?.map((classItem) => ({
        value: classItem.id.toString(),
        label: classItem.name,
    })) || [];


    const sectionOptions = sections.map((section) => ({
        value: section.id.toString(),
        label: section.name,
    }));

    return (
        <AppLayout breadcrumbs={createStudentBreadcrumbs}>
            <Head title="Create Student" />
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleCancel}
                                className="h-8 w-8"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <CardTitle>Create New Student</CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="space-y-6">

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <TextField
                                        control={form.control}
                                        name="name"
                                        label="Student Name"
                                        placeholder="Enter student name"
                                        autoFocus
                                        error={errors?.name}
                                    />

                                    <TextField
                                        control={form.control}
                                        name="email"
                                        label="Email Address"
                                        type="email"
                                        placeholder="Enter email address"
                                        error={errors?.email}
                                    />

                                    <SelectField
                                        control={form.control}
                                        name="class_id"
                                        label="Class"
                                        placeholder="Select a class"
                                        options={classOptions}
                                        onValueChange={handleClassChange}
                                        error={errors?.class_id}
                                    />

                                    <SelectField
                                        control={form.control}
                                        name="section_id"
                                        label="Section"
                                        placeholder="Select a section"
                                        options={sectionOptions}
                                        disabled={!selectedClassId}
                                        error={errors?.section_id}
                                    />

                                    {/* Form Actions */}
                                    <div className="flex items-center gap-4 pt-4">
                                        <Button type="submit" disabled={processing} className="flex-1">
                                            <Save className="h-4 w-4 mr-2" />
                                            Create Student
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleCancel}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
