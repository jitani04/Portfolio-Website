# Resume Website

This is a personal resume website for me, showcasing my skills, experience, and projects, built with JavaScript, HTML, and CSS.

## Table of Contents
- [About](#about)
- [Experience](#experience)
- [Projects](#projects)
- [Contact](#contact)
- [View More](#view-more)

## About
This section provides an overview of Jenna Itani's background, education, and skills.

## Experience
Details of Jenna Itani's professional experience, including roles and responsibilities.

## Projects
A showcase of various projects Jenna Itani has worked on, including descriptions and links to demos or source code.

## Contact
Information on how to get in touch with Jenna Itani for collaboration or opportunities.

## Contact form

This repository includes a client-side contact form at the bottom of `index.html` (`#contact`). The form will:

- Use a `data-endpoint` attribute on the `<form id="contact-form">` to POST JSON (name/email/message) to your endpoint.
- If `data-endpoint` is empty, the form falls back to opening the user's mail client using a `mailto:` link.

How to wire it to a backend:

- Formspree (quick):
	1. Create a free account at https://formspree.io and register your email.
	2. Create a new form and copy the endpoint URL (it looks like `https://formspree.io/f/{id}`).
	3. Edit `index.html` and set `data-endpoint="https://formspree.io/f/{id}"` on the `#contact-form` element.

- Netlify Functions / Vercel Serverless (recommended if you want full control):
	1. Create a serverless function that accepts POST JSON and forwards an email (or stores the submission).
	2. Deploy to Netlify/Vercel and copy the function URL.
	3. Set the function URL on the `data-endpoint` attribute.

Security note: Keep any API keys or SMTP credentials out of client-side code. Use serverless functions to keep secrets on the server.

### Vercel setup (responds to POST /api/contact)

1. This repository includes a serverless function at `api/contact.js` which forwards form submissions to SendGrid.
2. In your Vercel project settings, set these Environment Variables (Project → Settings → Environment Variables):
	- `SENDGRID_API_KEY` — your SendGrid API key
	- `SENDGRID_FROM_EMAIL` — the sender email (must be a verified sender in your SendGrid account)
	- `SENDGRID_TO_EMAIL` — where you want to receive contact messages
3. Deploy to Vercel. The contact form in `index.html` is already configured to POST to `/api/contact`.
4. Test by submitting the form. The function returns JSON { ok: true } on success.

Alternative: If you prefer not to use SendGrid, replace the implementation in `api/contact.js` with any mail provider or call a third-party webhook. Keep secrets in Vercel environment variables.

## View More
A link to view more of Jenna Itani's work on her [GitHub](https://github.com/jitani04).

