import { z } from 'zod';

export const issuesSchema = z.object({
	title: z.string().max(255).min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required').max(65535),
});
export const patchIssueSchema = z.object({
	title: z.string().max(255).min(1, 'Title is required').optional(),
	description: z.string().min(1, 'Description is required').max(65535).optional(),
	assignedToUserId: z.string().min(1, 'AssignedToUserId is required').max(255).optional().nullable(),
});
