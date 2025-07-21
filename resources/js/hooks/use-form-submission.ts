/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';


export type FormSubmissionState = {
    processing: boolean;
    recentlySuccessful: boolean;
};

export function useFormSubmission() {
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (route: string, data: any, options?: {
        onSuccess?: () => void;
        onError?: () => void;
        redirectTo?: string;
        redirectDelay?: number;
        method?: 'post' | 'put' | 'patch' | 'delete';
        successMessage?: string;
        errorMessage?: string;
    }) => {
        const method = options?.method || 'post';

        router[method](route, data, {
            onBefore: () => {
                setProcessing(true);
                setRecentlySuccessful(false);
            },
            onSuccess: () => {
                setRecentlySuccessful(true);
                setProcessing(false);

                // Show success toast immediately
                if (options?.successMessage) {
                    console.log('Showing success toast:', options.successMessage);
                    toast.success(options.successMessage);
                }

                options?.onSuccess?.();

                // Handle redirect manually if specified
                if (options?.redirectTo) {
                    setTimeout(() => {
                        router.visit(options.redirectTo!);
                    }, options.redirectDelay || 2000);
                }
            },
            onError: (errors) => {
                setProcessing(false);
                console.log('Form submission errors:', errors);

                // Show error toast
                if (options?.errorMessage) {
                    console.log('Showing error toast:', options.errorMessage);
                    toast.error(options.errorMessage);
                } else {
                    console.log('Showing default error toast');
                    toast.error('An error occurred. Please try again.');
                }

                options?.onError?.();
                console.error('Form submission failed');
            },
            preserveScroll: false,
            replace: false,
        });
    };

    return {
        processing,
        recentlySuccessful,
        submit,
    };
}
