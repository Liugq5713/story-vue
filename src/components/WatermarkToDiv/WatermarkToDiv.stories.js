/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import WatermarkToDiv from './index'
import note from './README.md'

storiesOf('WatermarkToDiv', module).add(
  'without props',
  () => ({
    components: { WatermarkToDiv },
    template: `<WatermarkToDiv>
      <div style='width:600px;height:500px'></div> 
    </WatermarkToDiv>`
  }),
  {
    notes: note
  }
)