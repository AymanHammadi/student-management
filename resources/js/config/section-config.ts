import { z } from 'zod';
import { type BreadcrumbItem, SectionData } from '@/types';

// Form validation schema
export const sectionSchema = z.object({
    name: z
        .string()
        .min(2, "Section name must be at least 2 characters")
        .max(100, "Section name must be less than 100 characters"),
    class_id: z
        .number()
        .min(1, "Please select a class")
});

export type SectionFormValues = z.infer<typeof sectionSchema>;

// Breadcrumbs configuration
export const sectionCreateBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Sections',
        href: '/sections',
    },
    {
        title: 'Create Section',
        href: '/sections/create',
    },
];

export const sectionEditBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Sections',
        href: '/sections',
    },
    {
        title: 'Edit Section',
        href: '#',
    },
];

// Form default values
export const defaultCreateFormValues: SectionFormValues = {
    name: "",
    class_id: 0,
};

// Helper function to create edit form values from section data
export const createEditFormValues = (sectionData: SectionData): SectionFormValues => {
    return {
        name: sectionData.name || "",
        class_id: sectionData.class_id || 0,
    };
};
