# دليل تعديل أكواد مدار تك

المشروع HTML وCSS وJavaScript عادي، دون إطار عمل أو خطوة بناء. افتح index.html عبر Live Server.

## أين أعدّل؟

| المطلوب | الملف |
| --- | --- |
| النصوص والأقسام الافتراضية | site-data.js داخل defaultSettings |
| ألوان الهوية ومتغيرات الفاتح والداكن | brand.css |
| شكل الصفحة الرئيسية والموبايل | style.css |
| HTML الأساسي للصفحة الرئيسية | index.html |
| الترجمة وأزرار الواجهة وعرض الأقسام | script.js |
| شكل لوحة التحكم والتمرير والقائمة | dashboard/dashboard.css |
| حفظ وتحرير بيانات الداشبورد | dashboard/dashboard.js |
| عنوان أو قائمة صفحة إدارية | ملف HTML الخاص بها داخل dashboard |

## قراءة JavaScript

- renderHomepage في script.js تحدّث الصفحة الرئيسية من البيانات الحالية.
- createSection تعرض القسم حسب نوعه.
- renderPage في dashboard/dashboard.js تختار صفحة الإدارة الحالية من data-page في HTML.
- renderOverview وrenderIdentity وrenderContact وrenderContentSections وrenderBackup تعرض محتوى صفحات الإدارة.
- createSectionEditor تبني حقول القسم وبطاقاته.
- saveChanges تتحقق من البيانات وتحفظها، وscheduleSave تنتظر 450 مللي ثانية بعد الكتابة.
- isValidSite وisValidSection وisValidCard في site-data.js تتحقق من البيانات على مستويات منفصلة.

## البيانات المشتركة

MadarSite هي الواجهة التي يستخدمها الموقع والداشبورد. بقيت أسماء خصائصها متوافقة مع النسخ السابقة، مثل load وsave وdefaults وvalidate.

```js
const settings = MadarSite.load();
settings.hero.title.ar = 'عنوان عربي جديد';
settings.hero.title.en = 'A new English title';
MadarSite.save(settings);
```

النصوص القابلة للترجمة كائنات فيها ar وen. الأقسام محفوظة في settings.sections، وبطاقات كل قسم داخل items. قيمة published تحدّد الظهور أو المسودة.

## ملاحظات عند التعديل

حافظ على قيم id الفريدة وعلى أسماء خصائص البيانات. لا تغيّر مفتاح التخزين madar.site.v2 دون خطة لنقل بيانات المستخدمين. استخدم textContent عند عرض نص قابل للتعديل.

الداشبورد يحفظ في المتصفح فقط. البيانات المحفوظة تتقدم على defaultSettings، لذلك قد لا يظهر تعديل النصوص الافتراضية في متصفح سبق حفظ بياناته. صدّر نسخة احتياطية قبل استعادة الافتراضي أو مسح بيانات الموقع.

ملف programs.js خاص بالتوافق القديم ولا تحمّله الصفحات الحالية. النسخة الحالية تعتمد site-data.js.

الأدوات المستخدمة لتنسيق وفحص التعديل ليست اعتمادًا مطلوبًا لتشغيل الموقع؛ لا تحتاج تثبيت حزم لتشغيله.
