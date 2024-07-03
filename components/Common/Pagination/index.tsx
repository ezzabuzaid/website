import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import { useGetPageElements } from '@/components/Common/Pagination/useGetPageElements';

import styles from './index.module.css';

type Page = { url: string };

type PaginationProps = {
  // One-based number of the current page
  currentPage: number;
  pages: Array<Page>;
  // The number of page buttons on each side of the current page button
  // @default 1
  currentPageSiblingsCount?: number;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pages,
  currentPageSiblingsCount = 1,
}) => {
  const parsedPages = useGetPageElements(
    currentPage,
    pages,
    currentPageSiblingsCount
  );

  return (
    <nav aria-label={'Pagination'} className={styles.pagination}>
      <Button
        aria-label={'Previous page'}
        disabled={currentPage === 1}
        kind="secondary"
        className={styles.previousButton}
        href={pages[currentPage - 2]?.url}
      >
        <ArrowLeftIcon className={styles.arrowIcon} />
        <span>Previous</span>
      </Button>

      <ol className={styles.list}>{parsedPages}</ol>

      <Button
        aria-label={'Next page'}
        disabled={currentPage === pages.length}
        kind="secondary"
        className={styles.nextButton}
        href={pages[currentPage]?.url}
      >
        <span>Next</span>
        <ArrowRightIcon className={styles.arrowIcon} />
      </Button>
    </nav>
  );
};

export default Pagination;
