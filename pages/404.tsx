import Layout from '@/components/Layout';

export default function NotFoundPage() {
	return (
		<Layout browserTitle='Not found' description='Kasian nyasar'>
			<div className='flex h-screen flex-col items-center justify-center space-y-5'>
				<div className='text-center text-2xl font-medium text-zinc-800 sm:text-4xl sm:font-semibold font-["Hubot_Sans"]'>
					Page not found.
				</div>

				<div
					onClick={() => history.back()}
					className='flex cursor-pointer items-center rounded-full bg-white border border-blue-600 py-1 px-4 text-blue-600 hover:bg-blue-50 group'
				>
					<div>Back</div>
				</div>
			</div>
		</Layout>
	);
}
