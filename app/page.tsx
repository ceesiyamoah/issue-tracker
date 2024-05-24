import Pagination from './components/Pagination';

export default function Home() {
	return <Pagination currentPage={3} itemCount={101} pageSize={12} />;
}
