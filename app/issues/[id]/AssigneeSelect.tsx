'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skeleton } from '@/app/components';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const { data: users, error, isLoading } = useUsers();

	const handleChange = (userId: string) => {
		axios
			.patch<Issue>(`/api/issues/${issue.id}`, {
				assignedToUserId: userId === 'unassigned' ? null : userId,
			})
			.catch(() => {
				toast.error('Changes could not be saved');
			});
	};

	if (isLoading) return <Skeleton />;
	if (error) return null;

	return (
		<>
			<Select.Root onValueChange={handleChange} defaultValue={issue.assignedToUserId || 'unassigned'}>
				<Select.Trigger placeholder='Assign' />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value='unassigned'>Unassigned</Select.Item>
						{users?.map((user) => (
							<Select.Item key={user.id} value={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	);
};

const useUsers = () =>
	useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => axios.get('/api/users').then((res) => res.data),
		staleTime: 60 * 1000,
		retry: 3,
	});

export default AssigneeSelect;
