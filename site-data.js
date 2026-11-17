/* Shared site model: browser-local editing, bilingual text, and legacy program migration. */
(function () {
  'use strict';

  // إعدادات التخزين والنصوص الافتراضية للموقع.
  const storageKey = 'madar.site.v2';
  const localizedText = (ar, en) => ({
    ar,
    en,
  });
  const createCard = (id, ar, en, da, de) => ({
    id,
    title: localizedText(ar, en),
    body: localizedText(da, de),
    published: true,
  });
  const defaultSettings = {
    version: 2,
    colors: {
      navy: '#03213D',
      white: '#FFFFFF',
      lime: '#D5E159',
    },
    brand: localizedText('مدار تك', 'Madar Tech'),
    tagline: localizedText(
      'مساحة للتعلّم، التطور، وصناعة الفرص.',
      'A space to learn, grow, and create opportunities.',
    ),
    contact: {
      email: 'madartech1@gmail.com',
      whatsapp: '',
      instagram: 'https://www.instagram.com/madar_tech0',
      address: localizedText(
        'خانيونس – بجانب المحكمة الشرعية.',
        'Khan Younis – next to the Sharia Court.',
      ),
    },
    hero: {
      eyebrow: localizedText('تعلّم. تواصل. انطلق.', 'LEARN. CONNECT. GROW.'),
      title: localizedText(
        'مساحتك للتعلّم،\nوصناعة الفرص.',
        'Your space to learn.\nYour place to grow.',
      ),
      body: localizedText(
        'في مدار تك، نربط المعرفة بالتطبيق. بيئة تعليمية وتدريبية في خانيونس تساعدك على تطوير مهاراتك، واكتشاف إمكاناتك، وبناء خطوتك القادمة.',
        'At Madar Tech, knowledge meets practice. Discover a learning and training space in Khan Younis to develop your skills, explore your potential, and take your next step.',
      ),
    },
    sections: [
      {
        id: 'about',
        type: 'about',
        nav: localizedText('من نحن', 'About'),
        title: localizedText(
          'نتعلم اليوم،\nلنصنع فرص الغد.',
          'Learning today.\nCreating tomorrow.',
        ),
        body: localizedText(
          'مؤسسة تعليمية وتدريبية تجمع بين المعرفة الأكاديمية والتطبيق العملي، من خلال برامج وأنشطة تساعد الطلاب والخريجين والشباب على مواكبة متطلبات سوق العمل.',
          'An education and training organization bringing academic knowledge into practice through programs and activities for students, graduates, and young people.',
        ),
        published: true,
        items: [
          createCard(
            'vision',
            'رؤيتنا',
            'Our vision',
            'جيل يمتلك المعرفة والمهارة والقدرة على صناعة الفرص.',
            'A generation equipped with the knowledge and skills to create opportunities.',
          ),
          createCard(
            'mission',
            'رسالتنا',
            'Our mission',
            'فرص تعليم وتدريب تساعدك على تحويل المعرفة إلى تطبيق عملي.',
            'Learning opportunities that help you turn knowledge into practical experience.',
          ),
        ],
      },
      {
        id: 'services',
        type: 'cards',
        nav: localizedText('خدماتنا', 'Services'),
        title: localizedText(
          'مكان واحد.\nإمكانات أكثر.',
          'One space.\nMore possibilities.',
        ),
        body: localizedText(
          'كل ما تحتاجه للتعلّم والعمل وتبادل الأفكار.',
          'Everything you need to learn, work, and exchange ideas.',
        ),
        published: true,
        items: [
          createCard(
            'training',
            'التدريب والتطوير',
            'Training & development',
            'برامج تقنية ومهنية تجمع بين التعلّم والتطبيق.',
            'Technical and professional programs built around learning by doing.',
          ),
          createCard(
            'cowork',
            'مساحات العمل المشتركة',
            'Coworking spaces',
            'مساحة للطلاب والمستقلين وأصحاب المشاريع لإنجاز أعمالهم.',
            'A place for students, freelancers, and founders to get things done.',
          ),
          createCard(
            'rooms',
            'القاعات التدريبية',
            'Training rooms',
            'قاعات للدورات والاجتماعات والفعاليات التعليمية.',
            'Rooms for training courses, meetings, and educational events.',
          ),
          createCard(
            'activities',
            'الأنشطة التعليمية',
            'Learning activities',
            'لقاءات ومبادرات لتبادل المعرفة والخبرات.',
            'Meetups and initiatives for sharing knowledge and experience.',
          ),
        ],
      },
      {
        id: 'programs',
        type: 'programs',
        nav: localizedText('البرامج', 'Programs'),
        title: localizedText(
          'مهارة جديدة،\nبداية مختلفة.',
          'A new skill.\nA fresh start.',
        ),
        body: localizedText(
          'اختر مسارك، وابدأ رحلتك في عالم التقنية.',
          'Find your path and start your journey into technology.',
        ),
        published: true,
        items: [
          createCard(
            'frontend',
            'تطوير واجهات المواقع',
            'Front-End Development',
            'تعلّم أساسيات تطوير واجهات المواقع الإلكترونية.',
            'Learn the fundamentals of building web interfaces.',
          ),
          createCard(
            'ai',
            'الذكاء الاصطناعي',
            'Artificial Intelligence',
            'اكتشف أدوات الذكاء الاصطناعي وتطبيقاتها العملية.',
            'Explore AI tools and their practical applications.',
          ),
          createCard(
            'digital',
            'المهارات الرقمية',
            'Digital Skills',
            'طوّر مهاراتك الرقمية واستخدامك للأدوات التقنية.',
            'Build your digital skills and confidence with technology.',
          ),
        ],
      },
      {
        id: 'why',
        type: 'features',
        nav: localizedText('لماذا مدار تك؟', 'Why Madar?'),
        title: localizedText(
          'بيئة التعلّم\nتصنع الفرق.',
          'The right environment\nmakes a difference.',
        ),
        body: localizedText(
          'مساحة تساعدك على التركيز، وفريق يدعم خطوتك القادمة.',
          'A space to focus, with support for your next step.',
        ),
        published: true,
        items: [
          createCard(
            'environment',
            'بيئة تعليمية محفزة',
            'An inspiring environment',
            '',
            '',
          ),
          createCard('internet', 'إنترنت مستقر', 'Reliable internet', '', ''),
          createCard('power', 'كهرباء متوفرة', 'Available electricity', '', ''),
          createCard('practice', 'معرفة وتطبيق', 'Knowledge into practice', '', ''),
          createCard(
            'network',
            'تواصل وتبادل خبرات',
            'Connections & shared experience',
            '',
            '',
          ),
          createCard('guidance', 'دعم وتوجيه', 'Support & guidance', '', ''),
        ],
      },
      {
        id: 'contact',
        type: 'contact',
        nav: localizedText('تواصل معنا', 'Contact'),
        title: localizedText(
          'خطوتك القادمة\nتبدأ بمحادثة.',
          'Your next step\nstarts with a conversation.',
        ),
        body: localizedText(
          'عندك استفسار عن برامجنا أو خدماتنا؟ فريق مدار تك جاهز يساعدك.',
          'Questions about our programs or services? The Madar Tech team is here to help.',
        ),
        published: true,
        items: [],
      },
    ],
  };
  const copySettings = (value) => JSON.parse(JSON.stringify(value));
  const isLocalizedText = (p) =>
    p &&
    typeof p.ar === 'string' &&
    typeof p.en === 'string' &&
    p.ar.length <= 6000 &&
    p.en.length <= 6000;
  const isHexColor = (s) => typeof s === 'string' && /^#[0-9a-f]{6}$/i.test(s);
  const isValidId = (id) => typeof id === 'string' && /^[a-z][a-z0-9-]{0,79}$/.test(id);
  const sectionTypes = ['about', 'cards', 'programs', 'features', 'text', 'contact'];
  // التحقق مقسّم حتى يمكن تعديل شروط البطاقة والقسم بشكل مستقل.
  function hasUniqueIds(items) {
    return new Set(items.map((item) => item.id)).size === items.length;
  }

  function isValidCard(item) {
    if (!item) return false;

    return (
      isValidId(item.id) &&
      isLocalizedText(item.title) &&
      isLocalizedText(item.body) &&
      typeof item.published === 'boolean'
    );
  }

  function isValidSection(section) {
    if (!section) return false;
    if (!isValidId(section.id)) return false;
    if (['home', 'main', 'menu'].includes(section.id)) return false;
    if (!sectionTypes.includes(section.type)) return false;
    if (typeof section.published !== 'boolean') return false;

    const hasValidText = ['nav', 'title', 'body'].every((field) =>
      isLocalizedText(section[field]),
    );
    if (!hasValidText) return false;
    if (!Array.isArray(section.items) || section.items.length > 60) return false;
    if (!section.items.every(isValidCard)) return false;

    return hasUniqueIds(section.items);
  }

  function isValidSite(settings) {
    if (!settings || settings.version !== 2) return false;
    if (!settings.colors || !settings.hero || !settings.contact) return false;
    if (!isLocalizedText(settings.brand) || !isLocalizedText(settings.tagline))
      return false;

    const hasValidColors = ['navy', 'white', 'lime'].every((colorName) =>
      isHexColor(settings.colors[colorName]),
    );
    const hasValidHero = ['eyebrow', 'title', 'body'].every((field) =>
      isLocalizedText(settings.hero[field]),
    );
    const hasValidContact = ['email', 'whatsapp', 'instagram'].every(
      (field) =>
        typeof settings.contact[field] === 'string' &&
        settings.contact[field].length <= 300,
    );

    if (!hasValidColors || !hasValidHero || !hasValidContact) return false;
    if (!isLocalizedText(settings.contact.address)) return false;
    if (!Array.isArray(settings.sections) || settings.sections.length > 30) return false;
    if (!settings.sections.every(isValidSection)) return false;

    return hasUniqueIds(settings.sections);
  }

  // قراءة البرامج القديمة مرة واحدة دون حذف بيانات المستخدم.
  function createInitialSettings() {
    const settings = copySettings(defaultSettings);
    const savedPrograms = localStorage.getItem('madar.programs.v1');
    if (savedPrograms !== null) {
      const old = JSON.parse(savedPrograms);
      if (
        !Array.isArray(old) ||
        !old.every(
          (p) =>
            p &&
            typeof p.id === 'string' &&
            typeof p.title === 'string' &&
            typeof p.description === 'string' &&
            ['published', 'draft'].includes(p.status),
        )
      ) {
        throw Error('بيانات البرامج القديمة غير صالحة؛ لم يتم استبدالها.');
      }
      settings.sections.find((x) => x.type === 'programs').items = old.map((p, i) => ({
        id: 'legacy-' + i,
        title: localizedText(p.title, p.title),
        body: localizedText(p.description, ''),
        published: p.status === 'published',
      }));
    }
    return settings;
  }
  // الحفظ والقراءة من المتصفح.
  function loadSettings() {
    const savedSettings = localStorage.getItem(storageKey);
    const settings =
      savedSettings === null ? createInitialSettings() : JSON.parse(savedSettings);
    if (!isValidSite(settings)) {
      throw Error('بيانات الموقع غير صالحة؛ لم يتم استبدالها.');
    }
    return settings;
  }
  function saveSettings(settings) {
    if (!isValidSite(settings)) {
      throw Error('تعذّر حفظ بيانات غير صالحة.');
    }
    localStorage.setItem(storageKey, JSON.stringify(settings));
    window.dispatchEvent(new Event('madar:change'));
  }
  // تفضيلات اللغة والمظهر.
  function getPreference(preferenceName, fallback) {
    try {
      return localStorage.getItem('madar.' + preferenceName) || fallback;
    } catch (_) {
      return fallback;
    }
  }
  function setPreference(preferenceName, value) {
    try {
      localStorage.setItem('madar.' + preferenceName, value);
    } catch (_) {}
  }
  function applyAppearance(settings, theme) {
    const root = document.documentElement;
    for (const [k, v] of Object.entries(settings.colors))
      root.style.setProperty('--' + k, v);
    root.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  }
  function translateText(localizedText, language) {
    return localizedText[language] || localizedText.ar || localizedText.en;
  }
  function getContrastRatio(firstColor, secondColor) {
    const luminance = (h) => {
      const rgb = h
        .slice(1)
        .match(/../g)
        .map((v) => parseInt(v, 16) / 255)
        .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
      return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    };
    const firstLuminance = luminance(firstColor);
    const secondLuminance = luminance(secondColor);
    return (
      (Math.max(firstLuminance, secondLuminance) + 0.05) /
      (Math.min(firstLuminance, secondLuminance) + 0.05)
    );
  }
  // واجهة مشتركة: تبقى أسماء هذه الخصائص ثابتة لبقية الملفات.
  window.MadarSite = {
    key: storageKey,
    defaults: () => copySettings(defaultSettings),
    load: loadSettings,
    save: saveSettings,
    validate: isValidSite,
    clone: copySettings,
    pair: localizedText,
    kinds: sectionTypes,
    pref: getPreference,
    setPref: setPreference,
    apply: applyAppearance,
    translate: translateText,
    contrast: getContrastRatio,
  };
})();
