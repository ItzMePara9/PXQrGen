import type { QrCategory, QrCategoryMeta, QrFormState } from '../types/qr';

export const QR_CATEGORIES: QrCategoryMeta[] = [
  {
    id: 'url',
    label: 'Website URL',
    shortLabel: 'URL',
    group: 'essentials',
    description: 'Direct link to any webpage, landing page, or app.',
  },
  {
    id: 'upi',
    label: 'UPI Payment',
    shortLabel: 'UPI Pay',
    group: 'payments',
    description: 'Standard BHIM / GPay / PhonePe / Paytm INR payment request URI.',
  },
  {
    id: 'wifi',
    label: 'Wi-Fi Network',
    shortLabel: 'Wi-Fi',
    group: 'essentials',
    description: 'Instant wireless network credentials for guests and offices.',
  },
  {
    id: 'vcard',
    label: 'Contact / vCard',
    shortLabel: 'vCard',
    group: 'essentials',
    description: 'Save full contact details directly to a phone address book.',
  },
  {
    id: 'text',
    label: 'Plain Text',
    shortLabel: 'Text',
    group: 'essentials',
    description: 'Encode any unformatted text, serial number, or snippet.',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    shortLabel: 'WhatsApp',
    group: 'communication',
    description: 'Open a pre-filled WhatsApp chat with a phone number.',
  },
  {
    id: 'email',
    label: 'Email',
    shortLabel: 'Email',
    group: 'communication',
    description: 'Launch an email composer with recipient, subject, and body.',
  },
  {
    id: 'phone',
    label: 'Phone Number',
    shortLabel: 'Phone',
    group: 'communication',
    description: 'One-tap dial trigger for support lines and business cards.',
  },
  {
    id: 'sms',
    label: 'SMS Message',
    shortLabel: 'SMS',
    group: 'communication',
    description: 'Pre-addressed text message ready to send from mobile.',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    shortLabel: 'Instagram',
    group: 'social',
    description: 'Route scanners straight to an Instagram profile.',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    shortLabel: 'YouTube',
    group: 'social',
    description: 'Link to a YouTube channel, handle, or specific video.',
  },
  {
    id: 'discord',
    label: 'Discord',
    shortLabel: 'Discord',
    group: 'social',
    description: 'Server invite link for communities and events.',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    shortLabel: 'Facebook',
    group: 'social',
    description: 'Link to a Facebook page, profile, or event.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    shortLabel: 'LinkedIn',
    group: 'social',
    description: 'Direct link to a personal profile or company page.',
  },
  {
    id: 'location',
    label: 'Location / Maps',
    shortLabel: 'Location',
    group: 'essentials',
    description: 'GPS coordinates or Google Maps link for venues and storefronts.',
  },
];

export const INITIAL_FORM_STATE: QrFormState = {
  url: {
    value: 'https://pxqrgen.app',
  },
  upi: {
    vpa: '',
    payeeName: '',
    amount: '',
    note: '',
  },
  wifi: {
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  },
  text: {
    value: '',
  },
  whatsapp: {
    phone: '',
    message: '',
  },
  email: {
    to: '',
    subject: '',
    body: '',
  },
  phone: {
    number: '',
  },
  sms: {
    number: '',
    message: '',
  },
  vcard: {
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    phone: '',
    email: '',
    website: '',
    address: '',
  },
  instagram: {
    username: '',
  },
  youtube: {
    input: '',
  },
  discord: {
    invite: '',
  },
  facebook: {
    input: '',
  },
  linkedin: {
    profileType: 'in',
    handle: '',
  },
  location: {
    mode: 'coords',
    latitude: '',
    longitude: '',
    mapsUrl: '',
  },
};

