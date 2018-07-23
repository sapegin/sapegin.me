import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme';
import '../styles';

const Provider = ({ children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Provider;
