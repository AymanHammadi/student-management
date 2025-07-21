// Types
import { UseFormReturn } from 'react-hook-form';

// UI
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Icons
import { Save } from 'lucide-react';

type ClassFormData = {
    name: string;
};

type ClassFormFieldsProps = {
    form: UseFormReturn<ClassFormData>;
    onSubmit: (data: ClassFormData) => void;
    isSubmitting: boolean;
    title: string;
    submitButtonText: string;
};

export default function ClassFormFields({
    form,
    onSubmit,
    isSubmitting,
    title,
    submitButtonText
}: ClassFormFieldsProps) {
    return (
        <Card className="mx-auto max-w-2xl">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Class Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Class Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter class name (e.g., Grade 10, Class A)"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="min-w-[120px]"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                                        Saving...
                                    </div>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        {submitButtonText}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
