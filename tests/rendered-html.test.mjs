import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the resource library", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Centro de recursos \| ONUDI Costa Rica<\/title>/i);
  assert.match(html, /Recursos para una industria más/);
  assert.match(html, /Proyectos/);
  assert.match(html, /IA Consciente/);
  assert.match(html, /Red de Mujeres en la Industria/);
  assert.match(html, /Micrositio informativo/);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("uses direct links, project templates and only the approved palette", async () => {
  const [library, projectData, styles] = await Promise.all([
    readFile(new URL("../app/resource-library.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/projects.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(library, /https:\/\/ia-consciente-onudi\.vercel\.app\//);
  assert.match(library, /\/proyectos\/\$\{project\.slug\}/);
  assert.match(library, /Red de Mujeres en la Industria/);
  assert.match(library, /https:\/\/www\.unido\.org\//);
  assert.match(projectData, /country:/);
  assert.match(projectData, /objective:/);
  assert.match(projectData, /strategy:/);
  assert.match(projectData, /impact:/);
  assert.match(styles, /--blue:\s*#009cdc/);
  assert.match(styles, /--orange:\s*#f47a42/);
  assert.match(styles, /--white:\s*#ffffff/);
});

test("does not expose the reference PDF", async () => {
  await assert.rejects(
    access(new URL("../public/recursos/fichas-tecnicas-onudi-costa-rica.pdf", import.meta.url)),
  );
});
