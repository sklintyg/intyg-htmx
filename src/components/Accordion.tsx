import { ComponentChildren } from "preact";

export function Accordion({
  header,
  children,
}: {
  header: ComponentChildren;
  children: ComponentChildren;
}) {
  return (
    <details
      class="border-b-1 border-gray-600 group"
      x-data="{open: false}"
      x-on:toggle="open = Boolean($el.open)"
    >
      <summary class="list-none cursor-pointer">{header}</summary>
      <div
        class="mb-4 overflow-hidden h-0 group-open:h-auto group-open:overflow-auto transition"
        x-show="open"
        {...{ ["x-transition.opacity"]: "" }}
      >
        {children}
      </div>
    </details>
  );
}
