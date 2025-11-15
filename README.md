# WigConnect - Premium Wig Import Service Landing Page

A beautiful, modern, and responsive landing page for a wig import service specializing in premium wigs from Vietnam, India, and Eastern Europe. Built with vanilla HTML, CSS, JavaScript, and Tailwind CSS.

## 🌟 Features

- **Modern & Aesthetic Design**: Beautiful gradient-based UI with smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **WhatsApp Integration**: Direct WhatsApp linking with pre-filled messages
- **Dynamic Configuration**: All settings externalized to `settings.json` for easy customization
- **Dark/Light Mode Support**: Theme configuration via settings
- **Smooth Animations**: Scroll-triggered animations and transitions
- **Form Validation**: Phone number validation and formatting
- **Copy-to-Clipboard**: Easy link sharing functionality

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development) - Python, Node.js, or any static file server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bigtennet/wigconnect-complete-site.git
   cd wigconnect-complete-site
   ```

2. **Serve the files**
   
   Using Python 3:
   ```bash
   python3 -m http.server 8000
   ```
   
   Using Node.js (with http-server):
   ```bash
   npx http-server -p 8000
   ```
   
   Using PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## ⚙️ Configuration

All website settings are stored in `settings.json`. Edit this file to customize:

### Business Information
```json
{
  "business": {
    "name": "WigConnect",
    "tagline": "Premium Wig Import Service",
    "description": "Your business description here"
  }
}
```

### Contact Details
```json
{
  "contact": {
    "ownerPhone": "2349057930710",
    "countryCode": "234",
    "countryName": "Nigeria",
    "whatsappMessage": "Your predefined WhatsApp message here"
  }
}
```

### Theme Settings
```json
{
  "theme": {
    "mode": "light",
    "primaryColor": "rose",
    "secondaryColor": "purple",
    "accentColor": "pink"
  }
}
```

### Content Customization
- Hero section title, subtitle, and features
- About section cards
- Services section items
- CTA text and button labels
- Footer information
- Navigation links

## 📁 Project Structure

```
wigconnect-complete-site/
│
├── index.html              # Main HTML file
├── styles.css              # Custom CSS styles
├── script.js               # JavaScript functionality
├── settings.json           # Configuration file
├── settings-loader.js      # Settings loader and applier
├── README.md              # This file
└── prompt                 # Project requirements/notes
```

## 🎨 Customization Guide

### Changing Colors

Edit `settings.json` to change the color scheme:
- `primaryColor`: Main brand color (rose, purple, pink, etc.)
- `secondaryColor`: Secondary accent color
- `accentColor`: Additional accent color

### Modifying Content

All text content is stored in `settings.json` under the `content` section. Simply edit the values to update:
- Hero section
- About section
- Services section
- CTA section
- Footer

### WhatsApp Integration

1. Update `ownerPhone` in `settings.json` with your WhatsApp number (include country code, no + sign)
2. Customize `whatsappMessage` to set the default message sent to you
3. The system automatically includes the user's phone number in the message

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Custom styles and animations
- **JavaScript (ES6+)**: Modern JavaScript features
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **JSON**: Configuration management

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Key Features Implementation
- **Form Validation**: Client-side phone number validation
- **Dynamic Content Loading**: Settings loaded from JSON and applied via data attributes
- **State Management**: Form states (default, loading, success)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Semantic HTML and ARIA-friendly structure

## 📱 How It Works

1. **User visits the landing page** and sees information about the wig import service
2. **User clicks "Connect via WhatsApp"** button
3. **User is taken to the form section** where they enter their WhatsApp number
4. **User submits the form** and a loading animation appears
5. **A WhatsApp link is generated** that opens WhatsApp with:
   - Pre-filled message to the owner
   - User's phone number included in the message
6. **User clicks the link** to open WhatsApp and start the conversation

## 🔒 Privacy & Security

- No data is stored on the server
- Phone numbers are only used to generate WhatsApp links
- All processing happens client-side
- No tracking or analytics by default

## 🐛 Troubleshooting

### Form not submitting
- Check browser console for JavaScript errors
- Ensure `settings.json` is accessible (CORS issues in some browsers)
- Verify all required fields are filled

### WhatsApp link not working
- Ensure `ownerPhone` in `settings.json` is correct (country code + number, no + sign)
- Check that the phone number format is correct
- Test the generated link manually

### Styles not loading
- Check internet connection (Tailwind CSS is loaded via CDN)
- Verify `styles.css` is linked correctly in `index.html`
- Clear browser cache

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🎯 Future Enhancements

Potential features for future versions:
- [ ] Multi-language support
- [ ] Admin dashboard for managing settings
- [ ] Analytics integration
- [ ] Email notifications
- [ ] Order tracking system
- [ ] Customer testimonials section
- [ ] Image gallery for wig products

---

**Built with ❤️ for WigConnect**

