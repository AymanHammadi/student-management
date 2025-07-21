import { useState, useEffect } from 'react';
import axios from 'axios';
import { Section } from '@/types';

export function useSections(classId: string) {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!classId) {
            setSections([]);
            return;
        }

        const fetchSections = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get<{ data: Section[] }>(`/api/sections?class_id=${classId}`);
                setSections(response.data.data);
            } catch (err) {
                console.error("Failed to fetch sections:", err);
                setError("Failed to load sections");
            } finally {
                setLoading(false);
            }
        };

        fetchSections();
    }, [classId]);

    return { sections, loading, error };
}
