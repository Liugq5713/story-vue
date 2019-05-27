// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import MyButton from './Button.vue'
import Drawer from '../src/Drawer'

storiesOf('Button', module)
  .add('with text', () => '<my-button>with text</my-button>')
  .add('with emoji', () => '<my-button>😀 😎 👍 💯</my-button>')
  .add('as a component', () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">rounded</my-button>'
  }))

storiesOf('Drawer', module).add('as a component', () => ({
  components: { Drawer },
  template:
    '<Drawer position="left" controlOffset="300px" contentSize="200px">rounded</Drawer>'
}))
