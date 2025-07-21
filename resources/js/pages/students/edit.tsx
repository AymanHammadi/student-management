// Types
import { type Class, Student } from '@/types';

// React & Inertia
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

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
    editStudentBreadcrumbs,
    createEditFormValues,
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
    student: Student;
}

export default function EditStudentPage() {
    const { classes, errors, student } = usePage<PageProps>().props;
    const { processing, recentlySuccessful, submit } = useFormSubmission();

    // Initialize form with Zod validation and safe defaults
    const form = useForm<StudentFormValues>({
        resolver: zodResolver(studentFormSchema),
        defaultValues: student ? createEditFormValues(student) : {
            name: "",
            email: "",
            class_id: "",
            section_id: "",
        },
    });

    const selectedClassId = form.watch("class_id");
    const { sections } = useSections(selectedClassId);

    // Add safety check for student data
    if (!student) {
        return (
            <AppLayout breadcrumbs={editStudentBreadcrumbs}>
                <Head title="Edit Student" />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <p>Student data not found. Please try again.</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

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
        submit(route('students.update', student.id), values, {
            method: 'put',
            redirectTo: route('students.index'),
            successMessage: 'Student updated successfully!',
            errorMessage: 'Failed to update student. Please try again.',
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
        <AppLayout breadcrumbs={editStudentBreadcrumbs}>
            <Head title="Edit Student" />
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
                            <CardTitle>Edit Student</CardTitle>
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
                                            Update Student
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleCancel}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-green-600">Student updated successfully!</p>
                                        </Transition>
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
