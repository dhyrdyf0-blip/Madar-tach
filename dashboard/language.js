/* Dashboard UI language follows the homepage preference. Editable content is never translated here. */
(function () {
  'use strict';
  const english = {
    'ألوان النص والخلفيات بحاجة لتباين أوضح. لم يتم الحفظ.':
      'Text and background colors need more contrast. Changes were not saved.',
    'تحقق من البريد ورقم واتساب الدولي (8 إلى 15 رقمًا، أو اتركه فارغًا).':
      'Check the email and international WhatsApp number (8–15 digits, or leave it blank).',
    '✓ محفوظ محليًا · ': '✓ Saved locally · ',
    'تعذّر الحفظ؛ صدّر نسخة من تعديلاتك وتحقق من إعدادات التخزين.':
      'Could not save. Export a copy of your edits and check browser storage settings.',
    'جارٍ حفظ التعديلات…': 'Saving changes…',
    ' · العربية': ' · Arabic',
    'أقسام الموقع': 'Website sections',
    'محتوى قابل للتحرير': 'Editable content',
    'برامج تدريبية': 'Training programs',
    'بما فيها المسودات': 'Including drafts',
    'برامج ظاهرة': 'Visible programs',
    'ضمن أقسام ظاهرة': 'In visible sections',
    'أقسام ظاهرة': 'Visible sections',
    'في الصفحة الرئيسية': 'On the homepage',
    'برامجك، في مكان واحد': 'Your programs, in one place',
    'أضف البرامج وحرّر تفاصيلها وحالة ظهورها.':
      'Add programs and edit their details and visibility.',
    'محتوى يصنع الفرق': 'Content that makes a difference',
    'عدّل الواجهة والأقسام، ورتّب قصتك كما تريد.':
      'Edit the homepage and arrange your sections.',
    'هوية تشبه مدار تك': 'A distinctly Madar identity',
    'لوحة ألوان موحدة واسم ووصف للمؤسسة.':
      'A consistent palette, organization name, and description.',
    'تواصل أسهل': 'Easier connections',
    'اضبط البريد وواتساب والعنوان.': 'Manage email, WhatsApp, and your address.',
    'محتوى الموقع الآن': 'Your website content',
    'انتقل إلى صفحة المحتوى لتغيير ترتيب الأقسام أو ظهورها.':
      'Visit the content page to reorder sections or change their visibility.',
    ظاهر: 'Visible',
    مسودة: 'Draft',
    'ألوان الهوية': 'Brand colors',
    'تُطبّق الألوان بعد حفظها تلقائيًا، مع التحقق من تباين النص.':
      'Colors apply after autosave, with text contrast checks.',
    الكحلي: 'Navy',
    الأبيض: 'White',
    'الأخضر الليموني': 'Lime green',
    'اسم المؤسسة ووصفها': 'Organization name and description',
    'اسم المؤسسة': 'Organization name',
    'وصف التذييل': 'Footer description',
    'قنوات التواصل': 'Contact channels',
    'رقم واتساب دولي دون +. عند تركه فارغًا يستخدم نموذج التواصل البريد الإلكتروني.':
      'Enter an international WhatsApp number without +. Leave it blank to use email in the contact form.',
    'البريد الإلكتروني': 'Email address',
    'رقم واتساب': 'WhatsApp number',
    'رابط Instagram': 'Instagram URL',
    العنوان: 'Title',
    'قسم جديد': 'New section',
    'إظهار القسم': 'Show section',
    'نقل القسم للأعلى': 'Move section up',
    'نقل القسم للأسفل': 'Move section down',
    'حذف القسم': 'Delete section',
    'حذف القسم وجميع بطاقاته؟': 'Delete this section and all its cards?',
    'اسم القسم': 'Section name',
    الوصف: 'Description',
    'البرامج التدريبية': 'Training programs',
    البطاقات: 'Cards',
    'برنامج ': 'Program ',
    'بطاقة ': 'Card ',
    حذف: 'Delete',
    'حذف هذه البطاقة؟': 'Delete this card?',
    المحتوى: 'Content',
    '＋ إضافة برنامج': '＋ Add program',
    '＋ إضافة بطاقة': '＋ Add card',
    'عنوان جديد': 'New title',
    'اكتب المحتوى.': 'Write your content.',
    'الواجهة الرئيسية': 'Homepage hero',
    'عبارة قصيرة': 'Short tagline',
    'العنوان الرئيسي': 'Main heading',
    'الوصف الرئيسي': 'Main description',
    'إدارة البرامج التدريبية': 'Manage training programs',
    'إدارة أقسام الموقع': 'Manage website sections',
    'الأقسام والبطاقات الجديدة تُضاف كمسودات؛ فعّل ظهورها عندما تكون جاهزة.':
      'New sections and cards start as drafts. Make them visible when they are ready.',
    'نوع القسم': 'Section type',
    'مجموعة برامج': 'Program group',
    'قسم نصي': 'Text section',
    خدمات: 'Services',
    'من نحن': 'About us',
    مميزات: 'Features',
    تواصل: 'Contact',
    '＋ إضافة قسم': '＋ Add section',
    'وصف القسم.': 'Section description.',
    'لا توجد أقسام هنا بعد. أضف قسمًا للبدء.': 'No sections yet. Add one to get started.',
    'نسخة من عملك، دائمًا معك': 'Keep a copy of your work',
    'التصدير ينزّل ملف JSON للإعدادات. الاستيراد يستبدل بيانات هذا المتصفح فقط بعد تأكيدك.':
      "Export downloads your settings as JSON. Import replaces this browser's data after confirmation.",
    'تصدير الإعدادات ↓': 'Export settings ↓',
    'حجم الملف كبير.': 'The file is too large.',
    'صيغة الإعدادات غير صالحة.': 'Invalid settings format.',
    'استبدال البيانات الحالية؟': 'Replace the current data?',
    'تعذّر الاستيراد: ': 'Could not import: ',
    'استيراد ملف الإعدادات': 'Import settings file',
    'استعادة المحتوى الافتراضي': 'Restore default content',
    'صدّر نسخة أولًا إذا أردت الاحتفاظ بتعديلاتك.':
      'Export a copy first if you want to keep your edits.',
    'استبدال بيانات الموقع المحلية بالمحتوى الافتراضي؟':
      'Replace local website data with the defaults?',
    'التعديلات لم تُحفظ. هل تريد مغادرة الصفحة؟':
      'Your changes were not saved. Leave this page?',
    'تغيّرت البيانات من نافذة أخرى. صدّر مسودتك من زر «تصدير المسودة» ثم أعد تحميل الصفحة.':
      'Data changed in another window. Export your draft, then reload this page.',
    'توقف الحفظ لتجنب استبدال تعديلاتك': 'Saving paused to protect your edits',
    'تم تحميل التحديث من نافذة أخرى.': 'Changes from another window were loaded.',
    'تعذّر قراءة البيانات الجديدة. أعد تحميل الصفحة.':
      'Could not read the updated data. Reload this page.',
    'جاهز · حفظ تلقائي': 'Ready · Autosave enabled',
    'تعذّر قراءة التخزين؛ لم تُستبدل بياناتك. تحقق من إعدادات المتصفح.':
      'Could not read browser storage. Your data was not replaced. Check your browser settings.',
    'تعذّر تحميل البيانات': 'Could not load data',
    'مساحة الإدارة / MADAR TECH': 'ADMIN WORKSPACE / MADAR TECH',
    'نظرة عامة': 'Overview',
    'محتوى الموقع': 'Website content',
    'الهوية والألوان': 'Brand & colors',
    'معلومات التواصل': 'Contact details',
    'النسخ الاحتياطية': 'Backups',
    'راجع موقعك كما يراه زوارك.': 'See your website as visitors do.',
    'معاينة الموقع ↗': 'Preview website ↗',
    'مساحة للتعلّم، التطور، وصناعة الفرص.':
      'A space to learn, grow, and create opportunities.',
    'عملك يستحق أن يُحفظ.': 'Your work deserves to be saved.',
    'صدّر الإعدادات أو استورد نسخة محفوظة إلى هذا المتصفح.':
      'Export your settings or import a saved copy into this browser.',
    'جارٍ تحميل البيانات…': 'Loading data…',
    'تصدير المسودة': 'Export draft',
    'حفظ الآن': 'Save now',
    'حفظ تلقائي في هذا المتصفح فقط. يتحدّث الموقع على عنوان Live Server نفسه؛ لا تُنشر التعديلات إلى بقية الزوار أو GitHub. اللوحة غير محمية بتسجيل دخول.':
      'Autosave is local to this browser. The website updates on the same Live Server origin. Changes are not published to other visitors or GitHub. This dashboard has no sign-in protection.',
    'مدار تك · تعلّم. تواصل. انطلق.': 'Madar Tech · Learn. Connect. Grow.',
    'يرجى تفعيل JavaScript لاستخدام لوحة التحكم.':
      'Please enable JavaScript to use the dashboard.',
    'مدار تك': 'Madar Tech',
    'صفحات لوحة التحكم': 'Dashboard pages',
    'فتح قائمة الإدارة': 'Open dashboard navigation',
    'تبديل الوضع الفاتح والداكن': 'Toggle light and dark mode',
    'المحادثة بداية كل فرصة.': 'Every opportunity starts with a conversation.',
    'حدّث قنوات التواصل والعنوان ليجدك زوار الموقع بسهولة.':
      'Update your contact channels and address so visitors can reach you easily.',
    'قصتك، كما تريد أن تُروى.': 'Tell your story, your way.',
    'عدّل الواجهة الرئيسية وأقسام الموقع وأضف البطاقات ورتّب المحتوى. البرامج لها صفحة مستقلة.':
      'Edit the hero and website sections, add cards, and arrange content. Programs have their own page.',
    'مرحبًا بك في مساحة مدار تك.': 'Welcome to your Madar Tech workspace.',
    'كل تفاصيل موقعك، من مكان واحد. أرقام فعلية من المحتوى المحفوظ دون بيانات تجريبية.':
      'Every detail of your website, in one place. Figures reflect saved content, with no sample statistics.',
    'هوية واحدة، تفاصيل متناسقة.': 'One identity. Consistent details.',
    'خصّص ألوان مدار تك واسم المؤسسة ووصفها، مع الحفاظ على وضوح النص.':
      'Customize Madar Tech colors, name, and description while keeping text readable.',
    'مهارات جديدة. فرص جديدة.': 'New skills. New opportunities.',
    'أضف البرامج وحرّر وصفها بالعربية والإنجليزية، وانشرها أو احتفظ بها كمسودات.':
      'Add programs, edit their Arabic and English descriptions, and make them visible or keep drafts.',
    'لوحة التحكم': 'Dashboard',
    'عنوان التواصل': 'Address',
  };
  let language = MadarSite.pref('language', 'ar') === 'en' ? 'en' : 'ar';
  const originalTitle = document.title;
  const textNodes = [];
  const attributes = [];

  function translate(text) {
    if (language !== 'en' || typeof text !== 'string') return text;
    if (Object.hasOwn(english, text)) return english[text];
    const normalized = text.trim().replace(/\s+/g, ' ');
    if (Object.hasOwn(english, normalized))
      return text.replace(text.trim(), english[normalized]);
    // Page titles and breadcrumbs combine a shared label with the page name.
    if (normalized.includes(' | ') || normalized.includes(' / ')) {
      return normalized
        .split(/( \| | \/ )/)
        .map((part) => translate(part))
        .join('');
    }
    return text;
  }

  // Remember only the static shell, never labels or values inside the content editor.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement.closest('#editor, #status, #error, script, style, noscript'))
      continue;
    if (node.textContent.trim()) textNodes.push({ node, original: node.textContent });
  }
  document.querySelectorAll('[aria-label], img[alt]').forEach((element) => {
    for (const name of ['aria-label', 'alt']) {
      if (element.hasAttribute(name))
        attributes.push({ element, name, original: element.getAttribute(name) });
    }
  });

  function refresh() {
    language = MadarSite.pref('language', 'ar') === 'en' ? 'en' : 'ar';
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
    document.title = translate(originalTitle);
    textNodes.forEach((item) => (item.node.textContent = translate(item.original)));
    attributes.forEach((item) =>
      item.element.setAttribute(item.name, translate(item.original)),
    );
  }

  window.DashboardLocale = {
    translate,
    refresh,
    get language() {
      return language;
    },
  };
  refresh();
})();
