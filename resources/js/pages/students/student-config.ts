import { z } from 'zod';
import { type BreadcrumbItem, Student } from '@/types';

// Form validation schema
export const studentFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be less than 100 characters"),
    email: z.email("Please enter a valid email address"),
    class_id: z.string().min(1, "Please select a class"),
    section_id: z.string().min(1, "Please select a section"),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;

// Breadcrumbs configuration
export const createStudentBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Create Student',
        href: '/students/create',
    },
];

export const editStudentBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Edit Student',
        href: '#',
    },
];

// Form default values
export const defaultCreateFormValues: StudentFormValues = {
    name: "",
    email: "",
    class_id: "",
    section_id: "",
};

// Helper function to create edit form values from student data
export const createEditFormValues = (student: Student): StudentFormValues => {
    return {
        name: student.name ,
        email: student.email ,
        class_id: student.class_id.toString(),
        section_id: student.section_id.toString(),
    };
};
