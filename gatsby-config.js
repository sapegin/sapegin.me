module.exports = {
	siteMetadata: {
		title: 'Artem Sapegin',
		description:
			'I’m a frontend developer, passionate photographer, coffee drinker and crazy dogs’ owner living in Berlin, Germany.',
		lang: 'en',
		url: 'http://sapegin.me',
		twitter: '@iamsapegin',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-emotion',
		{
			resolve: 'gatsby-plugin-lodash',
			options: {
				disabledFeatures: [
					'shorthands',
					'cloning',
					'currying',
					'exotics',
					'guards',
					'chaining',
					'placeholders',
				],
			},
		},
		'gatsby-plugin-remove-trailing-slashes',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content`,
				name: 'pages',
			},
		},
		'gatsby-transformer-remark',
	],
};
