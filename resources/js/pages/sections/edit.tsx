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
import { sectionEditBreadcrumbs, sectionSchema, createEditFormValues } from '@/config/section-config';

// Types
import { SectionData, ClassData } from '@/types';

type SectionFormData = z.infer<typeof sectionSchema>;

type PageProps = {
    section: SectionData;
    classes: ClassData[];
}

export default function EditSectionPage() {
    const { section: sectionData, classes } = usePage<PageProps>().props;
    const { processing, submit } = useFormSubmission();

    const form = useForm<SectionFormData>({
        resolver: zodResolver(sectionSchema),
        defaultValues: createEditFormValues(sectionData),
    });

    const onSubmit = (data: SectionFormData) => {
        submit(`/sections/${sectionData.id}`, data, {
            method: 'put',
            redirectTo: '/sections',
            successMessage: 'Section updated successfully!',
            errorMessage: 'Failed to update section. Please try again.',
        });
    };

    return (
        <AppLayout breadcrumbs={sectionEditBreadcrumbs}>
            <Head title={`Edit Section: ${sectionData.name}`} />

            <div className="container mx-auto px-4 py-8">
                <SectionFormFields
                    form={form}
                    onSubmit={onSubmit}
                    isSubmitting={processing}
                    title={`Edit Section: ${sectionData.name}`}
                    submitButtonText="Update Section"
                    classes={classes}
                />
            </div>
        </AppLayout>
    );
}
