import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { Box, type BoxProps } from './Box';

const badge = cva({
	base: {
		display: 'inline-block',
		px: 'xs',
		py: 'xxxs',
		border: 'thin',
		borderColor: 'accent',
		borderRadius: 'large',
		fontSize: 'xs',
		textTransform: 'lowercase',
	},
	variants: {
		variant: {
			default: {
				color: 'accent',
			},
			inverted: {
				color: 'background',
				background: 'accent',
			},
		},
	},
});

type BadgeProps = Omit<BoxProps<'span'>, 'as' | 'className'> &
	RecipeVariantProps<typeof badge>;

export function Badge({ variant = 'default', ...props }: BadgeProps) {
	return <Box as="span" className={badge({ variant })} {...props} />;
}
