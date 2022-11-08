import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					{/* <link
            rel='preload'
            href='/Inter.var.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          /> */}
					{/* <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
            rel='stylesheet'
          /> */}
				</Head>
				<body className='font-inter'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
