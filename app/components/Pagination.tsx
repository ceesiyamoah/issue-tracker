'use client';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
	itemCount: number;
	pageSize: number;
	currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
	const pageCount = Math.ceil(itemCount / pageSize);
	const router = useRouter();
	const searchParams = useSearchParams();

	const changePage = (page: number) => {
		const params = new URLSearchParams();
		searchParams.forEach((val, key) => {
			params.set(key, val);
		});
		params.set('page', page.toString());
		router.push('?' + params.toString());
	};

	if (pageCount <= 1) return null;

	return (
		<Flex align='center' gap='2'>
			<Text size='2'>
				{currentPage} of {pageCount}{' '}
			</Text>
			<Button variant='soft' color='gray' disabled={currentPage === 1} onClick={() => changePage(1)}>
				<DoubleArrowLeftIcon />
			</Button>
			<Button variant='soft' color='gray' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
				<ChevronLeftIcon />
			</Button>
			<Button
				variant='soft'
				color='gray'
				disabled={currentPage === pageCount}
				onClick={() => changePage(currentPage + 1)}
			>
				<ChevronRightIcon />
			</Button>
			<Button variant='soft' color='gray' disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
				<DoubleArrowRightIcon />
			</Button>
		</Flex>
	);
};

export default Pagination;
