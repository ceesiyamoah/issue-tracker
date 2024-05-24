'use client';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: {
	label: string;
	value: Status | 'all';
}[] = [
	{ label: 'All', value: 'all' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'Closed', value: 'CLOSED' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleStatusChange = (value: string) => {
		const params = new URLSearchParams();
		searchParams.forEach((val, key) => {
			params.set(key, val);
		});
		if (value !== 'all') {
			params.set('status', value);
		} else {
			params.delete('status');
		}
		const query = params.size > 0 ? `?${params.toString()}` : '';

		router.push('/issues' + query);
	};
	return (
		<Select.Root onValueChange={handleStatusChange} defaultValue={searchParams.get('status') || 'all'}>
			<Select.Trigger placeholder='Filter by status' />
			<Select.Content>
				{statuses.map((status) => (
					<Select.Item key={status.label} value={status.value}>
						{status.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssueStatusFilter;
