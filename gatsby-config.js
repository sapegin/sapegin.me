module.exports = {
	siteMetadata: {
		title: 'Artem Sapegin',
		description:
			'I’m a frontend developer, passionate photographer, coffee drinker and crazy dogs’ owner living in Berlin, Germany.',
		lang: 'en',
		url: 'https://sapegin.me',
		twitter: '@iamsapegin',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-emotion',
		'gatsby-plugin-lodash',
		'gatsby-plugin-remove-trailing-slashes',
		'gatsby-plugin-typescript',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content`,
				name: 'pages',
			},
		},
		'gatsby-transformer-remark',
		'gatsby-plugin-netlify',
		{
			resolve: 'gatsby-plugin-fathom',
			options: {
				trackingUrl: 'stats.sapegin.me',
				siteId: 'DUNEQ',
			},
		},
	],
};
