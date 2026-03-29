/* ============================================================
   NESTIFY INTERIORS — forms.js
   EmailJS form handling for Contact & Pricing pages

   SETUP:
   1. Go to https://emailjs.com and create a free account
   2. Create a Service (Gmail / SMTP) → copy the Service ID
   3. Create an Email Template → copy the Template ID
   4. Go to Account → copy your Public Key
   5. Replace the placeholder values below with your actual IDs

   Template variables used:
     {{from_name}}   — sender's name
     {{from_phone}}  — sender's phone
     {{reply_to}}    — sender's email (if collected)
     {{city}}        — city
     {{property_type}} — property type
     {{budget}}      — budget range
     {{requirement}} — requirement / message
   ============================================================ */

'use strict';

/* ── EmailJS Config — REPLACE THESE ────────────────────────── */
const EMAILJS_CONFIG = {
  publicKey:   'YOUR_PUBLIC_KEY',          // e.g. 'abc123XYZ'
  serviceId:   'YOUR_SERVICE_ID',          // e.g. 'service_xxxxxx'
  templateId:  'YOUR_TEMPLATE_ID',         // e.g. 'template_xxxxxx'
};

/* ── WhatsApp Number — REPLACE ──────────────────────────────── */
const WA_NUMBER = '919029892383';          // Country code + number, no +

/* ── Initialize EmailJS ─────────────────────────────────────── */
function initEmailJS() {
  if (typeof emailjs === 'undefined') {
    console.warn('EmailJS SDK not loaded. Add the CDN script to your HTML.');
    return false;
  }
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  return true;
}

/* ── Generic Form Handler ───────────────────────────────────── */
/**
 * @param {string} formId       - ID of the <form> element
 * @param {string} msgId        - ID of the success/error message element
 * @param {Function} buildParams - Returns the EmailJS params object from FormData
 */
function handleForm(formId, msgId, buildParams) {
  const form    = document.getElementById(formId);
  const msgEl   = document.getElementById(msgId);
  if (!form || !msgEl) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const origText  = submitBtn.textContent;

    // Loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.innerHTML = '<span class="spinner"></span> Sending…';
    submitBtn.disabled  = true;
    msgEl.className = 'form-message';
    msgEl.textContent = '';

    const params = buildParams(new FormData(form));

    try {
      if (!initEmailJS()) throw new Error('EmailJS not available');

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        params
      );

      // Success
      msgEl.textContent = "✓ Message sent! We'll get back to you within 24 hours.";
      msgEl.className   = 'form-message success';
      form.reset();

    } catch (err) {
      console.error('EmailJS error:', err);
      msgEl.textContent = "✗ Something went wrong. Please call us directly or WhatsApp.";
      msgEl.className   = 'form-message error';
    } finally {
      submitBtn.classList.remove('btn-loading');
      submitBtn.textContent = origText;
      submitBtn.disabled    = false;
    }
  });
}

/* ── Contact Form ───────────────────────────────────────────── */
function initContactForm() {
  handleForm('contactForm', 'contactMsg', fd => ({
    from_name:   fd.get('name')        || '',
    from_phone:  fd.get('phone')       || '',
    reply_to:    fd.get('email')       || '',
    budget:      fd.get('budget')      || '',
    requirement: fd.get('requirement') || '',
    page_source: 'Contact Page',
  }));
}

/* ── Quote / Pricing Form ───────────────────────────────────── */
function initQuoteForm() {
  handleForm('quoteForm', 'quoteMsg', fd => ({
    from_name:     fd.get('name')          || '',
    from_phone:    fd.get('phone')         || '',
    city:          fd.get('city')          || '',
    property_type: fd.get('property_type') || '',
    budget:        fd.get('budget')        || '',
    requirement:   fd.get('requirement')   || '',
    page_source:   'Pricing Page',
  }));
}

/* ── WhatsApp CTA dynamic links ─────────────────────────────── */
/**
 * Updates all [data-wa-msg] anchors with a pre-filled WhatsApp URL
 * based on their message attribute.
 */
function initWhatsAppLinks() {
  const base = `https://wa.me/${WA_NUMBER}`;

  document.querySelectorAll('[data-wa-msg]').forEach(el => {
    const msg = encodeURIComponent(el.dataset.waMsg);
    el.href = `${base}?text=${msg}`;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initQuoteForm();
  initWhatsAppLinks();
});
