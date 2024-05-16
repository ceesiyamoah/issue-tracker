'use client';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const { register, control, handleSubmit } = useForm<IssueForm>();
	const router = useRouter();

	const createIssue: SubmitHandler<IssueForm> = async (input) => {
		try {
			await axios.post('/api/issues', input);
			router.push('/issues');
		} catch (error) {}
	};

	return (
		<form className='max-w-xl space-y-3' onSubmit={handleSubmit(createIssue)}>
			<TextField.Root placeholder='Title' {...register('title')} />
			<Controller name='description' control={control} render={({ field }) => <SimpleMDE {...field} />} />
			<Button>Submit New Issue</Button>
		</form>
	);
};

export default NewIssuePage;
