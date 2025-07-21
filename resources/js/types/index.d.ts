import type { LucideIcon } from 'lucide-vue-next';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export type AppPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
};

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Class {
        id: number;
        name: string;
   }

export interface ClassData {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface Section {
    id: number;
    name: string;
    class_id: number;
    class?: ClassData;
    created_at?: string;
    updated_at?: string;
}

export interface SectionData {
    id: number;
    name: string;
    class_id: number;
    class?: ClassData;
    created_at?: string;
    updated_at?: string;
}

export interface Student {
    id: number;
    name: string;
    email: string;
    class_id: number;
    section_id: number;
    class?: ClassData;
    section?: SectionData;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}


interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

export interface PaginationResponse<T> {
    data: T[];
    meta: PaginationMeta;
}


export type BreadcrumbItemType = BreadcrumbItem;
