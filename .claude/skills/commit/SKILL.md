---
name: commit
description: "Revisa los cambios preparados y crea un commit Conventional Commit sin credenciales ni push. Usar al invocar /commit."
disable-model-invocation: true
---

# Commit

1. Leer los cambios preparados con `git diff --staged`.
2. Si no hay nada en staging, avisar y detenerse. Nunca ejecutar `git add`.
3. Si los cambios incluyen `.env` o algo que parezca una credencial, detenerse y avisar.
4. Escribir el mensaje en formato Conventional Commits (`feat`, `fix`, `docs`, `test`, `refactor`, `chore`), en español y con máximo 72 caracteres.
5. Mostrar el mensaje al usuario y ejecutar el commit. Nunca hacer push.
