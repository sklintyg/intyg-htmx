import { getCookie } from "https://deno.land/x/hono@v4.2.3/helper/cookie/index.ts";
import { serveStatic } from "https://deno.land/x/hono@v4.2.3/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v4.2.3/mod.ts";
import { render } from "preact-render-to-string";
import { Layout } from "./Layout.tsx";
import { CertificateView } from "./components/CertificateView.tsx";
import { Certificate } from "./types/certificate.types.ts";
import { safeId } from "./util/safeId.ts";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./src" }));
app.use("/static/*", serveStatic({ root: "./src" }));

const certificate = JSON.parse(
  await Deno.readTextFile("./data/lisjp.json")
) as Certificate;

// const API_URL = "https://wc2.webcert-devtest.intyg.nordicmedtest.se/";

// async function api<T>(path: string, cookies: Record<string, string>) {
//   const url = `${API_URL}api/${path}`;
//   const response = await fetch(url, {
//     headers: {
//       accept: "application/json",
//       cookie: Object.entries(cookies)
//         .filter(([key, val]) => Boolean(val))
//         .map(([key, value]) => `${key}=${value}`)
//         .join(";"),
//       "x-xsrf-token": cookies["XSRF-TOKEN"],
//     },
//   });

//   return (await response.json()) as T;
// }

// app.get("/:id", async (c) => {
//   const { certificate } = await api<{ certificate: Certificate }>(
//     "certificate/21f16fb8-6324-4ea5-8345-1214bf8ab819",
//     getCookie(c)
//   );

//   return c.html(
//     render(
//       <Layout title={certificate.metadata.name}>
//         <CertificateView
//           certificate={{
//             ...certificate,
//             data: Object.fromEntries(
//               Object.entries(certificate.data).map(([id, data]) => [
//                 safeId(id),
//                 { ...data, id: safeId(id) },
//               ])
//             ),
//           }}
//         />
//       </Layout>
//     )
//   );
// });

app.get("/", (c) => {
  return c.html(
    render(
      <Layout title={certificate.metadata.name}>
        <CertificateView
          certificate={{
            ...certificate,
            data: Object.fromEntries(
              Object.entries(certificate.data).map(([id, data]) => [
                safeId(id),
                { ...data, id: safeId(id) },
              ])
            ),
          }}
        />
      </Layout>
    )
  );
});

app.post("/validate", (c) => {
  return c.html(
    render(
      <CertificateView
        certificate={{
          ...certificate,
          data: Object.fromEntries(
            Object.entries(certificate.data).map(([id, data]) => [
              safeId(id),
              { ...data, id: safeId(id) },
            ])
          ),
        }}
      />
    )
  );
});

app.post("/sign", async (c) => {
  const body = await c.req.parseBody();

  console.log(
    Object.entries(body).map(([field, value]) => {
      const [questionId, valueId] = field.split(".");
      return [
        questionId,
        { id: valueId, value: value === "on" ? true : value },
      ];
    })
  );
  return c.html(
    render(
      <CertificateView
        certificate={{
          ...certificate,
          data: Object.fromEntries(
            Object.entries(certificate.data).map(([id, data]) => [
              safeId(id),
              { ...data, id: safeId(id) },
            ])
          ),
        }}
      />
    )
  );
});

Deno.serve(app.fetch);
