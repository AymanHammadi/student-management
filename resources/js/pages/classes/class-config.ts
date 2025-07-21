import { z } from 'zod';
import { type BreadcrumbItem, ClassData } from '@/types';

// Form validation schema
export const classFormSchema = z.object({
    name: z
        .string()
        .min(2, "Class name must be at least 2 characters")
        .max(100, "Class name must be less than 100 characters"),
});

export type ClassFormValues = z.infer<typeof classFormSchema>;

// Breadcrumbs configuration
export const classCreateBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Classes',
        href: '/classes',
    },
    {
        title: 'Create Class',
        href: '/classes/create',
    },
];

export const editClassBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Classes',
        href: '/classes',
    },
    {
        title: 'Edit Class',
        href: '#',
    },
];

// Form default values
export const defaultCreateFormValues: ClassFormValues = {
    name: "",
};

// Helper function to create edit form values from class data
export const createEditFormValues = (classData: ClassData): ClassFormValues => {
    return {
        name: classData.name || "",
    };
};
