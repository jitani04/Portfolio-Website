# Jenna Itani — Portfolio Website

Personal portfolio website at [jennaitani.com](https://www.jennaitani.com), built with vanilla JavaScript, HTML, and CSS. Deployed on Vercel.

## Sections

- **About** — background, current role, and skills (displayed as categorized pill badges)
- **Education** — UCLA MS, CSULB BS, Cypress AS, relevant courses, and Breakthrough Tech AI Program honors
- **Experience** — professional roles with expandable bullet points in a timeline layout
- **Projects** — featured projects with descriptions, tech stack, and links (including [Sapient](https://sapient-ats.com/))
- **Contact** — contact form + direct email

## Stack

- HTML / CSS / JavaScript (no framework)
- [Particles.js](https://vincentgarreau.com/particles.js/) for the hero background
- Vercel serverless function (`api/contact.js`) for the contact form, using SendGrid

## Contact Form Setup

The form POSTs JSON (name/email/message) to the endpoint set in the `data-endpoint` attribute on `#contact-form`.

### Vercel + SendGrid (current setup)

1. Set these environment variables in Vercel (Project → Settings → Environment Variables):
   - `SENDGRID_API_KEY` — your SendGrid API key
   - `SENDGRID_FROM_EMAIL` — a verified sender in your SendGrid account
   - `SENDGRID_TO_EMAIL` — where you want to receive submissions
2. Deploy. The form is already pointed at `/api/contact`.

### Alternative providers

Replace `api/contact.js` with any mail provider or webhook. Keep secrets in Vercel environment variables, never in client-side code.

## Local Development

Open `index.html` directly in a browser. The contact form won't work locally without a running backend, but everything else will.
