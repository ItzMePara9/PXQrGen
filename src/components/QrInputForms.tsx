import { AlertCircle, Eye, EyeOff, Info, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { QrCategory, QrFormState } from '../types/qr';
import { QR_CATEGORIES } from '../utils/qrPayload';

interface QrInputFormsProps {
  category: QrCategory;
  formState: QrFormState;
  errors: Record<string, string>;
  upiPreviewUri: string;
  onUpdateField: <K extends QrCategory>(
    cat: K,
    patch: Partial<QrFormState[K]>
  ) => void;
  onLoadSample: (cat: QrCategory) => void;
  onClearCategory: (cat: QrCategory) => void;
}

const INPUT_BASE =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-zinc-900/90 dark:text-zinc-100 dark:placeholder:text-zinc-500';

const INPUT_NORMAL =
  'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700';

const INPUT_ERROR =
  'border-red-500/80 dark:border-red-500/70 focus-visible:ring-red-500';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required,
  hint,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-2">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-indigo-500 dark:text-indigo-400">*</span>
        )}
      </label>
      {hint && (
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
          {hint}
        </span>
      )}
    </div>
  );
}

export function QrInputForms({
  category,
  formState,
  errors,
  upiPreviewUri,
  onUpdateField,
  onLoadSample,
  onClearCategory,
}: QrInputFormsProps) {
  const [showWifiPass, setShowWifiPass] = useState(false);
  const meta = QR_CATEGORIES.find((c) => c.id === category)!;

  return (
    <div className="pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-display">
            {meta.label}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {meta.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onLoadSample(category)}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
            Fill Sample
          </button>
          <button
            type="button"
            onClick={() => onClearCategory(category)}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* 1. Website URL */}
      {category === 'url' && (
        <div>
          <FieldLabel htmlFor="qr-url" label="Destination URL" required />
          <input
            id="qr-url"
            type="url"
            value={formState.url.value}
            onChange={(e) => onUpdateField('url', { value: e.target.value })}
            placeholder="https://example.com"
            aria-invalid={Boolean(errors.value)}
            className={`${INPUT_BASE} ${errors.value ? INPUT_ERROR : INPUT_NORMAL}`}
          />
          <FieldError message={errors.value} />
        </div>
      )}

      {/* 2. UPI Payment */}
      {category === 'upi' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel
                htmlFor="upi-vpa"
                label="UPI ID / VPA"
                required
                hint="e.g. name@okaxis"
              />
              <input
                id="upi-vpa"
                type="text"
                value={formState.upi.vpa}
                onChange={(e) => onUpdateField('upi', { vpa: e.target.value })}
                placeholder="merchant@okicici"
                aria-invalid={Boolean(errors.vpa)}
                className={`${INPUT_BASE} font-mono ${errors.vpa ? INPUT_ERROR : INPUT_NORMAL}`}
              />
              <FieldError message={errors.vpa} />
            </div>

            <div>
              <FieldLabel htmlFor="upi-name" label="Payee Name" required />
              <input
                id="upi-name"
                type="text"
                value={formState.upi.payeeName}
                onChange={(e) =>
                  onUpdateField('upi', { payeeName: e.target.value })
                }
                placeholder="Merchant or Recipient Name"
                aria-invalid={Boolean(errors.payeeName)}
                className={`${INPUT_BASE} ${errors.payeeName ? INPUT_ERROR : INPUT_NORMAL}`}
              />
              <FieldError message={errors.payeeName} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel
                htmlFor="upi-amount"
                label="Amount (INR)"
                hint="Optional"
              />
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm font-medium text-zinc-400">
                  ₹
                </span>
                <input
                  id="upi-amount"
                  type="text"
                  inputMode="decimal"
                  value={formState.upi.amount}
                  onChange={(e) =>
                    onUpdateField('upi', { amount: e.target.value })
                  }
                  placeholder="0.00"
                  aria-invalid={Boolean(errors.amount)}
                  className={`${INPUT_BASE} pl-8 tabular-nums ${
                    errors.amount ? INPUT_ERROR : INPUT_NORMAL
                  }`}
                />
              </div>
              <FieldError message={errors.amount} />
            </div>

            <div>
              <FieldLabel
                htmlFor="upi-note"
                label="Transaction Note"
                hint={`${formState.upi.note.length}/50`}
              />
              <input
                id="upi-note"
                type="text"
                maxLength={50}
                value={formState.upi.note}
                onChange={(e) => onUpdateField('upi', { note: e.target.value })}
                placeholder="Invoice #1042 or reference"
                aria-invalid={Boolean(errors.note)}
                className={`${INPUT_BASE} ${errors.note ? INPUT_ERROR : INPUT_NORMAL}`}
              />
              <FieldError message={errors.note} />
            </div>
          </div>

          {upiPreviewUri && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/70">
              <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Generated UPI Payment URI
              </div>
              <code className="mt-1 block break-all text-xs text-zinc-800 dark:text-zinc-200">
                {upiPreviewUri}
              </code>
            </div>
          )}

          <div className="flex items-start gap-2 rounded-lg border border-zinc-200/80 bg-zinc-50/70 px-3.5 py-2.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
            <span>
              This generates a standard UPI payment request QR code only. No payment is
              processed, confirmed, or marked complete by PXQrGen.
            </span>
          </div>
        </div>
      )}

      {/* 3. Wi-Fi */}
      {category === 'wifi' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="wifi-ssid" label="Network Name (SSID)" required />
              <input
                id="wifi-ssid"
                type="text"
                value={formState.wifi.ssid}
                onChange={(e) => onUpdateField('wifi', { ssid: e.target.value })}
                placeholder="Office-Guest-5G"
                aria-invalid={Boolean(errors.ssid)}
                className={`${INPUT_BASE} ${errors.ssid ? INPUT_ERROR : INPUT_NORMAL}`}
              />
              <FieldError message={errors.ssid} />
            </div>

            <div>
              <FieldLabel htmlFor="wifi-enc" label="Security Protocol" />
              <select
                id="wifi-enc"
                value={formState.wifi.encryption}
                onChange={(e) =>
                  onUpdateField('wifi', {
                    encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
                  })
                }
                className={`${INPUT_BASE} ${INPUT_NORMAL}`}
              >
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP (Legacy)</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </div>
          </div>

          {formState.wifi.encryption !== 'nopass' && (
            <div>
              <FieldLabel htmlFor="wifi-pass" label="Password" required />
              <div className="relative">
                <input
                  id="wifi-pass"
                  type={showWifiPass ? 'text' : 'password'}
                  value={formState.wifi.password}
                  onChange={(e) =>
                    onUpdateField('wifi', { password: e.target.value })
                  }
                  placeholder="Enter wireless password"
                  aria-invalid={Boolean(errors.password)}
                  className={`${INPUT_BASE} pr-10 ${
                    errors.password ? INPUT_ERROR : INPUT_NORMAL
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowWifiPass((s) => !s)}
                  aria-label={showWifiPass ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-2 flex items-center px-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                >
                  {showWifiPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <FieldError message={errors.password} />
            </div>
          )}

          <label className="flex items-center gap-2.5 text-xs text-zinc-600 dark:text-zinc-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formState.wifi.hidden}
              onChange={(e) => onUpdateField('wifi', { hidden: e.target.checked })}
              className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
            />
            Hidden SSID (network does not broadcast name)
          </label>
        </div>
      )}

      {/* 4. Plain Text */}
      {category === 'text' && (
        <div>
          <FieldLabel
            htmlFor="qr-text"
            label="Text Content"
            required
            hint={`${formState.text.value.length}/2000`}
          />
          <textarea
            id="qr-text"
            rows={4}
            value={formState.text.value}
            onChange={(e) => onUpdateField('text', { value: e.target.value })}
            placeholder="Enter plain text, notes, or identifier codes..."
            aria-invalid={Boolean(errors.value)}
            className={`${INPUT_BASE} resize-y ${
              errors.value ? INPUT_ERROR : INPUT_NORMAL
            }`}
          />
          <FieldError message={errors.value} />
        </div>
      )}

      {/* 5. WhatsApp */}
      {category === 'whatsapp' && (
        <div className="space-y-4">
          <div>
            <FieldLabel
              htmlFor="wa-phone"
              label="WhatsApp Number (with country code)"
              required
              hint="e.g. +91 98765 43210"
            />
            <input
              id="wa-phone"
              type="tel"
              value={formState.whatsapp.phone}
              onChange={(e) => onUpdateField('whatsapp', { phone: e.target.value })}
              placeholder="+91 98765 43210"
              aria-invalid={Boolean(errors.phone)}
              className={`${INPUT_BASE} tabular-nums ${
                errors.phone ? INPUT_ERROR : INPUT_NORMAL
              }`}
            />
            <FieldError message={errors.phone} />
          </div>

          <div>
            <FieldLabel htmlFor="wa-msg" label="Pre-filled Message" hint="Optional" />
            <textarea
              id="wa-msg"
              rows={3}
              value={formState.whatsapp.message}
              onChange={(e) =>
                onUpdateField('whatsapp', { message: e.target.value })
              }
              placeholder="Hi, I would like more information..."
              className={`${INPUT_BASE} ${INPUT_NORMAL} resize-y`}
            />
          </div>
        </div>
      )}

      {/* 6. Email */}
      {category === 'email' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="email-to" label="Recipient Email" required />
              <input
                id="email-to"
                type="email"
                value={formState.email.to}
                onChange={(e) => onUpdateField('email', { to: e.target.value })}
                placeholder="contact@company.com"
                aria-invalid={Boolean(errors.to)}
                className={`${INPUT_BASE} ${errors.to ? INPUT_ERROR : INPUT_NORMAL}`}
              />
              <FieldError message={errors.to} />
            </div>

            <div>
              <FieldLabel htmlFor="email-subject" label="Subject" hint="Optional" />
              <input
                id="email-subject"
                type="text"
                value={formState.email.subject}
                onChange={(e) =>
                  onUpdateField('email', { subject: e.target.value })
                }
                placeholder="Project Inquiry"
                className={`${INPUT_BASE} ${INPUT_NORMAL}`}
              />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="email-body" label="Message Body" hint="Optional" />
            <textarea
              id="email-body"
              rows={3}
              value={formState.email.body}
              onChange={(e) => onUpdateField('email', { body: e.target.value })}
              placeholder="Write a default email message..."
              className={`${INPUT_BASE} ${INPUT_NORMAL} resize-y`}
            />
          </div>
        </div>
      )}

      {/* 7. Phone Number */}
      {category === 'phone' && (
        <div>
          <FieldLabel
            htmlFor="phone-num"
            label="Phone Number"
            required
            hint="Include country code for international callers"
          />
          <input
            id="phone-num"
            type="tel"
            value={formState.phone.number}
            onChange={(e) => onUpdateField('phone', { number: e.target.value })}
            placeholder="+1 415 555 0192"
            aria-invalid={Boolean(errors.number)}
            className={`${INPUT_BASE} tabular-nums ${
              errors.number ? INPUT_ERROR : INPUT_NORMAL
            }`}
          />
          <FieldError message={errors.number} />
        </div>
      )}

      {/* 8. SMS */}
      {category === 'sms' && (
        <div className="space-y-4">
          <div>
            <FieldLabel htmlFor="sms-num" label="Recipient Phone Number" required />
            <input
              id="sms-num"
              type="tel"
              value={formState.sms.number}
              onChange={(e) => onUpdateField('sms', { number: e.target.value })}
              placeholder="+1 415 555 0192"
              aria-invalid={Boolean(errors.number)}
              className={`${INPUT_BASE} tabular-nums ${
                errors.number ? INPUT_ERROR : INPUT_NORMAL
              }`}
            />
            <FieldError message={errors.number} />
          </div>

          <div>
            <FieldLabel htmlFor="sms-msg" label="Text Message" hint="Optional" />
            <textarea
              id="sms-msg"
              rows={3}
              value={formState.sms.message}
              onChange={(e) => onUpdateField('sms', { message: e.target.value })}
              placeholder="Pre-filled SMS text..."
              className={`${INPUT_BASE} ${INPUT_NORMAL} resize-y`}
            />
          </div>
        </div>
      )}

      {/* 9. Contact / vCard */}
      {category === 'vcard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="vc-first" label="First Name" required />
              <input
                id="vc-first"
                type="text"
                value={formState.vcard.firstName}
                onChange={(e) =>
                  onUpdateField('vcard', { firstName: e.target.value })
                }
                placeholder="Aarav"
                aria-invalid={Boolean(errors.firstName)}
                className={`${INPUT_BASE} ${
                  errors.firstName ? INPUT_ERROR : INPUT_NORMAL
                }`}
              />
              <FieldError message={errors.firstName} />
            </div>

            <div>
              <FieldLabel htmlFor="vc-last" label="Last Name" />
              <input
                id="vc-last"
                type="text"
                value={formState.vcard.lastName}
                onChange={(e) =>
                  onUpdateField('vcard', { lastName: e.target.value })
                }
                placeholder="Kulkarni"
                className={`${INPUT_BASE} ${INPUT_NORMAL}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="vc-org" label="Organization" />
              <input
                id="vc-org"
                type="text"
                value={formState.vcard.organization}
                onChange={(e) =>
                  onUpdateField('vcard', { organization: e.target.value })
                }
                placeholder="Acme Studio"
                className={`${INPUT_BASE} ${INPUT_NORMAL}`}
              />
            </div>

            <div>
              <FieldLabel htmlFor="vc-title" label="Job Title" />
              <input
                id="vc-title"
                type="text"
                value={formState.vcard.title}
                onChange={(e) =>
                  onUpdateField('vcard', { title: e.target.value })
                }
                placeholder="Product Lead"
                className={`${INPUT_BASE} ${INPUT_NORMAL}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="vc-phone" label="Mobile Phone" />
              <input
                id="vc-phone"
                type="tel"
                value={formState.vcard.phone}
                onChange={(e) =>
                  onUpdateField('vcard', { phone: e.target.value })
                }
                placeholder="+91 98201 12233"
                className={`${INPUT_BASE} tabular-nums ${INPUT_NORMAL}`}
              />
            </div>

            <div>
              <FieldLabel htmlFor="vc-email" label="Email" />
              <input
                id="vc-email"
                type="email"
                value={formState.vcard.email}
                onChange={(e) =>
                  onUpdateField('vcard', { email: e.target.value })
                }
                placeholder="name@company.com"
                aria-invalid={Boolean(errors.email)}
                className={`${INPUT_BASE} ${
                  errors.email ? INPUT_ERROR : INPUT_NORMAL
                }`}
              />
              <FieldError message={errors.email} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="vc-web" label="Website" />
              <input
                id="vc-web"
                type="url"
                value={formState.vcard.website}
                onChange={(e) =>
                  onUpdateField('vcard', { website: e.target.value })
                }
                placeholder="https://company.com"
                aria-invalid={Boolean(errors.website)}
                className={`${INPUT_BASE} ${
                  errors.website ? INPUT_ERROR : INPUT_NORMAL
                }`}
              />
              <FieldError message={errors.website} />
            </div>

            <div>
              <FieldLabel htmlFor="vc-addr" label="Address" />
              <input
                id="vc-addr"
                type="text"
                value={formState.vcard.address}
                onChange={(e) =>
                  onUpdateField('vcard', { address: e.target.value })
                }
                placeholder="City, Country"
                className={`${INPUT_BASE} ${INPUT_NORMAL}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 10. Instagram */}
      {category === 'instagram' && (
        <div>
          <FieldLabel
            htmlFor="ig-user"
            label="Instagram Username or Profile URL"
            required
          />
          <input
            id="ig-user"
            type="text"
            value={formState.instagram.username}
            onChange={(e) =>
              onUpdateField('instagram', { username: e.target.value })
            }
            placeholder="@username or https://instagram.com/username"
            aria-invalid={Boolean(errors.username)}
            className={`${INPUT_BASE} ${
              errors.username ? INPUT_ERROR : INPUT_NORMAL
            }`}
          />
          <FieldError message={errors.username} />
        </div>
      )}

      {/* 11. YouTube */}
      {category === 'youtube' && (
        <div>
          <FieldLabel
            htmlFor="yt-input"
            label="YouTube @Handle, Channel URL, or Video URL"
            required
          />
          <input
            id="yt-input"
            type="text"
            value={formState.youtube.input}
            onChange={(e) => onUpdateField('youtube', { input: e.target.value })}
            placeholder="@channelhandle or https://youtube.com/watch?v=..."
            aria-invalid={Boolean(errors.input)}
            className={`${INPUT_BASE} ${errors.input ? INPUT_ERROR : INPUT_NORMAL}`}
          />
          <FieldError message={errors.input} />
        </div>
      )}

      {/* 12. Discord */}
      {category === 'discord' && (
        <div>
          <FieldLabel
            htmlFor="dc-invite"
            label="Discord Invite Code or URL"
            required
          />
          <input
            id="dc-invite"
            type="text"
            value={formState.discord.invite}
            onChange={(e) =>
              onUpdateField('discord', { invite: e.target.value })
            }
            placeholder="invite-code or https://discord.gg/invite-code"
            aria-invalid={Boolean(errors.invite)}
            className={`${INPUT_BASE} ${
              errors.invite ? INPUT_ERROR : INPUT_NORMAL
            }`}
          />
          <FieldError message={errors.invite} />
        </div>
      )}

      {/* 13. Facebook */}
      {category === 'facebook' && (
        <div>
          <FieldLabel
            htmlFor="fb-input"
            label="Facebook Page Username or URL"
            required
          />
          <input
            id="fb-input"
            type="text"
            value={formState.facebook.input}
            onChange={(e) =>
              onUpdateField('facebook', { input: e.target.value })
            }
            placeholder="pagename or https://facebook.com/pagename"
            aria-invalid={Boolean(errors.input)}
            className={`${INPUT_BASE} ${errors.input ? INPUT_ERROR : INPUT_NORMAL}`}
          />
          <FieldError message={errors.input} />
        </div>
      )}

      {/* 14. LinkedIn */}
      {category === 'linkedin' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onUpdateField('linkedin', { profileType: 'in' })}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                formState.linkedin.profileType === 'in'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              Personal (/in/)
            </button>
            <button
              type="button"
              onClick={() =>
                onUpdateField('linkedin', { profileType: 'company' })
              }
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                formState.linkedin.profileType === 'company'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              Company (/company/)
            </button>
          </div>

          <div>
            <FieldLabel
              htmlFor="li-handle"
              label="LinkedIn Handle or Full Profile URL"
              required
            />
            <input
              id="li-handle"
              type="text"
              value={formState.linkedin.handle}
              onChange={(e) =>
                onUpdateField('linkedin', { handle: e.target.value })
              }
              placeholder="aarav-kulkarni or https://linkedin.com/in/..."
              aria-invalid={Boolean(errors.handle)}
              className={`${INPUT_BASE} ${
                errors.handle ? INPUT_ERROR : INPUT_NORMAL
              }`}
            />
            <FieldError message={errors.handle} />
          </div>
        </div>
      )}

      {/* 15. Location / Google Maps URL */}
      {category === 'location' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onUpdateField('location', { mode: 'coords' })}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                formState.location.mode === 'coords'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              Coordinates (Lat / Lng)
            </button>
            <button
              type="button"
              onClick={() => onUpdateField('location', { mode: 'url' })}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                formState.location.mode === 'url'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              Google Maps URL
            </button>
          </div>

          {formState.location.mode === 'coords' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel
                  htmlFor="loc-lat"
                  label="Latitude"
                  required
                  hint="-90 to 90"
                />
                <input
                  id="loc-lat"
                  type="text"
                  inputMode="decimal"
                  value={formState.location.latitude}
                  onChange={(e) =>
                    onUpdateField('location', { latitude: e.target.value })
                  }
                  placeholder="12.9716"
                  aria-invalid={Boolean(errors.latitude)}
                  className={`${INPUT_BASE} tabular-nums ${
                    errors.latitude ? INPUT_ERROR : INPUT_NORMAL
                  }`}
                />
                <FieldError message={errors.latitude} />
              </div>

              <div>
                <FieldLabel
                  htmlFor="loc-lng"
                  label="Longitude"
                  required
                  hint="-180 to 180"
                />
                <input
                  id="loc-lng"
                  type="text"
                  inputMode="decimal"
                  value={formState.location.longitude}
                  onChange={(e) =>
                    onUpdateField('location', { longitude: e.target.value })
                  }
                  placeholder="77.5946"
                  aria-invalid={Boolean(errors.longitude)}
                  className={`${INPUT_BASE} tabular-nums ${
                    errors.longitude ? INPUT_ERROR : INPUT_NORMAL
                  }`}
                />
                <FieldError message={errors.longitude} />
              </div>
            </div>
          ) : (
            <div>
              <FieldLabel
                htmlFor="loc-url"
                label="Google Maps Link"
                required
              />
              <input
                id="loc-url"
                type="url"
                value={formState.location.mapsUrl}
                onChange={(e) =>
                  onUpdateField('location', { mapsUrl: e.target.value })
                }
                placeholder="https://maps.google.com/?q=..."
                aria-invalid={Boolean(errors.mapsUrl)}
                className={`${INPUT_BASE} ${
                  errors.mapsUrl ? INPUT_ERROR : INPUT_NORMAL
                }`}
              />
              <FieldError message={errors.mapsUrl} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
