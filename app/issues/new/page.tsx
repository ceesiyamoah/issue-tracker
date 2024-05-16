'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const createIssue: SubmitHandler<IssueForm> = async (input) => {
		try {
			setIsLoading(true);
			await axios.post('/api/issues', input);
			router.push('/issues');
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
				<TextField.Root placeholder='Title' {...register('title')} />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller name='description' control={control} render={({ field }) => <SimpleMDE {...field} />} />
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button disabled={isLoading} className='cursor-pointer' type='submit'>
					Submit New Issue
					{isLoading && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
