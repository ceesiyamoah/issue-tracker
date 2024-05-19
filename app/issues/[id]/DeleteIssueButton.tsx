'use client';
import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleDelete = async () => {
		try {
			setIsLoading(true);
			await axios.delete(`/api/issues/${issueId}`);
			router.push('/issues');
			router.refresh();
		} catch (error) {
			setError(true);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color='red' disabled={isLoading}>
						Delete Issue
						{isLoading && <Spinner />}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Confirm Delete</AlertDialog.Title>
					<AlertDialog.Description>
						Are you sure you want to delete? This action cannot be undone
					</AlertDialog.Description>
					<Flex gap='3' mt='4' justify='end'>
						<AlertDialog.Cancel>
							<Button variant='soft' color='gray'>
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button variant='solid' color='red' onClick={handleDelete}>
								Delete
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
					<Button variant='soft' color='gray' className='ml-auto block mt-2' mt='2' onClick={() => setError(false)}>
						Cancel
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;
