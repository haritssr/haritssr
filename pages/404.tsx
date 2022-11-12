import Layout from '@/components/Layout';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function NotFoundPage() {
	return (
		<Layout browserTitle='Not found' description='Kasian nyasar'>
			<div className='flex h-screen flex-col items-center justify-center space-y-5'>
				<div className='text-center text-2xl font-medium text-zinc-800 sm:text-4xl sm:font-semibold font-["Hubot_Sans"]'>
					Page not found.
				</div>

				<div
					onClick={() => history.back()}
					className='flex cursor-pointer items-center space-x-1 rounded-full bg-white border border-blue-600 py-1 pl-3 pr-5 text-blue-600 hover:bg-blue-100 group'
				>
					<ChevronLeftIcon
						className='h-4 w-4 group-hover:-translate-x-[1px] duration-100'
						strokeWidth={2}
					/>
					<div>Back</div>
				</div>
			</div>
		</Layout>
	);
}
