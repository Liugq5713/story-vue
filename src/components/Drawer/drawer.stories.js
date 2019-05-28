/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import addons from '@storybook/addons'
import Events from '@storybook/core-events'
import Drawer from './index'
import notes from './README.md'

storiesOf('Drawer', module)
  .addDecorator(withKnobs)
  .add(
    'without props',
    () => ({
      components: { Drawer },
      template: '<Drawer></Drawer>'
    }),
    {
      notes
    }
  )
  .add('custom position', () => {
    const positions = {
      Top: 'top',
      Right: 'right',
      Left: 'left',
      Bottom: 'bottom'
    }
    return {
      components: { Drawer },
      props: {
        position: {
          default: select('Position', positions, 'top')
        }
      },
      template: '<Drawer  :position="position"></Drawer>'
    }
  })
