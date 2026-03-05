<h1 align="center">Bookmarklet Forge & Directory</h1>

<p align="center">
  <a href="README.md">English</a> | <b>العربية</b>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="الرخصة: MIT"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg" alt="جافاسكريبت خام"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="نرحب بالمساهمات"></a>
  <br><br>
  <a href="https://github.com/AhmedE404/Bookmarklet-Share-Tool/stargazers"><img src="https://img.shields.io/github/stars/AhmedE404/Bookmarklet-Share-Tool?style=social" alt="نجوم جيتهب"></a>
  <a href="https://github.com/AhmedE404/Bookmarklet-Share-Tool/network/members"><img src="https://img.shields.io/github/forks/AhmedE404/Bookmarklet-Share-Tool?style=social" alt="تفرعات جيتهب"></a>
</p>

<p align="center">
  🚀 <strong><a href="https://ahmede404.github.io/Bookmarklet-Share-Tool/" target="_blank">تصفح الموقع والدليل من هنا</a></strong> 🚀
</p>

منصة متطورة ومفتوحة المصدر مصممة لاكتشاف، إنشاء، اختبار، ومشاركة أدوات الجافاسكريبت المصغرة (Bookmarklets). مبنية بالكامل باستخدام الجافاسكريبت الخام (Vanilla JS)، وتعمل كـ **دليل عام (Directory)** و **بيئة تطوير (Builder)** في نفس الوقت.

## ✨ المميزات الأساسية

* **دليل متقدم:** واجهة جدول بيانات نظيفة تدعم الفرز والبحث السريع لتصفح الأدوات التي شاركها المجتمع.
* **صانع أدوات ذكي:** اكتب كودك وقم بتوليد روابط مشاركة مضغوطة فوراً باستخدام واجهة `Compression Streams API` الحديثة، بدون الحاجة لأي خوادم خارجية.
* **ميزة النسخ والتعديل (Remix):** هل أعجبتك أداة؟ اضغط على "Remix / Edit" لفتح كودها المصدري في الصانع، وتعديلها، ونسبها إليك.
* **معمارية السجل (Registry):** إدارة البيانات تتم عبر ملف `registry.json`، مما يجعل المساهمة في المشروع وإضافة أدوات جديدة عملية خالية من تعقيدات تداخل الأكواد (Merge Conflicts).
* **دعم اللغات (i18n):** دعم كامل للغات متعددة (الإنجليزية والعربية) مع التبديل التلقائي لاتجاه العرض (RTL/LTR).

## 🛠️ كيفية الاستخدام

### تثبيت أداة
1. تصفح [الدليل الرئيسي](https://AhmedE404.github.io/Bookmarklet-Share-Tool/).
2. ابحث عن الأداة المناسبة واسحب زر **"Drag Me &equiv;"** إلى شريط الإشارات المرجعية (Bookmarks Bar) في متصفحك.
3. *تلميح: اضغط `Ctrl + Shift + B` (ويندوز) أو `⌘ + Shift + B` (ماك) لإظهار الشريط.*

### الإنشاء والمشاركة
1. اذهب إلى صفحة **الإنشاء والمشاركة** (`/builder/`).
2. اكتب كود الجافاسكريبت الخاص بك.
3. اضغط على **توليد رابط للمشاركة** للحصول على رابط مضغوط يمكنك إرساله لأي شخص.

## 🤝 كيفية المساهمة (إضافة أداتك)
نحن نرحب بمساهماتك! لا تحتاج إلى تعديل أكواد الموقع الأساسية لإضافة أداتك إلى الدليل.

1. قم بعمل **Fork** لهذا المستودع.
2. **أضف كودك:** أنشئ ملفاً جديداً في مجلد `bookmarklets/` (مثال: `my-awesome-tool.js`).
3. **سجل الأداة:** أضف بيانات أداتك إلى ملف الفهرس `data/registry.json`:
```json
   {
     "id": "my-awesome-tool",
     "title": "اسم أداتك",
     "description": "وصف قصير لما تفعله الأداة.",
     "category": "التصنيف",
     "author": { "name": "اسمك", "github": "حسابك_في_جيتهب" },
     "file": "bookmarklets/my-awesome-tool.js",
     "added_date": "YYYY-MM-DD"
   }

```

4. **أرسل Pull Request!**

*(ملاحظة: يمكنك استخدام صفحة `/builder/` في الموقع لتوليد هيكل الـ JSON وكود النسخ تلقائياً!)*

## 📂 الهيكلة المعمارية

يتبع هذا المشروع هيكلة تركيبية صارمة تمنع تكرار الأكواد (DRY):

* `/js/shared.js`: النواة المشتركة (الترجمة، الضغط، الإشعارات).
* `/js/directory.js`: مسؤول عن رسم الجدول والفلترة في الصفحة الرئيسية.
* `/js/builder.js`: مسؤول عن ضغط الأكواد، توليد الروابط، ومساعد المساهمة (PR Helper).

## 📝 الرخصة

هذا المشروع مرخص بموجب رخصة MIT - راجع ملف [LICENSE](https://www.google.com/search?q=LICENSE) للتفاصيل.
