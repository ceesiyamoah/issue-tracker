import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
	params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: {
			id: +id,
		},
	});
	if (!issue) notFound();

	console.log(issue);

	return (
		<div>
			<p>{issue.title}</p>
			<p>{issue.description}</p>
			<p>{issue.status}</p>
			<p>{issue.createdAt.toDateString()}</p>
		</div>
	);
};

export default IssueDetailPage;
