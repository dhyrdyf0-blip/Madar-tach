(function () {
  'use strict';

  // إعداد اللغة والمظهر والبيانات.
  const siteStore = window.MadarSite;
  const getElement = (id) => document.getElementById(id);
  let currentLanguage = siteStore.pref('language', 'ar') === 'en' ? 'en' : 'ar';
  let currentTheme =
    siteStore.pref('homepage-theme-v3', 'light') === 'dark' ? 'dark' : 'light';
  let siteSettings;
  let revealObserver;
  function animateVisibleSections() {
    if (revealObserver) {
      revealObserver.disconnect();
    }
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        }),
      {
        threshold: 0.08,
      },
    );
    document.querySelectorAll('.content-section .wrap').forEach((el) => {
      el.classList.add('will-reveal');
      revealObserver.observe(el);
    });
  }
  // نصوص أزرار الواجهة؛ المحتوى القابل للتعديل موجود في site-data.js.
  const translations = {
    ar: {
      home: 'الرئيسية',
      more: 'اكتشف البرامج',
      contact: 'تواصل معنا',
      learn: 'اعرف المزيد',
      space: 'خانيونس · تعلّم وتدريب وعمل مشترك',
      tag: 'فضولك بداية كل فرصة ✳',
      strip: ['تعلّم بالتطبيق', 'مساحات للعمل والتواصل', 'معرفة تصنع فرصًا'],
      dashboard: 'لوحة التحكم',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      message: 'رسالتك',
      send: 'إرسال عبر واتساب ↗',
      emailSend: 'تجهيز رسالة بريد ↗',
      formNote: 'سنفتح تطبيق التواصل لتراجع رسالتك وترسلها بنفسك.',
      emailReady: 'تم تجهيز الرسالة في تطبيق البريد. أكمل الإرسال هناك.',
      popup: 'تعذّر فتح نافذة واتساب؛ اسمح بالنوافذ المنبثقة ثم حاول مجددًا.',
      dark: 'تفعيل الوضع الداكن',
      light: 'تفعيل الوضع الفاتح',
      menu: 'فتح القائمة',
      nav: 'التنقل الرئيسي',
      skip: 'انتقل للمحتوى',
      empty: 'سيتم الإعلان عن برامج جديدة قريبًا.',
      copyright: 'جميع الحقوق محفوظة',
      section: 'قسم',
      loadError: 'تعذّر قراءة تعديلات المتصفح. نعرض المحتوى الافتراضي دون تغيير بياناتك.',
    },
    en: {
      home: 'Home',
      more: 'Explore programs',
      contact: 'Get in touch',
      learn: 'Learn more',
      space: 'Khan Younis · Learn, train & cowork',
      tag: 'Curiosity is where opportunity begins ✳',
      strip: [
        'Learn by doing',
        'A space to work & connect',
        'Knowledge into opportunity',
      ],
      dashboard: 'Dashboard',
      name: 'Name',
      email: 'Email address',
      phone: 'Phone number',
      message: 'Your message',
      send: 'Continue on WhatsApp ↗',
      emailSend: 'Prepare an email ↗',
      formNote: 'Your messaging app will open so you can review and send your message.',
      emailReady: 'Your message is ready in your email app. Complete sending it there.',
      popup: 'WhatsApp could not open. Allow pop-ups and try again.',
      dark: 'Enable dark mode',
      light: 'Enable light mode',
      menu: 'Open navigation',
      nav: 'Main navigation',
      skip: 'Skip to content',
      empty: 'New programs will be announced soon.',
      copyright: 'All rights reserved',
      section: 'Section',
      loadError:
        'Could not read local edits. Showing default content without overwriting your data.',
    },
  };
  const translate = (localizedText) =>
    siteStore.translate(localizedText, currentLanguage);
  // أدوات إنشاء عناصر الصفحة بأمان، مع استخدام textContent للنصوص.
  const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text !== undefined) {
      element.textContent = text;
    }
    return element;
  };
  const createLink = (label, url, className) => {
    const linkElement = createElement('a', className, label);
    linkElement.href = url;
    return linkElement;
  };
  const getPublishedSections = () => siteSettings.sections.filter((s) => s.published);
  const findPublishedSection = (type) =>
    getPublishedSections().find((s) => s.type === type);
  const getContactUrl = () => {
    const contactSection = findPublishedSection('contact');
    return contactSection
      ? '#' + contactSection.id
      : 'mailto:' + siteSettings.contact.email;
  };
  function showNotice(text) {
    getElement('siteNotice').textContent = text;
    getElement('siteNotice').hidden = !text;
  }
  function createContactDetails() {
    const detailsElement = createElement('div', 'contact-details');
    detailsElement.append(
      createLink(siteSettings.contact.email, 'mailto:' + siteSettings.contact.email),
      createElement('span', '', translate(siteSettings.contact.address)),
    );
    return detailsElement;
  }
  // نموذج التواصل وتجهيز الرسالة.
  function createContactForm(sectionId) {
    const form = createElement('form', 'contact-form');
    form.id = sectionId + '-form';
    for (const [id, type] of [
      ['name', 'text'],
      ['email', 'email'],
      ['phone', 'tel'],
      ['message', 'textarea'],
    ]) {
      const label = createElement('label', '', translations[currentLanguage][id]);
      label.htmlFor = sectionId + '-' + id;
      const input = createElement(type === 'textarea' ? 'textarea' : 'input');
      input.id = sectionId + '-' + id;
      input.name = id;
      input.required = true;
      input.maxLength = id === 'message' ? 2000 : 180;
      if (type === 'textarea') {
        input.rows = 4;
      } else {
        input.type = type;
      }
      if (id !== 'message') {
        input.autocomplete = id === 'phone' ? 'tel' : id;
      }
      form.append(label, input);
    }
    const whatsapp = /^\d{8,15}$/.test(siteSettings.contact.whatsapp);
    const send = createElement(
      'button',
      'button',
      translations[currentLanguage][whatsapp ? 'send' : 'emailSend'],
    );
    send.type = 'submit';
    const result = createElement('p', 'form-feedback');
    result.setAttribute('role', 'status');
    result.hidden = true;
    form.append(
      send,
      createElement('p', 'muted', translations[currentLanguage].formNote),
      result,
    );
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) {
        return;
      }
      const data = new FormData(form);
      if (['name', 'email', 'phone', 'message'].some((k) => !data.get(k).trim())) {
        form.reportValidity();
        return;
      }
      const message = ['name', 'email', 'phone', 'message']
        .map((k) => translations[currentLanguage][k] + ': ' + data.get(k).trim())
        .join('\n');
      if (whatsapp) {
        const opened = window.open(
          'https://wa.me/' +
            siteSettings.contact.whatsapp +
            '?text=' +
            encodeURIComponent(message),
          '_blank',
        );
        if (opened) {
          opened.opener = null;
        }
        result.textContent = opened
          ? translations[currentLanguage].formNote
          : translations[currentLanguage].popup;
      } else {
        window.location.href =
          'mailto:' +
          encodeURIComponent(siteSettings.contact.email) +
          '?subject=' +
          encodeURIComponent(
            currentLanguage === 'ar'
              ? 'استفسار من موقع مدار تك'
              : 'Madar Tech website inquiry',
          ) +
          '&body=' +
          encodeURIComponent(message);
        result.textContent = translations[currentLanguage].emailReady;
      }
      result.hidden = false;
    });
    return form;
  }
  // عرض القسم حسب نوعه: تعريف، خدمات، برامج، مميزات أو تواصل.
  function createSection(sectionData, index) {
    const section = createElement(
      'section',
      'content-section' +
        (sectionData.type === 'features'
          ? ' feature-section'
          : index % 2 === 0
            ? ' soft'
            : ''),
    );
    section.id = sectionData.id;
    const wrap = createElement('div', 'wrap');
    section.append(wrap);
    const heading = createElement(
      'div',
      sectionData.type === 'contact' ? 'contact-copy' : '',
    );
    const kicker = createElement(
      'span',
      'section-kicker',
      String(index + 1).padStart(2, '0') + ' / ' + translate(sectionData.nav),
    );
    const title = createElement('h2', '', translate(sectionData.title));
    const body = createElement('p', '', translate(sectionData.body));
    heading.append(kicker, title, body);
    const items = sectionData.items.filter((i) => i.published);
    if (sectionData.type === 'about') {
      const grid = createElement('div', 'about-grid');
      heading.className = 'about-body';
      const values = createElement('div', 'about-values');
      items.forEach((item, i) => {
        const v = createElement('article', 'value');
        const content = createElement('div');
        content.append(
          createElement('h3', '', translate(item.title)),
          createElement('p', '', translate(item.body)),
        );
        v.append(
          createElement('span', 'value-num', String(i + 1).padStart(2, '0')),
          content,
        );
        values.append(v);
      });
      grid.append(heading, values);
      wrap.append(grid);
    } else if (sectionData.type === 'contact') {
      const grid = createElement('div', 'contact-grid');
      heading.append(createContactDetails());
      grid.append(heading, createContactForm(sectionData.id));
      wrap.append(grid);
    } else if (sectionData.type === 'text') {
      heading.className = 'text-section';
      wrap.append(heading);
      items.forEach((i) => {
        const v = createElement('article', 'value');
        const content = createElement('div');
        content.append(
          createElement('h3', '', translate(i.title)),
          createElement('p', '', translate(i.body)),
        );
        v.append(content);
        wrap.append(v);
      });
    } else {
      const head = createElement('div', 'section-heading');
      const left = createElement('div');
      left.append(kicker, title);
      head.append(left, body);
      wrap.append(head);
      const grid = createElement(
        sectionData.type === 'features' ? 'ul' : 'div',
        sectionData.type === 'programs'
          ? 'program-grid'
          : sectionData.type === 'features'
            ? 'feature-grid'
            : 'cards-grid',
      );
      const icons = ['⌘', '◈', '▤', '✳'];
      items.forEach((item, i) => {
        if (sectionData.type === 'features') {
          const li = createElement('li');
          const d = createElement('div');
          d.append(createElement('strong', '', translate(item.title)));
          if (translate(item.body)) {
            d.append(createElement('p', '', translate(item.body)));
          }
          li.append(createElement('span', 'check', '✓'), d);
          grid.append(li);
          return;
        }
        const card = createElement(
          'article',
          sectionData.type === 'programs' ? 'program-card' : 'service-card',
        );
        if (sectionData.type === 'programs') {
          const art = createElement('div', 'program-art');
          art.setAttribute('aria-hidden', 'true');
          art.append(
            createElement('small', '', 'MADAR / ' + String(i + 1).padStart(2, '0')),
            createElement('span', '', ['</>', 'AI', '⌘'][i % 3]),
          );
          const info = createElement('div', 'program-info');
          info.append(
            createElement('h3', '', translate(item.title)),
            createElement('p', '', translate(item.body)),
            createLink(translations[currentLanguage].learn, getContactUrl(), 'text-link'),
          );
          card.append(art, info);
        } else {
          const icon = createElement('span', 'service-icon', icons[i % icons.length]);
          icon.setAttribute('aria-hidden', 'true');
          card.append(
            icon,
            createElement('h3', '', translate(item.title)),
            createElement('p', '', translate(item.body)),
          );
        }
        grid.append(card);
      });
      wrap.append(grid);
      if (!items.length && sectionData.type === 'programs') {
        wrap.append(createElement('p', 'empty', translations[currentLanguage].empty));
      }
    }
    return section;
  }
  // تحديث الصفحة من بيانات الموقع واللغة المختارة.
  function renderHomepage() {
    siteStore.apply(siteSettings, currentTheme);
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.title =
      translate(siteSettings.brand) + ' | ' + translate(siteSettings.hero.eyebrow);
    document.querySelector('meta[name=description]').content = translate(
      siteSettings.hero.body,
    );
    getElement('language').textContent = currentLanguage === 'ar' ? 'English' : 'العربية';
    getElement('language').lang = currentLanguage === 'ar' ? 'en' : 'ar';
    getElement('theme').textContent = currentTheme === 'dark' ? '☀' : '◐';
    getElement('theme').setAttribute(
      'aria-label',
      translations[currentLanguage][currentTheme === 'dark' ? 'light' : 'dark'],
    );
    getElement('theme').setAttribute('aria-pressed', String(currentTheme === 'dark'));
    getElement('skip').textContent = translations[currentLanguage].skip;
    getElement('menuBtn').setAttribute('aria-label', translations[currentLanguage].menu);
    getElement('menu').setAttribute('aria-label', translations[currentLanguage].nav);
    getElement('menu').replaceChildren(
      createLink(translations[currentLanguage].home, '#home'),
      ...getPublishedSections().map((s) => createLink(translate(s.nav), '#' + s.id)),
    );
    for (const key of ['eyebrow', 'title', 'body'])
      getElement('hero' + key[0].toUpperCase() + key.slice(1)).textContent = translate(
        siteSettings.hero[key],
      );
    const program = findPublishedSection('programs');
    getElement('heroActions').replaceChildren(
      ...(program
        ? [createLink(translations[currentLanguage].more, '#' + program.id, 'button')]
        : []),
      createLink(
        translations[currentLanguage].contact,
        getContactUrl(),
        'button secondary',
      ),
    );
    getElement('heroNote').textContent = translations[currentLanguage].space;
    getElement('sceneTag').textContent = translations[currentLanguage].tag;
    const services = findPublishedSection('cards');
    const visibleServices = services ? services.items.filter((i) => i.published) : [];
    getElement('floatOne').textContent = visibleServices[0]
      ? translate(visibleServices[0].title)
      : translations[currentLanguage].strip[0];
    getElement('floatTwo').textContent = visibleServices[1]
      ? translate(visibleServices[1].title)
      : translations[currentLanguage].strip[1];
    getElement('identityStrip').replaceChildren(
      ...translations[currentLanguage].strip.map((text) =>
        createElement('span', '', text),
      ),
    );
    getElement('sections').replaceChildren(...getPublishedSections().map(createSection));
    animateVisibleSections();
    getElement('footerTagline').textContent = translate(siteSettings.tagline);
    getElement('dashboardLink').textContent = translations[currentLanguage].dashboard;
    getElement('dashboardTopLink').textContent = translations[currentLanguage].dashboard;
    getElement('footerEmail').textContent = siteSettings.contact.email;
    getElement('footerEmail').href = 'mailto:' + siteSettings.contact.email;
    getElement('instagram').href = /^https:\/\/(www\.)?instagram\.com\//i.test(
      siteSettings.contact.instagram,
    )
      ? siteSettings.contact.instagram
      : 'https://www.instagram.com/';
    getElement('footerAddress').textContent = translate(siteSettings.contact.address);
    getElement('copyright').textContent =
      '© ' +
      new Date().getFullYear() +
      ' ' +
      translate(siteSettings.brand) +
      ' · ' +
      translations[currentLanguage].copyright;
  }
  function loadAndRenderHomepage() {
    try {
      siteSettings = siteStore.load();
      showNotice('');
    } catch (_) {
      siteSettings = siteStore.defaults();
      showNotice(translations[currentLanguage].loadError);
    }
    renderHomepage();
  }
  // أحداث اللغة والمظهر والقائمة وتحديثات التخزين.
  getElement('language').onclick = () => {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    siteStore.setPref('language', currentLanguage);
    renderHomepage();
  };
  getElement('theme').onclick = () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    siteStore.setPref('homepage-theme-v3', currentTheme);
    siteStore.setPref('theme', currentTheme);
    siteStore.apply(siteSettings, currentTheme);
    getElement('theme').setAttribute('aria-pressed', String(currentTheme === 'dark'));
    getElement('theme').setAttribute(
      'aria-label',
      translations[currentLanguage][currentTheme === 'dark' ? 'light' : 'dark'],
    );
    getElement('theme').textContent = currentTheme === 'dark' ? '☀' : '◐';
  };
  getElement('menuBtn').onclick = () => {
    getElement('menuBtn').setAttribute(
      'aria-expanded',
      String(getElement('menu').classList.toggle('open')),
    );
  };
  getElement('menu').addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      getElement('menu').classList.remove('open');
      getElement('menuBtn').setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      getElement('menu').classList.remove('open');
      getElement('menuBtn').setAttribute('aria-expanded', 'false');
    }
  });
  window.addEventListener('storage', (e) => {
    if (e.key === siteStore.key || e.key === null) {
      loadAndRenderHomepage();
    }
  });
  window.addEventListener('madar:change', loadAndRenderHomepage);
  loadAndRenderHomepage();
})();
