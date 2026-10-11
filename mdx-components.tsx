import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

// Reference tables are the bulk of these docs. Nextra's default gives every
// cell a full grid border and zebra rows; ours are a single bordered card with
// row rules only, wrapped so a wide table scrolls inside itself on a phone.
const table = {
  table: (props: ComponentProps<"table">) => (
    <div className="d3-table">
      <table {...props} />
    </div>
  ),
  tr: (props: ComponentProps<"tr">) => <tr {...props} />,
  th: (props: ComponentProps<"th">) => <th {...props} />,
  td: (props: ComponentProps<"td">) => <td {...props} />,
};

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...getDocsMDXComponents(),
    ...table,
    ...components,
  };
}
