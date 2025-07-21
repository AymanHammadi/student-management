import { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';

interface BaseFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    error?: string;
}

interface TextFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
    type?: 'text' | 'email';
    placeholder?: string;
    autoFocus?: boolean;
}

interface SelectFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
    placeholder?: string;
    disabled?: boolean;
    options: Array<{ value: string; label: string }>;
    onValueChange?: (value: string) => void;
}

export function TextField<T extends FieldValues>({
    control,
    name,
    label,
    type = 'text',
    placeholder,
    autoFocus = false,
    error,
}: TextFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            className="mt-1 block w-full"
                            placeholder={placeholder}
                            autoFocus={autoFocus}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    {error && (
                        <InputError className="mt-2" message={error} />
                    )}
                </FormItem>
            )}
        />
    );
}

export function SelectField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    disabled = false,
    options,
    onValueChange,
    error,
}: SelectFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={onValueChange || field.onChange}
                        defaultValue={field.value}
                        disabled={disabled}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    {error && (
                        <InputError className="mt-2" message={error} />
                    )}
                </FormItem>
            )}
        />
    );
}
