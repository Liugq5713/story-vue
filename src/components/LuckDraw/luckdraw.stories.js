/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import LuckDraw from './index'

storiesOf('LuckDraw', module).add('without props', () => ({
  components: { LuckDraw },
  template: '<LuckDraw></LuckDraw>'
}))
