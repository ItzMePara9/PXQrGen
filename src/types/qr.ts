export type QrCategory =
  | 'url'
  | 'upi'
  | 'wifi'
  | 'text'
  | 'whatsapp'
  | 'email'
  | 'phone'
  | 'sms'
  | 'vcard'
  | 'instagram'
  | 'youtube'
  | 'discord'
  | 'facebook'
  | 'linkedin'
  | 'location';

export type QrCategoryGroup = 'essentials' | 'payments' | 'communication' | 'social';

export interface QrCategoryMeta {
  id: QrCategory;
  label: string;
  shortLabel: string;
  group: QrCategoryGroup;
  description: string;
}

export interface QrFormState {
  url: {
    value: string;
  };
  upi: {
    vpa: string;
    payeeName: string;
    amount: string;
    note: string;
  };
  wifi: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden: boolean;
  };
  text: {
    value: string;
  };
  whatsapp: {
    phone: string;
    message: string;
  };
  email: {
    to: string;
    subject: string;
    body: string;
  };
  phone: {
    number: string;
  };
  sms: {
    number: string;
    message: string;
  };
  vcard: {
    firstName: string;
    lastName: string;
    organization: string;
    title: string;
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  instagram: {
    username: string;
  };
  youtube: {
    input: string;
  };
  discord: {
    invite: string;
  };
  facebook: {
    input: string;
  };
  linkedin: {
    profileType: 'in' | 'company';
    handle: string;
  };
  location: {
    mode: 'coords' | 'url';
    latitude: string;
    longitude: string;
    mapsUrl: string;
  };
}

export type DotStyleType =
  | 'square'
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerSquareStyleType = 'square' | 'extra-rounded' | 'dot';
export type CornerDotStyleType = 'square' | 'dot';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type ExportSize = 512 | 1024 | 2048 | 4096;
export type ExportFormat = 'png' | 'jpg' | 'svg' | 'pdf';

export interface QrStyleConfig {
  fgType: 'solid' | 'gradient';
  fgColor: string;
  gradientType: 'linear' | 'radial';
  gradientColor1: string;
  gradientColor2: string;
  gradientRotation: number;
  bgColor: string;
  bgTransparent: boolean;
  dotType: DotStyleType;
  cornerSquareType: CornerSquareStyleType;
  cornerDotType: CornerDotStyleType;
  customEyeColor: boolean;
  eyeColor: string;
  logoDataUrl: string | null;
  logoPresetId: string | null;
  logoSize: number;
  logoMargin: number;
  hideBackgroundDots: boolean;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  exportSize: ExportSize;
  exportFormat: ExportFormat;
}
