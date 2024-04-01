import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { Box, type BoxProps } from './Box';

const badge = cva({
	base: {
		display: 'inline-block',
		px: 'xs',
		py: 'xxs',
		border: 'thin',
		borderRadius: 'large',
		fontSize: 'xs',
	},
	variants: {
		variant: {
			default: {
				color: 'accent',
			},
			inverted: {
				color: 'bg',
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
