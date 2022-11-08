import Layout from '@/components/Layout';

import React from 'react';

export default function CaseStudyAKATradingIndo() {
	return (
		<Layout browserTitle='Projects' description='Home'>
			<div className='mt-10 sm:mt-20'>
				<div className='text-blue-600 font-medium'>Case study</div>
				<div className='text-2xl  font-semibold'>AKA Trading Indonesia</div>
				<iframe
					width='800'
					height='450'
					src='https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FOO23zC5c2iErduRQkQAfsI%2FAKA-Trading-Indonesia%3Fnode-id%3D202%253A2'
					allowFullScreen
				></iframe>
			</div>
		</Layout>
	);
}
