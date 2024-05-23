'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

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
	return (
		<Select.Root>
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
