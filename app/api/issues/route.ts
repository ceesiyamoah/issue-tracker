import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createIssueSchema = z.object({
	title: z.string().max(255).min(1),
	description: z.string().min(1),
});
export async function POST(request: NextRequest) {
	const body = await request.json();
	const { success, data, error } = createIssueSchema.safeParse(body);
	if (!success) {
		return NextResponse.json({ error: error.errors }, { status: 400 });
	}

	const newIssue = await prisma.issue.create({
		data,
	});

	return NextResponse.json(newIssue);
}
