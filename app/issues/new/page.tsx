'use client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const { register, control, handleSubmit } = useForm<IssueForm>();
	const [error, setError] = useState('');
	const router = useRouter();

	const createIssue: SubmitHandler<IssueForm> = async (input) => {
		try {
			await axios.post('/api/issues', input);
			router.push('/issues');
		} catch (error) {
			setError('An unexpected error occurred');
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
				<Controller name='description' control={control} render={({ field }) => <SimpleMDE {...field} />} />
				<Button>Submit New Issue</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
