 <div align="center">

# ⚡ PXQrGen

### Modern QR Code Generator

**Create. Customize. Share.**

Generate beautiful, customizable QR codes for UPI payments, websites, Wi-Fi, social media, contacts, and more — all in one place.

<br>

![Version](https://img.shields.io/badge/version-1.0.0-6366f1?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Powered-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-Framework-000000?style=for-the-badge&logo=next.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)

<br>

**Developed by [ItzMePara9](https://github.com/ItzMePara9)**

</div>

---

## 📖 Overview

**PXQrGen** is a modern, free, and easy-to-use QR code generation platform designed to make sharing information effortless.

Whether you need a QR code for a website, UPI payment, Wi-Fi connection, WhatsApp conversation, social media profile, or contact information, PXQrGen provides everything in one simple interface.

With real-time QR generation, advanced customization options, and multiple export formats, users can create professional QR codes without requiring an account or complicated setup.

### Why PXQrGen?

- Instant QR code generation.
- Multiple QR code generation types.
- Dedicated UPI payment QR generator.
- Advanced QR customization studio.
- Live QR code preview.
- Multiple download formats.
- No registration or login required.
- Client-side generation for user privacy.
- Free and open-source under the MIT License.

---

## ✨ Features

### 📱 Multiple QR Generation Types

Create QR codes for different purposes using dedicated generation forms.

| QR Type | Description |
|---|---|
| Website URL | Generate QR codes for websites and URLs. |
| UPI Payment | Create Indian UPI payment QR codes. |
| Wi-Fi | Share Wi-Fi credentials through QR codes. |
| Plain Text | Convert any text into a QR code. |
| WhatsApp | Generate direct WhatsApp chat QR codes. |
| Email | Create pre-filled email QR codes. |
| Phone Number | Share phone numbers instantly. |
| SMS | Generate SMS QR codes. |
| Contact / vCard | Share contact information. |
| Instagram | Share Instagram profiles. |
| YouTube | Share YouTube channels and videos. |
| Discord | Share Discord invitations. |
| Facebook | Share Facebook profiles and pages. |
| LinkedIn | Share professional profiles. |
| Location | Share map locations through QR codes. |

### 💳 UPI Payment QR Generator

Generate payment QR codes using Indian UPI payment addresses.

| Feature | Description |
|---|---|
| UPI ID | Enter your UPI payment address. |
| Payee Name | Set the recipient's display name. |
| Custom Amount | Optionally specify a payment amount. |
| Transaction Note | Add a payment description. |
| Instant Generation | Generate UPI payment QR codes instantly. |
| UPI Compatibility | Supports compatible UPI applications. |

Example UPI URI:

```text
upi://pay?pa=example@upi&pn=Example&am=100&cu=INR
```

**Note:** PXQrGen generates payment QR codes. It does not process payments or verify completed transactions.

### 🎨 QR Customization Studio

Personalize QR codes with advanced styling options.

| Customization | Description |
|---|---|
| Foreground Color | Customize QR code colors. |
| Background Color | Choose custom backgrounds. |
| Gradient Colors | Apply custom color gradients. |
| Dot Styles | Choose different QR dot patterns. |
| Corner Styles | Customize QR corner and eye patterns. |
| Center Logo | Upload a custom logo. |
| QR Size | Adjust QR code dimensions. |
| Error Correction | Configure QR error correction levels. |
| Live Preview | Preview changes instantly. |

### 📥 Export & Download

Download generated QR codes in multiple formats.

- PNG
- JPG
- SVG
- PDF
- High-resolution exports.
- Copy QR image to clipboard.
- No watermarks.

### 🔒 Privacy & Security

PXQrGen is designed with privacy in mind.

- Client-side QR code generation.
- No account registration required.
- No unnecessary personal information collection.
- No backend required for basic QR generation.
- User-provided QR content stays in the browser during normal generation.

---

## 🛠️ Technology Stack

PXQrGen is built using modern web technologies.

| Technology | Purpose |
|---|---|
| Next.js | React-based application framework. |
| TypeScript | Type-safe application development. |
| Tailwind CSS | Utility-first styling. |
| shadcn/ui | Reusable UI components. |
| Lucide Icons | Consistent interface iconography. |
| QRCode Styling | QR generation and customization. |

---

## ⚙️ Requirements

Before installing PXQrGen, ensure your environment has:

| Component | Requirement |
|---|---|
| Node.js | 20.x or higher |
| npm | Latest stable version |
| Git | Installed |
| Browser | Modern Chromium, Firefox, Safari or Edge |

---

## 🚀 Installation Guide

Follow these steps to run PXQrGen locally.

### 01. Clone the Repository

```bash
git clone https://github.com/ItzMePara9/PXQrGen.git
```

### 02. Navigate to the Project

```bash
cd PXQrGen
```

### 03. Install Dependencies

```bash
npm install
```

### 04. Start Development Server

```bash
npm run dev
```

### 05. Open in Browser

Visit:

```text
http://localhost:3000
```

PXQrGen should now be running locally.

---

## 🏗️ Build for Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 📂 Project Structure

```text
PXQrGen/
│
├── public/
│   ├── favicon.ico
│   └── assets/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── generator/
│   │   ├── customization/
│   │   └── layout/
│   │
│   ├── lib/
│   │   ├── qr-generator.ts
│   │   ├── qr-formats.ts
│   │   └── validators.ts
│   │
│   └── types/
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── README.md
└── LICENSE
```

*The structure above is a suggested organization for the project.*

---

## 🔄 How It Works

PXQrGen keeps QR generation simple and straightforward.

```text
          OPEN PXQrGen
                |
                ▼
        Select QR Code Type
                |
                ▼
        Enter Required Details
                |
                ▼
        Generate QR Code
                |
                ▼
        Customize Appearance
                |
                ▼
         Preview QR Code
                |
                ▼
        Select Export Format
                |
                ▼
          Download QR Code
```

---

## 🗺️ Roadmap

Planned improvements and upcoming features.

- [x] Project concept and design direction.
- [ ] Modern responsive interface.
- [ ] Website QR generation.
- [ ] UPI payment QR generation.
- [ ] Wi-Fi QR generation.
- [ ] WhatsApp QR generation.
- [ ] Contact and vCard QR generation.
- [ ] Social media QR generation.
- [ ] QR customization studio.
- [ ] Custom logo support.
- [ ] PNG, JPG, SVG and PDF exports.
- [ ] Clipboard image support.
- [ ] Dark and light themes.
- [ ] Mobile optimization.
- [ ] Accessibility improvements.

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome!

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add: your feature"
```

5. Push your branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea to improve PXQrGen?

Open an issue on the GitHub repository with a clear description and steps to reproduce the problem.

---

## 📄 License

PXQrGen is licensed under the **MIT License**.

You are free to:

- Use the software for personal and commercial projects.
- Modify the source code.
- Distribute copies.
- Include the software in other projects.

See the [LICENSE](LICENSE) file for complete license information.

---

<div align="center">

## ⚡ Developed by ItzMePara9

**Building tools. Creating solutions. Engineering possibilities.**

[GitHub](https://github.com/ItzMePara9)

<br>

If you find PXQrGen useful, consider giving the repository a ⭐ on GitHub.

**Made with ❤️ by ItzMePara9**

</div>
