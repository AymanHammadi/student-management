import { z } from 'zod';
import { type BreadcrumbItem, Section } from '@/types';

// Form validation schema
export const sectionFormSchema = z.object({
    name: z
        .string()
        .min(2, "Section name must be at least 2 characters")
        .max(100, "Section name must be less than 100 characters"),
    class_id: z.string().min(1, "Please select a class"),
});

export type SectionFormValues = z.infer<typeof sectionFormSchema>;

// Breadcrumbs configuration
export const createSectionBreadcrumbs: BreadcrumbItem[] = [
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

export const editSectionBreadcrumbs: BreadcrumbItem[] = [
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
    class_id: "",
};

// Helper function to create edit form values from section data
export const createEditFormValues = (section: Section): SectionFormValues => {
    return {
        name: section.name || "",
        class_id: (section.class_id || section.class?.id || "").toString(),
    };
};
