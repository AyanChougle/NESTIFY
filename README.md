# Nestify Interiors - Website

A modern, responsive website for Nestify Interiors, a luxury interior design studio based in Ghatkopar West, Mumbai. This project showcases our premium design services, pricing packages, and portfolio with an elegant user experience.

## 🎯 Project Overview

Nestify Interiors specializes in high-end residential and commercial interior design solutions. This website serves as a digital showcase for our services, pricing, portfolio, and consultation booking system.

**Live Features:**
- Service showcase with detailed descriptions
- Tiered pricing packages (Essential, Premium, Luxury)
- Portfolio gallery with project showcases
- Free consultation booking form with email notifications
- WhatsApp integration for quick contact
- Responsive design for all devices
- Smooth scrolling animations

## 📁 Project Structure

```
.
├── index.html              # Homepage with hero, services preview, testimonials, CTA
├── about.html              # Company story, mission, values, team info
├── services.html           # Detailed service descriptions
├── pricing.html            # Pricing packages and features
├── portfolio.html          # Project portfolio and case studies
├── contact.html            # Contact form, map, consultation booking
├── navbar.html             # Navigation component (included in all pages)
├── footer.html             # Footer with links and contact info
├── css/
│   ├── style.css           # Main stylesheet with responsive grid, components
│   └── animations.css      # Scroll animations and transitions
├── js/
│   ├── main.js             # Core functionality, navigation, animations
│   ├── forms.js            # Form handling and EmailJS integration
│   └── config.js           # Configuration file (if needed for API keys)
└── README.md               # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with custom properties (variables), responsive grid system
- **JavaScript** - Interactivity and DOM manipulation
- **AOS (Animate On Scroll)** - Scroll-triggered animations
- **EmailJS** - Client-side email notifications for form submissions
- **Google Maps Embed API** - Location display
- **Responsive Design** - Mobile-first approach

## 🎨 Design System

### Color Palette
- **Primary Gold**: `#c9a84c` - Luxury accent color
- **Dark Background**: `#1a1a1a` - Dark luxury aesthetic
- **Cream Text**: `#f5f0e8` - Main text color
- **Muted Text**: `#8a8278` - Secondary text
- **Border Color**: `#2a2a2a` - Subtle dividers

### Spacing System
Custom CSS variables for consistent spacing:
- `--sp-xs`: 0.5rem
- `--sp-sm`: 1rem
- `--sp-md`: 1.5rem
- `--sp-lg`: 2rem
- `--sp-xl`: 3rem
- `--sp-3xl`: 8rem

### Typography
- **Display Font**: For headings and emphasis
- **Body Font**: For paragraph text
- **Responsive sizing** scaled across devices

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+ (4-column grid)
- **Tablet**: 768px - 1024px (2-3 column grid)
- **Mobile**: Below 768px (1-column stacked layout)

## 🚀 Quick Start

### Setup

1. **Clone or download** the project files
2. **Open in a browser** - Simply open `index.html` in any modern web browser
3. **No build step required** - This is a static HTML/CSS/JS site

### Configuration

#### EmailJS Setup (for contact forms)
The contact form uses EmailJS to send emails. To enable:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Update the EmailJS Public Key in `js/forms.js`:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```

#### Google Maps
Maps are embedded via Google Maps Embed API. Update the embed code in `contact.html` if needed.

### File Modifications

**Update Contact Information:**
- Phone: `919029892383` (search across files)
- Email: `Nestifyinterior96@gmail.com` (in footer.html, contact.html)
- Address: `No-7, Old Maneklal Chawl, Near Telephone Exchange, Lal Bahadur Shastri Marg, Ghatkopar West, Mumbai, Maharashtra 400086`
- WhatsApp: `https://wa.me/919029892383`

**Update Text Content:**
- All page content is hardcoded in HTML files
- Search for sections you want to modify and edit the `<p>`, `<h2>`, `<h3>` tags directly
- Service descriptions: `services.html`
- Pricing details: `pricing.html`
- About/mission: `about.html`

