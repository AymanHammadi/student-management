import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function ToastTest() {
    const testSuccess = () => {
        toast.success('Test success message!');
    };

    const testError = () => {
        toast.error('Test error message!');
    };

    const testWarning = () => {
        toast.warning('Test warning message!');
    };

    const testInfo = () => {
        toast.info('Test info message!');
    };

    return (
        <div className="flex gap-2 p-4 border rounded-lg mb-4">
            <div className="text-sm font-medium mr-4">Toast Tests:</div>
            <Button onClick={testSuccess} variant="default" size="sm">
                Success
            </Button>
            <Button onClick={testError} variant="destructive" size="sm">
                Error
            </Button>
            <Button onClick={testWarning} variant="outline" size="sm">
                Warning
            </Button>
            <Button onClick={testInfo} variant="secondary" size="sm">
                Info
            </Button>
        </div>
    );
}
