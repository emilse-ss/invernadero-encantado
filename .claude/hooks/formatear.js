const fs = require("node:fs/promises");
const prettier = require("prettier");

async function main() {
  try {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);

    const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    const filePath = payload?.tool_input?.file_path;

    if (!filePath || !/\.(js|json)$/i.test(filePath)) return;

    const source = await fs.readFile(filePath, "utf8");
    const options = (await prettier.resolveConfig(filePath)) ?? {};
    const formatted = await prettier.format(source, {
      ...options,
      filepath: filePath,
    });

    await fs.writeFile(filePath, formatted, "utf8");
  } catch {
    // El hook de formato no debe bloquear las herramientas de edición.
  }
}

main();
