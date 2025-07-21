// Types
import { UseFormReturn } from 'react-hook-form';
import { ClassData } from '@/types';

// UI
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Icons
import { Save } from 'lucide-react';

type SectionFormData = {
    name: string;
    class_id: number;
};

type SectionFormFieldsProps = {
    form: UseFormReturn<SectionFormData>;
    onSubmit: (data: SectionFormData) => void;
    isSubmitting: boolean;
    title: string;
    submitButtonText: string;
    classes?: ClassData[];
};

export default function SectionFormFields({
    form,
    onSubmit,
    isSubmitting,
    title,
    submitButtonText,
    classes = []
}: SectionFormFieldsProps) {
    return (
        <Card className="mx-auto max-w-2xl">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Section Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Section Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter section name (e.g., Section A, Morning Batch)"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Class Selection */}
                        <FormField
                            control={form.control}
                            name="class_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Class *</FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                        value={field.value?.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a class" />
                                            </SelectTrigger>
                                        </FormControl>
                                                                <SelectContent>
                                            {classes && classes.length > 0 ? (
                                                classes.map((cls) => (
                                                    <SelectItem key={cls.id} value={cls.id.toString()}>
                                                        {cls.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="" disabled>
                                                    No classes available
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
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
