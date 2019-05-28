/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import addons from "@storybook/addons";
import Events from "@storybook/core-events";
import Drawer from "./index";
import note from "./README.md";

storiesOf("Drawer", module)
  .addDecorator(withKnobs)
  .add(
    "without props",
    () => ({
      components: { Drawer },
      template: "<Drawer></Drawer>"
    }),
    {
      notes: note
    }
  )
  .add("custom position", () => ({
    components: { Drawer },
    template: '<Drawer position="top"></Drawer>'
  }))
  .add("custom content", () => {
    const positions = {
      Top: "top",
      Right: "right",
      Left: "left",
      Bottom: "bottom"
    };
    return {
      components: { Drawer },
      props: {
        position: {
          default: select("Position", positions, "top")
        }
      },
      watch: {
        position(val) {
          console.log("change", val);
          this.$forceUpdate();
          addons.getChannel().emit(Events.FORCE_RE_RENDER);
        }
      },

      template: '<Drawer :position="position"></Drawer>',
      created() {
        console.log("------created");
      },
      destroyed() {
        console.log("---destroyed");
      }
    };
  });
