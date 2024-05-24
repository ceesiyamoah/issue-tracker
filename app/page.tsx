import Pagination from './components/Pagination';

interface Props {
	searchParams: { page: string };
}

export default function Home({ searchParams: { page } }: Props) {
	return <Pagination currentPage={+page || 1} itemCount={101} pageSize={12} />;
}
