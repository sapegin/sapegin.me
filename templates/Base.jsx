export default function($, children) {
	const { pageTitle, layout, scripts } = $;
	const { Style, Script, option } = $;
	return (
		<html lang={option('lang')}>
			<head>
				<meta charset="utf-8" />
				<title>{pageTitle}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="description" content={option('description')} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={option('title')} />
				<meta property="og:url" content={option('url')} />
				<meta property="og:site_name" content={option('title')} />
				<meta property="og:description" content={option('description')} />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={option('title')} />
				<meta name="twitter:description" content={option('description')} />
				<meta name="twitter:creator" content="@sapegin" />
				<Style src="/build/styles.css" />
				<Script src="/build/counters.js" inline />
			</head>
			<body class={`page page_${layout.toLowerCase()}`}>
				{children}
				{scripts && scripts.map(script => (
					<Script src={`/build/${script}.js`} inline />
				))}
			</body>
		</html>
	);
}
