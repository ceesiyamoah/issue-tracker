import { z } from 'zod';

export const issuesSchema = z.object({
	title: z.string().max(255).min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
});
