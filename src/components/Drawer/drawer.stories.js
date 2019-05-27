/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import Drawer from './index'
import note from './README.md'

storiesOf('Drawer', module).add(
  'without props',
  () => ({
    components: { Drawer },
    template: '<Drawer></Drawer>'
  }),
  {
    notes: note
  }
)