export function getSampleDataForCategory(category: QrCategory): Partial<QrFormState> {
  switch (category) {
    case 'url':
      return { url: { value: 'https://pxqrgen.app' } };
    case 'upi':
      return {
        upi: {
          vpa: 'studio.merchants@okaxis',
          payeeName: 'PX Studio Store',
          amount: '499.00',
          note: 'Order INV-2048',
        },
      };
    case 'wifi':
      return {
        wifi: {
          ssid: 'PXStudio-Guest',
          password: 'StudioGuest2026!',
          encryption: 'WPA',
          hidden: false,
        },
      };
    case 'text':
      return {
        text: {
          value: 'PXQrGen Reference Asset #4092 — Verified Vector Output',
        },
      };
    case 'whatsapp':
      return {
        whatsapp: {
          phone: '+919876543210',
          message: 'Hi! I scanned your QR code and would like to connect.',
        },
      };
    case 'email':
      return {
        email: {
          to: 'hello@pxqrgen.app',
          subject: 'Design Collaboration Inquiry',
          body: 'Hello team, reaching out via your QR card.',
        },
      };
    case 'phone':
      return { phone: { number: '+14155550192' } };
    case 'sms':
      return {
        sms: {
          number: '+14155550192',
          message: 'RSVP YES - Guest Pass',
        },
      };
    case 'vcard':
      return {
        vcard: {
          firstName: 'Aarav',
          lastName: 'Kulkarni',
          organization: 'PX Design Systems',
          title: 'Principal Product Designer',
          phone: '+919820112233',
          email: 'aarav@pxsystems.io',
          website: 'https://pxsystems.io',
          address: 'Indiranagar, Bengaluru 560038',
        },
      };
    case 'instagram':
      return { instagram: { username: 'pxdesignstudio' } };
    case 'youtube':
      return { youtube: { input: '@pxdesignstudio' } };
    case 'discord':
      return { discord: { invite: 'px-community' } };
    case 'facebook':
      return { facebook: { input: 'pxdesignstudio' } };
    case 'linkedin':
      return { linkedin: { profileType: 'in', handle: 'aarav-kulkarni' } };
    case 'location':
      return {
        location: {
          mode: 'coords',
          latitude: '12.9716',
          longitude: '77.5946',
          mapsUrl: 'https://maps.google.com/?q=12.9716,77.5946',
        },
      };
  }
}

export interface PayloadResult {
  payload: string;
  isValid: boolean;
  errors: Record<string, string>;
  summaryTitle: string;
  summarySubtitle: string;
}

