import { patchIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';

interface WithParams {
	params: {
		id: string;
	};
}

export async function PATCH(req: NextRequest, { params: { id } }: WithParams) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({}, { status: 400 });
	}
	const body = await req.json();
	const { success, data, error } = patchIssueSchema.safeParse(body);
	if (!success) {
		return NextResponse.json({ error: error.format() }, { status: 400 });
	}

	const { assignedToUserId } = data;
	if (assignedToUserId) {
		const user = await prisma.user.findUnique({
			where: {
				id: assignedToUserId,
			},
		});
		if (!user) return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
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

export async function DELETE(req: NextRequest, { params: { id } }: WithParams) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({}, { status: 400 });
	}
	const issue = await prisma.issue.findUnique({
		where: {
			id: +id,
		},
	});
	if (!issue) {
		return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
	}

	await prisma.issue.delete({ where: { id: issue.id } });

	return NextResponse.json({});
}
