'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { issuesSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

type IssueFormData = z.infer<typeof issuesSchema>;

interface Props {
	issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(issuesSchema),
	});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const createIssue: SubmitHandler<IssueFormData> = async (input) => {
		try {
			setIsLoading(true);
			if (issue) {
				await axios.patch(`/api/issues/${issue.id}`, input);
			} else {
				await axios.post('/api/issues', input);
			}
			router.push('/issues');
			router.refresh();
		} catch (error) {
			setError('An unexpected error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='max-w-xl space-y-3'>
			{error && (
				<Callout.Root color='red'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className='space-y-3' onSubmit={handleSubmit(createIssue)}>
				<TextField.Root placeholder='Title' {...register('title')} defaultValue={issue?.title} />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name='description'
					control={control}
					defaultValue={issue?.description}
					render={({ field }) => <SimpleMDE {...field} className='prose' />}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button disabled={isLoading} className='cursor-pointer' type='submit'>
					{issue ? 'Update Issue' : 'Submit New Issue'}
					{isLoading && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