**Update Images:**
- Replace image paths in `src=""` attributes
- Recommended image sizes:
  - Hero banner: 1920x600px
  - Portfolio items: 800x600px
  - Team photo: 1600x2000px

## 🎯 Key Pages

### Homepage (index.html)
- Hero section with CTA
- Featured services
- Portfolio preview
- Testimonials/stats section
- FAQ section
- Call-to-action banner

### Services (services.html)
- Detailed service descriptions
- Service benefits and features
- Process overview
- WhatsApp contact button

### Pricing (pricing.html)
- Three pricing tiers: Essential, Premium, Luxury
- Feature comparison
- Custom quote CTA
- WhatsApp channel

### About (about.html)
- Company story
- Mission & values
- Team showcase
- Years of experience badge

### Contact (contact.html)
- Consultation booking form
- Embedded Google Map
- Address and phone display
- Direct contact options

## 📧 Forms & Email Integration

### Contact Form
Located in `contact.html` and handled by `js/forms.js`. Uses EmailJS for backend email delivery.

**Form Fields:**
- Full Name
- Email
- Phone
- Project Type
- Budget Range
- Message

**Email Notification:**
Sends emails to `Nestifyinterior96@gmail.com` when forms are submitted.

## 🎬 Animations

- **AOS (Animate On Scroll)**: Elements fade and slide in as user scrolls
- **Hover Effects**: Interactive buttons and links with smooth transitions
- **Smooth Scrolling**: Navigation links scroll to sections smoothly

Configure animations in `css/animations.css` or via AOS data attributes in HTML.

## 🔧 Customization Guide

### Change Brand Colors
Edit CSS variables in `css/style.css` (`:root` section):
```css
:root {
  --clr-gold: #c9a84c;        /* Change primary accent */
  --clr-cream: #f5f0e8;       /* Change text color */
  --clr-bg: #1a1a1a;          /* Change background */
  /* ... other colors ... */
}
```

### Add New Services
1. Duplicate a service card in `services.html`
2. Update icon, title, description
3. Adjust grid if adding more items

### Update Pricing
1. Edit pricing tiers in `pricing.html`
2. Update prices, features, tier names
3. Ensure prices remain competitive

### Add Portfolio Items
1. Add new portfolio items in `index.html` or create dedicated `portfolio.html`
2. Update image paths and descriptions
3. Maintain aspect ratios for consistency

## 📞 Contact Information

- **Phone**: +91 90298 92383
- **Email**: Nestifyinterior96@gmail.com
- **Location**: No-7, Old Maneklal Chawl, Near Telephone Exchange, Lal Bahadur Shastri Marg, Ghatkopar West, Mumbai, Maharashtra 400086
- **WhatsApp**: [Chat with us](https://wa.me/919029892383)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance Tips

1. **Optimize Images**: Compress images before uploading (aim for <200KB each)
2. **Lazy Loading**: Images with `loading="lazy"` attribute load on scroll
3. **CSS/JS**: Combined and minified for faster loading
4. **Caching**: Static assets cached by browsers

## 🐛 Troubleshooting

### Forms not sending emails
- Verify EmailJS Public Key is correctly set in `js/forms.js`
- Check EmailJS account is active with valid service/template IDs
- Check browser console for error messages

### Map not displaying
- Verify Google Maps embed code is correct
- Check for CORS issues (embed API should work cross-domain)

### Animations not working
- Ensure `js/main.js` loads before the page content
- Check AOS library is properly included in HTML
- Verify `data-aos` attributes are present on elements

### Responsive layout issues
- Check that viewport meta tag is in head: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Test in browser DevTools device emulation mode

## 📝 License

Standard business website - all content and designs are proprietary to Nestify Interiors.

## 👥 Credits

- **Design**: Responsive luxury aesthetic
- **Animations**: AOS (Animate On Scroll) library
- **Email Service**: EmailJS
- **Maps**: Google Maps Embed API

---

For questions or support regarding this website, contact: **Nestifyinterior96@gmail.com**

Last Updated: March 2026
