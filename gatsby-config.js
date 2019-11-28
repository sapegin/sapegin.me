module.exports = {
	siteMetadata: {
		title: 'Artem Sapegin',
		description:
			'I’m a coffee first frontend engineer, award-losing photographer, and dog friend, living in Berlin, Germany.',
		lang: 'en',
		url: 'https://sapegin.me',
		twitter: '@iamsapegin',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-lodash',
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
