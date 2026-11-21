# FORMA Coaching

A responsive online fitness coaching website built with React, Vite, Tailwind CSS, Lucide, and Motion for React.

## Preview and build in Codex Cloud

The project lives at `/workspace/70-build-test`. Run the following in the cloud terminal with Node.js 24.

```sh
npm ci
npm run dev -- --host 0.0.0.0
```

Vite defaults to port 5173. Open the forwarded port if your Cloud workspace offers port previews. You can also deploy the GitHub branch for a Vercel preview.

```sh
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

The production build is in `dist`.

## Publish from GitHub with Vercel

1. Review the project changes in Codex, publish the commit to GitHub, and merge the pull request into the default branch if you used a pull request. If the repository is empty, publish the initial commit to create its default branch first.
2. Sign in to Vercel, choose **Add New → Project**, and import the GitHub repository. Grant Vercel access to this repository if prompted.
3. Leave **Root Directory** at the repository root. Use **Vite** as the framework and **Node.js 24.x**. The repository config supplies `npm run build` and `dist`. The install command can use Vercel’s default.
4. Select **Deploy**, then open the URL shown on the deployment page. Future pull requests can get their own preview URLs when the Vercel Git integration is enabled.

## Make it your own

- Edit [src/site.js](src/site.js) for the brand, tagline, coach biography, qualifications, specialties, coaching services, prices, FAQs, approved client stories, and contact information.
- Add a verified WhatsApp number as international digits, including the country code. Leave the field blank until the number is ready. Add an Instagram URL and email address in the same file to enable those footer links.
- Replace the illustrative photographs under `public/images` with your own photos or update the image paths in the settings file. The hero uses a separate mobile crop. Provide meaningful alt text for replacements. The included images are generated illustrations and do not depict the actual coach or clients.
- Update [index.html](index.html) for the browser title, search description, and Open Graph fields. Replace [public/forma.svg](public/forma.svg) for the favicon.

## Application privacy

The application is prepared in the browser. With a configured number, the form creates a WhatsApp draft for the visitor to review and send. Without a number, it creates a copyable draft and leaves the visitor on the website. The site does not persist the form, use a backend, or auto-send messages.
