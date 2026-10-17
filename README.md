This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Contenido por agregar

- **Casos reales:** agrega imágenes autorizadas en `public/images/casos/caso-01.webp`, `caso-02.webp` y `caso-03.webp`. Actualiza `components/ProjectShowcase.tsx` para mostrar cada archivo y reemplaza los textos de plantilla solo con proyectos reales.
- **Imágenes de páginas:** agrega las imágenes de servicios en `public/images/servicios/` con los nombres que muestra cada tarjeta; la foto del equipo en `public/images/nosotros/equipo-holos.webp`; y la imagen de contacto en `public/images/contacto/asesoria-holos.webp`. Sustituye los marcadores visuales por `<Image>` de `next/image` en los componentes correspondientes.
- **Video de demostración:** agrega el video optimizado en `public/videos/demo-nfc.mp4` y actualiza `components/VideoShowcase.tsx` para mostrar el reproductor. La sección actual es únicamente una plantilla.
- **WhatsApp:** copia `.env.example` a `.env.local` y asigna `NEXT_PUBLIC_WHATSAPP_NUMBER` al número del negocio con clave de país, solo dígitos. Para México, usa `52` seguido del número nacional de 10 dígitos. Al configurar la variable, el botón flotante abre el chat; mientras tanto, dirige al formulario de contacto.
- **Idiomas:** el selector del encabezado cambia el contenido entre español e inglés mientras navegas. Los archivos de imagen usan las mismas rutas en ambos idiomas.

La página también incluye preguntas frecuentes y una sección de cobertura para la Comarca Lagunera. Revisa y ajusta las localidades y respuestas si cambian las condiciones de servicio.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
