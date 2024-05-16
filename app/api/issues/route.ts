import { createIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { success, data, error } = createIssueSchema.safeParse(body);
	if (!success) {
		return NextResponse.json({ error: error.format() }, { status: 400 });
	}

	const newIssue = await prisma.issue.create({
		data,
	});

	return NextResponse.json(newIssue);
}
