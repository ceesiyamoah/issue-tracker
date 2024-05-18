'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter();
	const handleDelete = async () => {
		await axios.delete(`/api/issues/${issueId}`);
		router.push('/issues');
		router.refresh();
	};
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color='red'>Delete Issue</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Title>Confirm Delete</AlertDialog.Title>
				<AlertDialog.Description>Are you sure you want to delete? This action cannot be undone</AlertDialog.Description>
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
	);
};

export default DeleteIssueButton;
