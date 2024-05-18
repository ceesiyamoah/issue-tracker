import { issuesSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface WithParams {
	params: {
		id: string;
	};
}

export async function PATCH(req: NextRequest, { params: { id } }: WithParams) {
	const body = await req.json();
	const { success, data, error } = issuesSchema.safeParse(body);
	if (!success) {
		return NextResponse.json({ error: error.format() }, { status: 400 });
	}
	const issue = await prisma.issue.findUnique({
		where: {
			id: +id,
		},
	});
	if (!issue) {
		return NextResponse.json({ error: 'Invalid issue' }, { status: 400 });
	}
	const updatedIssue = await prisma.issue.update({
		where: {
			id: issue.id,
		},
		data,
	});

	return NextResponse.json(updatedIssue);
}
