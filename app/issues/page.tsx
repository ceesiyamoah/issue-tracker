import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import Pagination from '../components/Pagination';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

interface Props {
	searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
	const checkedStatus = Object.values(Status).includes(searchParams.status) ? searchParams.status : undefined;
	const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined;
	const where = {
		status: checkedStatus,
	};

	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});
	const issueCount = await prisma.issue.count({ where });

	return (
		<Flex direction='column' gap='3'>
			<IssueActions />
			<IssueTable issues={issues} searchParams={searchParams} />
			<Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
		</Flex>
	);
};

export const dynamic = 'force-dynamic';
// export const revalidate=0;

export default IssuesPage;

export const metadata: Metadata = {
	title: 'Issue Tracker - Issue List',
	description: 'View all project issues',
};
