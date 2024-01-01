import { ComponentProps } from "solid-js"

declare module "solid-js" {
  // extend the module with a new interface
  namespace JSX {
    interface IntrinsicElements {
      "iconify-icon": ComponentProps<"svg"> & { icon: string }
    }
  }
}

