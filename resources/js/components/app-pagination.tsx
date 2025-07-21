import type { PaginationMeta } from '@/types'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationProps = {
    meta: PaginationMeta;
    preserveScroll?: boolean;
    preserveState?: boolean;

}
export default function AppPagination({
                                          meta,
                                          preserveScroll = false,
                                          preserveState = true
                                      }: PaginationProps) {
    // Find previous and next URLs from the links array
    const previousLink = meta.links.find(link => link.label.includes('Previous') || link.label.includes('&laquo;'));
    const nextLink = meta.links.find(link => link.label.includes('Next') || link.label.includes('&raquo;'));

    // Filter out Previous/Next links to get only page numbers and ellipsis
    const pageLinks = meta.links.filter(link =>
        !link.label.includes('Previous') &&
        !link.label.includes('Next') &&
        !link.label.includes('&laquo;') &&
        !link.label.includes('&raquo;')
    );

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={previousLink?.url || '#'}
                        className={!previousLink?.url ? 'pointer-events-none opacity-50' : ''}
                        preserveScroll={preserveScroll}
                        preserveState={preserveState}
                    />
                </PaginationItem>

                {pageLinks.map((link, idx) => (
                    <PaginationItem key={idx}>
                        {link.url ? (
                            <PaginationLink
                                href={link.url}
                                isActive={link.active}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                preserveScroll={preserveScroll}
                                preserveState={preserveState}
                            />
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href={nextLink?.url || '#'}
                        className={!nextLink?.url ? 'pointer-events-none opacity-50' : ''}
                        preserveScroll={preserveScroll}
                        preserveState={preserveState}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
