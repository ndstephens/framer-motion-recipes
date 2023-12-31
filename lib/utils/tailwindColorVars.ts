import type { Config } from 'tailwindcss';
import type { PluginCreator } from 'tailwindcss/types/config';

const flattenColorPalette = (
  colors: NonNullable<Required<Config>['theme']['colors']>
): Record<string, string> =>
  Object.assign(
    {},
    ...Object.entries(
      colors !== null && colors !== void 0 ? colors : {}
    ).flatMap(([color, values]) =>
      typeof values == 'object'
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
          }))
        : [
            {
              [`${color}`]: values,
            },
          ]
    )
  );

// This plugin adds each Tailwind color included in the theme (including custom colors under 'extend') as a global CSS variable, e.g. var(--gray-200).
export const addTailwindColorVariables: PluginCreator = ({
  addBase,
  theme,
}) => {
  const allColors = flattenColorPalette(theme('colors'));
  const colorVariables = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({
    ':root': colorVariables,
  });
};
