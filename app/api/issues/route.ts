import { issuesSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../auth/authOptions';

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({}, { status: 400 });
	}
	const body = await request.json();
	const { success, data, error } = issuesSchema.safeParse(body);
	if (!success) {
		return NextResponse.json({ error: error.format() }, { status: 400 });
	}

	const newIssue = await prisma.issue.create({
		data,
	});

	return NextResponse.json(newIssue);
}
