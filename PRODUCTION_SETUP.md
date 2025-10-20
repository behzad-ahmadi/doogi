# راهنمای کانفیگ Production برای Vercel

## مشکل خروج در Production

اگر خروج (logout) در production کار نمی‌کند، این مراحل را دنبال کنید:

## 1. متغیرهای محیطی Vercel

در پنل Vercel، بخش Environment Variables را بررسی کنید:

### متغیرهای ضروری:
```
NEXTAUTH_URL=https://doogi.ir
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=your-database-url
```

### نکات مهم:
- `NEXTAUTH_URL` باید دقیقاً URL production شما باشد
- `NEXTAUTH_SECRET` باید یک رشته تصادفی قوی باشد (حداقل 32 کاراکتر)
- همه متغیرها باید برای environment های `Production`, `Preview` و `Development` تنظیم شوند

## 2. کانفیگ Google OAuth

در Google Cloud Console:

1. به [Google Cloud Console](https://console.cloud.google.com/) بروید
2. پروژه خود را انتخاب کنید
3. به APIs & Services > Credentials بروید
4. OAuth 2.0 Client ID خود را ویرایش کنید

### Authorized redirect URIs:
```
https://doogi.ir/api/auth/callback/google
https://doogi.ir/api/auth/callback/credentials
```

### Authorized JavaScript origins:
```
https://doogi.ir
```

## 3. بررسی کانفیگ NextAuth

فایل `src/lib/auth.ts` باید شامل این تنظیمات باشد:

```typescript
export const authOptions = {
  // ... other config
  url: process.env.NEXTAUTH_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  pages: {
    signIn: '/fa/auth/login',
    error: '/fa/auth/error',
  },
  // ... rest of config
}
```

## 4. بررسی signOut در کامپوننت‌ها

مطمئن شوید که `signOut` با URL کامل فراخوانی می‌شود:

```typescript
// ✅ درست
signOut({ callbackUrl: `${window.location.origin}/${lang}` })

// ❌ غلط
signOut({ callbackUrl: `/${lang}` })
```

## 5. مراحل عیب‌یابی

### مرحله 1: بررسی متغیرهای محیطی
```bash
# در Vercel CLI
vercel env ls
```

### مرحله 2: بررسی لاگ‌های Vercel
1. به پنل Vercel بروید
2. بخش Functions > View Function Logs
3. خطاهای مربوط به authentication را بررسی کنید

### مرحله 3: تست در حالت Preview
1. یک branch جدید ایجاد کنید
2. تغییرات را push کنید
3. URL preview را تست کنید

## 6. مشکلات رایج و راه‌حل‌ها

### مشکل: خروج کار نمی‌کند
**راه‌حل:**
- `NEXTAUTH_URL` را بررسی کنید
- Google OAuth redirect URIs را بررسی کنید
- `signOut` callback URL را بررسی کنید

### مشکل: ورود کار نمی‌کند
**راه‌حل:**
- `GOOGLE_CLIENT_ID` و `GOOGLE_CLIENT_SECRET` را بررسی کنید
- Google OAuth authorized origins را بررسی کنید

### مشکل: Session ذخیره نمی‌شود
**راه‌حل:**
- `NEXTAUTH_SECRET` را بررسی کنید
- `DATABASE_URL` را بررسی کنید

## 7. دستورات مفید

### تولید NEXTAUTH_SECRET جدید:
```bash
openssl rand -base64 32
```

### بررسی متغیرهای محیطی در production:
```javascript
// در یک API route موقت
export async function GET() {
  return Response.json({
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    // هرگز مقادیر واقعی را نمایش ندهید!
  })
}
```

## 8. چک‌لیست نهایی

- [ ] `NEXTAUTH_URL` در Vercel تنظیم شده
- [ ] `NEXTAUTH_SECRET` در Vercel تنظیم شده
- [ ] Google OAuth redirect URIs به‌روزرسانی شده
- [ ] `signOut` callback URLs مطلق هستند
- [ ] تمام environment variables برای Production تنظیم شده‌اند
- [ ] تغییرات deploy شده‌اند
- [ ] تست کامل authentication انجام شده

---

**نکته:** پس از هر تغییر در متغیرهای محیطی Vercel، حتماً یک deployment جدید انجام دهید.