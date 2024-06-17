import { ComponentChildren } from "preact";

export const Layout = (props: {
  title: string;
  children?: ComponentChildren;
}) => (
  <html lang="sv-se">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{props.title}</title>
      <script
        src="https://unpkg.com/htmx.org@1.9.11"
        integrity="sha384-0gxUXCCR8yv9FM2b+U3FDbsKthCI66oH5IA9fHppQq9DDMHuMauqq1ZHBpJxQ0J0"
        crossorigin="anonymous"
      ></script>
      <script defer type="module" src="/static/certificate.js"></script>
      <script
        src="https://unpkg.com/htmx.org@1.9.12/dist/ext/alpine-morph.js"
        integrity="sha384-tOAHN1ROllxv+z4ALtsuolyJGGB0NnJbgZb+Zk4vH1y5uMfjG24CLWV1C2kJg6ex"
        crossorigin="anonymous"
      ></script>
      <script
        defer
        src="https://unpkg.com/@alpinejs/morph@3.13.10/dist/cdn.min.js"
        integrity="sha384-iifNjC3cIfwcYCjoGZ3lJ7pk/zo8zZ/wnPfj7y9+JTeXYX5FJwqz2GSJ0V3DAdJz"
        crossorigin="anonymous"
      ></script>
      <script
        defer
        src="https://unpkg.com/alpinejs@3.13.10/dist/cdn.min.js"
        integrity="sha384-XBJ5+bq4ga1+0s+J4sl6njqQ9C/YIfKeQw18HypSuGEaPm1g/VWaNdsQ5d3sE1qi"
        crossorigin="anonymous"
      ></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind-compat.min.css"
      />
      <link rel="stylesheet" href="/static/styling.css" />
      <script
        src="https://cdn.jsdelivr.net/npm/@unocss/runtime@0.60.2/uno.global.min.js"
        integrity="sha384-VCEP34WByJo3EnPLhnynihXlOIQkTSOP7etsqEFln+4tzLzjf6cw27BSrQgI3lFN"
        crossorigin="anonymous"
      ></script>
    </head>
    <body class="antialiased ids">{props.children}</body>
  </html>
);
