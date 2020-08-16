import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontSize: '10',
    htmlFontSize: 10,
    fontFamily: [
      'Comic Sans MS',
      'cursive',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
