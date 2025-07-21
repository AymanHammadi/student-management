// React & Inertia
import { Head, usePage } from '@inertiajs/react';

// React Hook Form & Zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Components
import AppLayout from '@/layouts/app-layout';
import SectionFormFields from '@/components/sections/section-form-fields';

// Hooks
import { useFormSubmission } from '@/hooks/use-form-submission';

// Config
import { sectionCreateBreadcrumbs, sectionSchema } from '@/config/section-config';

// Types
import { ClassData } from '@/types';

type SectionFormData = z.infer<typeof sectionSchema>;

type PageProps = {
    classes: ClassData[];
}

export default function CreateSectionPage() {
    const { classes } = usePage<PageProps>().props;
    const { processing, submit } = useFormSubmission();

    const form = useForm<SectionFormData>({
        resolver: zodResolver(sectionSchema),
        defaultValues: {
            name: '',
            class_id: 0,
        },
    });

    const onSubmit = (data: SectionFormData) => {
        submit('/sections', data, {
            redirectTo: '/sections',
            successMessage: 'Section created successfully!',
            errorMessage: 'Failed to create section. Please try again.',
        });
    };

    return (
        <AppLayout breadcrumbs={sectionCreateBreadcrumbs}>
            <Head title="Create Section" />

            <div className="container mx-auto px-4 py-8">
                <SectionFormFields
                    form={form}
                    onSubmit={onSubmit}
                    isSubmitting={processing}
                    title="Create Section"
                    submitButtonText="Create Section"
                    classes={classes}
                />
            </div>
        </AppLayout>
    );
}
