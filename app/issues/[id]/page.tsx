import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';

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
	await delay(3000);

	console.log(issue);

	return (
		<div>
			<Heading>{issue.title}</Heading>
			<Flex gap='3' my='2'>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className='prose mt-3'>
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</div>
	);
};

export default IssueDetailPage;
