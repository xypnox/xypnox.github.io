import { themeCssVars } from '../theme'

import { writeFileSync } from 'fs';

writeFileSync('./cssVariables.json', JSON.stringify(Object.keys(themeCssVars).map(k => `--${k}`)));