function escapeWifiField(val: string): string {
  return val.replace(/([\\;,:"])/g, '\\$1');
}

function cleanPhoneDigits(raw: string): string {
  return raw.replace(/[^\d+]/g, '');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function isValidUrl(input: string): boolean {
  try {
    const u = new URL(input);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function buildQrPayload(
  category: QrCategory,
  state: QrFormState
): PayloadResult {
  const errors: Record<string, string> = {};

  switch (category) {
    case 'url': {
      const raw = state.url.value.trim();
      if (!raw) {
        errors.value = 'Enter a website URL.';
        return { payload: '', isValid: false, errors, summaryTitle: 'Website URL', summarySubtitle: '' };
      }
      const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
      if (!isValidUrl(normalized) || !normalized.includes('.')) {
        errors.value = 'Enter a valid domain or URL (e.g. https://example.com).';
        return { payload: '', isValid: false, errors, summaryTitle: 'Website URL', summarySubtitle: '' };
      }
      return {
        payload: normalized,
        isValid: true,
        errors,
        summaryTitle: 'Website Link',
        summarySubtitle: normalized.replace(/^https?:\/\//i, ''),
      };
    }

    case 'upi': {
      const vpa = state.upi.vpa.trim();
      const payeeName = state.upi.payeeName.trim();
      const amount = state.upi.amount.trim();
      const note = state.upi.note.trim();

      if (!vpa) {
        errors.vpa = 'UPI ID / VPA is required (e.g. name@bank).';
      } else if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z0-9.\-_]{2,64}$/.test(vpa)) {
        errors.vpa = 'Enter a valid UPI ID (e.g. merchant@okaxis).';
      }

      if (!payeeName) {
        errors.payeeName = 'Payee name is required.';
      }

      if (amount) {
        if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
          errors.amount = 'Enter a valid amount (up to 2 decimal places).';
        } else if (parseFloat(amount) <= 0) {
          errors.amount = 'Amount must be greater than ₹0.';
        } else if (parseFloat(amount) > 100000) {
          errors.amount = 'Standard UPI single-transaction cap is ₹1,00,000.';
        }
      }

      if (note.length > 50) {
        errors.note = 'Transaction note cannot exceed 50 characters.';
      }

      if (Object.keys(errors).length > 0) {
        return {
          payload: '',
          isValid: false,
          errors,
          summaryTitle: 'UPI Payment QR',
          summarySubtitle: vpa || 'Incomplete UPI parameters',
        };
      }

      const params: string[] = [
        `pa=${encodeURIComponent(vpa).replace(/%40/g, '@')}`,
        `pn=${encodeURIComponent(payeeName)}`,
      ];
      if (amount) {
        params.push(`am=${encodeURIComponent(parseFloat(amount).toString())}`);
      }
      if (note) {
        params.push(`tn=${encodeURIComponent(note)}`);
      }
      params.push('cu=INR');

      const uri = `upi://pay?${params.join('&')}`;
      return {
        payload: uri,
        isValid: true,
        errors,
        summaryTitle: payeeName,
        summarySubtitle: amount ? `${vpa} · ₹${Number(amount).toLocaleString('en-IN')}` : vpa,
      };
    }

    case 'wifi': {
      const ssid = state.wifi.ssid.trim();
      const password = state.wifi.password;
      if (!ssid) {
        errors.ssid = 'Network SSID is required.';
      }
      if (state.wifi.encryption !== 'nopass' && password.length === 0) {
        errors.password = 'Enter a Wi-Fi password or select "None (Open)".';
      } else if (state.wifi.encryption === 'WPA' && password.length > 0 && password.length < 8) {
        errors.password = 'WPA/WPA2 passwords require at least 8 characters.';
      }
      if (Object.keys(errors).length > 0) {
        return { payload: '', isValid: false, errors, summaryTitle: 'Wi-Fi Network', summarySubtitle: '' };
      }

      const escapedSsid = escapeWifiField(ssid);
      const escapedPass = state.wifi.encryption === 'nopass' ? '' : escapeWifiField(password);
      const payload = `WIFI:T:${state.wifi.encryption};S:${escapedSsid};P:${escapedPass};H:${state.wifi.hidden ? 'true' : 'false'};;`;
      return {
        payload,
        isValid: true,
        errors,
        summaryTitle: `Wi-Fi: ${ssid}`,
        summarySubtitle: state.wifi.encryption === 'nopass' ? 'Open Network' : `${state.wifi.encryption} Protected`,
      };
    }

    case 'text': {
      const text = state.text.value.trim();
      if (!text) {
        errors.value = 'Enter text content to encode.';
      } else if (text.length > 2000) {
        errors.value = 'Keep text under 2,000 characters for reliable scanning.';
      }
      if (Object.keys(errors).length > 0) {
        return { payload: '', isValid: false, errors, summaryTitle: 'Plain Text', summarySubtitle: '' };
      }
      return {
        payload: text,
        isValid: true,
        errors,
        summaryTitle: 'Plain Text',
        summarySubtitle: `${text.length} characters`,
      };
    }

    case 'whatsapp': {
      const digits = state.whatsapp.phone.replace(/\D/g, '');
      if (!digits) {
        errors.phone = 'Enter a WhatsApp phone number with country code.';
      } else if (digits.length < 7 || digits.length > 15) {
        errors.phone = 'Enter 7–15 digits including country code (e.g. 919876543210).';
      }
      if (Object.keys(errors).length > 0) {
        return { payload: '', isValid: false, errors, summaryTitle: 'WhatsApp Chat', summarySubtitle: '' };
      }
      const msg = state.whatsapp.message.trim();
      const payload = msg
        ? `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`
        : `https://wa.me/${digits}`;
      return {
        payload,
        isValid: true,
        errors,
        summaryTitle: 'WhatsApp',
        summarySubtitle: `+${digits}`,
      };
    }

    case 'email': {
      const to = state.email.to.trim();
      if (!to) {
        errors.to = 'Recipient email address is required.';
      } else if (!isValidEmail(to)) {
        errors.to = 'Enter a valid email address.';
      }
      if (Object.keys(errors).length > 0) {
        return { payload: '', isValid: false, errors, summaryTitle: 'Email', summarySubtitle: '' };
      }
      const queryParts: string[] = [];
      if (state.email.subject.trim()) {
        queryParts.push(`subject=${encodeURIComponent(state.email.subject.trim())}`);
      }
      if (state.email.body.trim()) {
        queryParts.push(`body=${encodeURIComponent(state.email.body.trim())}`);
      }
      const payload = queryParts.length > 0 ? `mailto:${to}?${queryParts.join('&')}` : `mailto:${to}`;
      return {
        payload,
        isValid: true,
        errors,
        summaryTitle: 'Email',
        summarySubtitle: to,
      };
    }

    case 'phone': {
      const cleaned = cleanPhoneDigits(state.phone.number.trim());
      const digitsOnly = cleaned.replace(/\D/g, '');
      if (!digitsOnly) {
        errors.number = 'Enter a phone number.';
      } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        errors.number = 'Enter a valid 7–15 digit phone number.';
      }
      if (Object.keys(errors).length > 0) {
        return { payload: '', isValid: false, errors, summaryTitle: 'Phone Call', summarySubtitle: '' };
      }
      return {
        payload: `tel:${cleaned}`,
        isValid: true,
        errors,
        summaryTitle: 'Phone Number',
        summarySubtitle: cleaned,
      };
    }

    case 'sms': {
      const cleaned = cleanPhoneDigits(state.sms.number.trim());
      const digitsOnly = cleaned.replace(/\D/g, '');
      if (!digitsOnly) {
        errors.number = 'Enter a recipient phone number.';
      } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        errors.number = 'Enter a valid 7–15 digit phone number.';
      }
      if (Object.keys(errors).length > 0) {
        return { payload: '', isValid: false, errors, summaryTitle: 'SMS Message', summarySubtitle: '' };
      }
      const msg = state.sms.message.trim();
      const payload = msg ? `sms:${cleaned}?body=${encodeURIComponent(msg)}` : `sms:${cleaned}`;
      return {
        payload,
        isValid: true,
        errors,
        summaryTitle: 'SMS',
        summarySubtitle: cleaned,
      };
    }

    case 'vcard': {
      const v = state.vcard;
      if (!v.firstName.trim() && !v.lastName.trim() && !v.organization.trim()) {
        errors.firstName = 'Enter at least a first name or organization.';
      }
      if (v.email.trim() && !isValidEmail(v.email.trim())) {
        errors.email = 'Enter a valid email address.';
      }
      if (v.website.trim()) {
        const w = /^https?:\/\//i.test(v.website.trim()) ? v.website.trim() : `https://${v.website.trim()}`;
        if (!isValidUrl(w)) {
          errors.website = 'Enter a valid website URL.';
        }
      }
      if (Object.keys(errors).length > 0) {
        return { payload: '', isValid: false, errors, summaryTitle: 'Contact vCard', summarySubtitle: '' };
      }
      const fullName = [v.firstName.trim(), v.lastName.trim()].filter(Boolean).join(' ') || v.organization.trim();
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName.trim()};${v.firstName.trim()};;;`,
        `FN:${fullName}`,
      ];
      if (v.organization.trim()) lines.push(`ORG:${v.organization.trim()}`);
      if (v.title.trim()) lines.push(`TITLE:${v.title.trim()}`);
      if (v.phone.trim()) lines.push(`TEL;TYPE=CELL:${cleanPhoneDigits(v.phone.trim())}`);
      if (v.email.trim()) lines.push(`EMAIL;TYPE=INTERNET:${v.email.trim()}`);
      if (v.website.trim()) {
        const w = /^https?:\/\//i.test(v.website.trim()) ? v.website.trim() : `https://${v.website.trim()}`;
        lines.push(`URL:${w}`);
      }
      if (v.address.trim()) lines.push(`ADR;TYPE=WORK:;;${v.address.trim()};;;;`);
      lines.push('END:VCARD');
      return {
        payload: lines.join('\n'),
        isValid: true,
        errors,
        summaryTitle: fullName,
        summarySubtitle: v.organization.trim() || v.phone.trim() || 'vCard 3.0',
      };
    }

    case 'instagram': {
      const raw = state.instagram.username.trim();
      if (!raw) {
        errors.username = 'Enter an Instagram username or profile URL.';
        return { payload: '', isValid: false, errors, summaryTitle: 'Instagram', summarySubtitle: '' };
      }
      let handle = raw;
      if (/instagram\.com/i.test(raw)) {
        const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
        if (!isValidUrl(normalized)) {
          errors.username = 'Enter a valid Instagram URL or handle.';
          return { payload: '', isValid: false, errors, summaryTitle: 'Instagram', summarySubtitle: '' };
        }
        return {
          payload: normalized,
          isValid: true,
          errors,
          summaryTitle: 'Instagram',
          summarySubtitle: normalized.replace(/^https?:\/\/(www\.)?/i, ''),
        };
      }
      handle = handle.replace(/^@/, '').replace(/\/+$/, '');
      if (!/^[a-zA-Z0-9._]{1,30}$/.test(handle)) {
        errors.username = 'Usernames may only contain letters, numbers, periods, and underscores.';
        return { payload: '', isValid: false, errors, summaryTitle: 'Instagram', summarySubtitle: '' };
      }
      return {
        payload: `https://www.instagram.com/${handle}/`,
        isValid: true,
        errors,
        summaryTitle: 'Instagram',
        summarySubtitle: `@${handle}`,
      };
    }

    case 'youtube': {
      const raw = state.youtube.input.trim();
      if (!raw) {
        errors.input = 'Enter a YouTube @handle, channel URL, or video URL.';
        return { payload: '', isValid: false, errors, summaryTitle: 'YouTube', summarySubtitle: '' };
      }
      if (/youtu\.be|youtube\.com/i.test(raw)) {
        const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
        if (!isValidUrl(normalized)) {
          errors.input = 'Enter a valid YouTube URL.';
          return { payload: '', isValid: false, errors, summaryTitle: 'YouTube', summarySubtitle: '' };
        }
        return {
          payload: normalized,
          isValid: true,
          errors,
          summaryTitle: 'YouTube',
          summarySubtitle: normalized.replace(/^https?:\/\/(www\.)?/i, ''),
        };
      }
      const handle = raw.startsWith('@') ? raw : `@${raw.replace(/^@/, '')}`;
      if (!/^@[a-zA-Z0-9._-]{2,40}$/.test(handle)) {
        errors.input = 'Enter a valid YouTube @handle or full YouTube URL.';
        return { payload: '', isValid: false, errors, summaryTitle: 'YouTube', summarySubtitle: '' };
      }
      return {
        payload: `https://www.youtube.com/${handle}`,
        isValid: true,
        errors,
        summaryTitle: 'YouTube',
        summarySubtitle: handle,
      };
    }

    case 'discord': {
      const raw = state.discord.invite.trim();
      if (!raw) {
        errors.invite = 'Enter a Discord invite code or URL.';
        return { payload: '', isValid: false, errors, summaryTitle: 'Discord', summarySubtitle: '' };
      }
      if (/discord\.(gg|com)/i.test(raw)) {
        const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
        if (!isValidUrl(normalized)) {
          errors.invite = 'Enter a valid Discord invite URL.';
          return { payload: '', isValid: false, errors, summaryTitle: 'Discord', summarySubtitle: '' };
        }
        return {
          payload: normalized,
          isValid: true,
          errors,
          summaryTitle: 'Discord',
          summarySubtitle: normalized.replace(/^https?:\/\//i, ''),
        };
      }
      const code = raw.replace(/^\/+/, '');
      if (!/^[a-zA-Z0-9-]{2,32}$/.test(code)) {
        errors.invite = 'Enter a valid invite code (e.g. px-community) or discord.gg URL.';
        return { payload: '', isValid: false, errors, summaryTitle: 'Discord', summarySubtitle: '' };
      }
      return {
        payload: `https://discord.gg/${code}`,
        isValid: true,
        errors,
        summaryTitle: 'Discord Invite',
        summarySubtitle: `discord.gg/${code}`,
      };
    }

    case 'facebook': {
      const raw = state.facebook.input.trim();
      if (!raw) {
        errors.input = 'Enter a Facebook page username or URL.';
        return { payload: '', isValid: false, errors, summaryTitle: 'Facebook', summarySubtitle: '' };
      }
      if (/facebook\.com|fb\.com/i.test(raw)) {
        const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
        if (!isValidUrl(normalized)) {
          errors.input = 'Enter a valid Facebook URL.';
          return { payload: '', isValid: false, errors, summaryTitle: 'Facebook', summarySubtitle: '' };
        }
        return {
          payload: normalized,
          isValid: true,
          errors,
          summaryTitle: 'Facebook',
          summarySubtitle: normalized.replace(/^https?:\/\/(www\.)?/i, ''),
        };
      }
      const clean = raw.replace(/^@/, '').replace(/\/+$/, '');
      if (!/^[a-zA-Z0-9.]{3,50}$/.test(clean)) {
        errors.input = 'Enter a valid Facebook username or full URL.';
        return { payload: '', isValid: false, errors, summaryTitle: 'Facebook', summarySubtitle: '' };
      }
      return {
        payload: `https://www.facebook.com/${clean}`,
        isValid: true,
        errors,
        summaryTitle: 'Facebook',
        summarySubtitle: `facebook.com/${clean}`,
      };
    }

    case 'linkedin': {
      const raw = state.linkedin.handle.trim();
      if (!raw) {
        errors.handle = 'Enter a LinkedIn handle or profile URL.';
        return { payload: '', isValid: false, errors, summaryTitle: 'LinkedIn', summarySubtitle: '' };
      }
      if (/linkedin\.com/i.test(raw)) {
        const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
        if (!isValidUrl(normalized)) {
          errors.handle = 'Enter a valid LinkedIn URL.';
          return { payload: '', isValid: false, errors, summaryTitle: 'LinkedIn', summarySubtitle: '' };
        }
        return {
          payload: normalized,
          isValid: true,
          errors,
          summaryTitle: 'LinkedIn',
          summarySubtitle: normalized.replace(/^https?:\/\/(www\.)?/i, ''),
        };
      }
      const clean = raw.replace(/^\/+|\/+$/g, '');
      if (!/^[a-zA-Z0-9-_%]{2,100}$/.test(clean)) {
        errors.handle = 'Enter a valid LinkedIn slug (e.g. aarav-kulkarni).';
        return { payload: '', isValid: false, errors, summaryTitle: 'LinkedIn', summarySubtitle: '' };
      }
      const prefix = state.linkedin.profileType === 'company' ? 'company' : 'in';
      return {
        payload: `https://www.linkedin.com/${prefix}/${clean}`,
        isValid: true,
        errors,
        summaryTitle: 'LinkedIn',
        summarySubtitle: `/${prefix}/${clean}`,
      };
    }

    case 'location': {
      if (state.location.mode === 'url') {
        const raw = state.location.mapsUrl.trim();
        if (!raw) {
          errors.mapsUrl = 'Paste a Google Maps URL.';
          return { payload: '', isValid: false, errors, summaryTitle: 'Location', summarySubtitle: '' };
        }
        const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
        if (!isValidUrl(normalized)) {
          errors.mapsUrl = 'Enter a valid Google Maps link.';
          return { payload: '', isValid: false, errors, summaryTitle: 'Location', summarySubtitle: '' };
        }
        return {
          payload: normalized,
          isValid: true,
          errors,
          summaryTitle: 'Google Maps Location',
          summarySubtitle: normalized.replace(/^https?:\/\//i, ''),
        };
      }

      const latRaw = state.location.latitude.trim();
      const lngRaw = state.location.longitude.trim();
      const lat = Number(latRaw);
      const lng = Number(lngRaw);

      if (!latRaw || Number.isNaN(lat) || lat < -90 || lat > 90) {
        errors.latitude = 'Latitude must be between -90 and 90.';
      }
      if (!lngRaw || Number.isNaN(lng) || lng < -180 || lng > 180) {
        errors.longitude = 'Longitude must be between -180 and 180.';
      }
      if (Object.keys(errors).length > 0) {
        return { payload: '', isValid: false, errors, summaryTitle: 'Location', summarySubtitle: '' };
      }
      const url = `https://maps.google.com/?q=${lat},${lng}`;
      return {
        payload: url,
        isValid: true,
        errors,
        summaryTitle: 'GPS Coordinates',
        summarySubtitle: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      };
    }
  }
}
