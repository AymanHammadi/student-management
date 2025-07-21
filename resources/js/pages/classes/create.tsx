
// React & Inertia
import { Head } from '@inertiajs/react';

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
import { classCreateBreadcrumbs, classFormSchema } from './class-config';

type ClassFormData = z.infer<typeof classFormSchema>;

export default function CreateClassPage() {
    const { processing, submit } = useFormSubmission();

    const form = useForm<ClassFormData>({
        resolver: zodResolver(classFormSchema),
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = (data: ClassFormData) => {
        submit('/classes', data, {
            redirectTo: '/classes',
            successMessage: 'Class created successfully!',
            errorMessage: 'Failed to create class. Please try again.',
        });
    };

    return (
        <AppLayout breadcrumbs={classCreateBreadcrumbs}>
            <Head title="Create Class" />

            <div className="container mx-auto px-4 py-8">
                <ClassFormFields
                    form={form}
                    onSubmit={onSubmit}
                    isSubmitting={processing}
                    title="Create Class"
                    submitButtonText="Create Class"
                />
            </div>
        </AppLayout>
    );
}
