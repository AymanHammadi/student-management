// React & Inertia
import { Head, usePage } from '@inertiajs/react';

// React Hook Form & Zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Components
import AppLayout from '@/layouts/app-layout';
import ClassFormFields from '@/components/classes/class-form-fields';

// Hooks
import { useFormSubmission } from '@/hooks/use-form-submission';

// Config
import { classEditBreadcrumbs, classSchema, createEditFormValues } from '@/config/class-config';

// Types
import { ClassData } from '@/types';

type ClassFormData = z.infer<typeof classSchema>;

type PageProps = {
    class: ClassData;
}

export default function EditClassPage() {
    const { class: classData } = usePage<PageProps>().props;
    const { processing, submit } = useFormSubmission();

    const form = useForm<ClassFormData>({
        resolver: zodResolver(classSchema),
        defaultValues: createEditFormValues(classData),
    });

    const onSubmit = (data: ClassFormData) => {
        submit(`/classes/${classData.id}`, data, {
            method: 'put',
            redirectTo: '/classes',
            successMessage: 'Class updated successfully!',
            errorMessage: 'Failed to update class. Please try again.',
        });
    };

    return (
        <AppLayout breadcrumbs={classEditBreadcrumbs}>
            <Head title={`Edit Class: ${classData.name}`} />

            <div className="container mx-auto px-4 py-8">
                <ClassFormFields
                    form={form}
                    onSubmit={onSubmit}
                    isSubmitting={processing}
                    title={`Edit Class: ${classData.name}`}
                    submitButtonText="Update Class"
                />
            </div>
        </AppLayout>
    );
}
