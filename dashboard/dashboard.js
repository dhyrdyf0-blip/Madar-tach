(function () {
  'use strict';

  // حالة الصفحة والبيانات المشتركة مع الموقع.
  const siteStore = MadarSite;
  const dashboardLocale = window.DashboardLocale;
  const translateDashboard = dashboardLocale.translate;
  const getElement = (id) => document.getElementById(id);
  const currentPage = document.body.dataset.page;
  let siteSettings;
  let hasUnsavedChanges = false;
  let autoSaveTimer;
  let isEditingBlocked = false;
  let selectedTheme = siteStore.pref('theme', 'light');
  let fieldCounter = 0;
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
  function updateSaveStatus(text) {
    getElement('status').textContent = text;
  }
  function showError(text) {
    getElement('error').hidden = !text;
    getElement('error').textContent = text;
  }
  // التحقق والحفظ التلقائي.
  function saveChanges() {
    clearTimeout(autoSaveTimer);
    if (isEditingBlocked) {
      return false;
    }
    if (
      siteStore.contrast(siteSettings.colors.navy, siteSettings.colors.white) < 4.5 ||
      siteStore.contrast(siteSettings.colors.navy, siteSettings.colors.lime) < 4.5
    ) {
      showError(
        translateDashboard('ألوان النص والخلفيات بحاجة لتباين أوضح. لم يتم الحفظ.'),
      );
      return false;
    }
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteSettings.contact.email) ||
      (siteSettings.contact.whatsapp && !/^\d{8,15}$/.test(siteSettings.contact.whatsapp))
    ) {
      showError(
        translateDashboard(
          'تحقق من البريد ورقم واتساب الدولي (8 إلى 15 رقمًا، أو اتركه فارغًا).',
        ),
      );
      return false;
    }
    try {
      siteStore.save(siteSettings);
      hasUnsavedChanges = false;
      showError('');
      updateSaveStatus(
        translateDashboard('✓ محفوظ محليًا · ') +
          new Date().toLocaleTimeString(dashboardLocale.language, {
            hour: '2-digit',
            minute: '2-digit',
          }),
      );
      siteStore.apply(siteSettings, selectedTheme);
      return true;
    } catch (_) {
      showError(
        translateDashboard('تعذّر الحفظ؛ صدّر نسخة من تعديلاتك وتحقق من إعدادات التخزين.'),
      );
      return false;
    }
  }
  function scheduleSave() {
    hasUnsavedChanges = true;
    updateSaveStatus(translateDashboard('جارٍ حفظ التعديلات…'));
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(saveChanges, 450);
  }
  // أدوات صغيرة لبناء الحقول والأزرار دون تكرار.
  function createButton(text, onClick, className = 'small-button') {
    const buttonElement = createElement('button', className, text);
    buttonElement.type = 'button';
    buttonElement.onclick = onClick;
    return buttonElement;
  }
  function createLink(text, url, className) {
    const linkElement = createElement('a', className, text);
    linkElement.href = url;
    return linkElement;
  }
  function createField(
    label,
    value,
    onChange,
    { multi: isMultiline = false, type = 'text', dir: direction } = {},
  ) {
    const labelElement = createElement('label', 'field', label);
    const inputElement = createElement(isMultiline ? 'textarea' : 'input');
    inputElement.id = 'field-' + ++fieldCounter;
    if (!isMultiline) {
      inputElement.type = type;
    }
    inputElement.value = value;
    inputElement.maxLength = isMultiline ? 6000 : 300;
    if (isMultiline) {
      inputElement.rows = 3;
    }
    if (direction) {
      inputElement.dir = direction;
    }
    inputElement.oninput = () => {
      onChange(inputElement.value);
      scheduleSave();
    };
    labelElement.append(inputElement);
    return labelElement;
  }
  function addBilingualFields(target, label, value, multi = false) {
    const fieldGroup = createElement('div', 'pair');
    fieldGroup.append(
      createField(
        label + translateDashboard(' · العربية'),
        value.ar,
        (v) => (value.ar = v),
        {
          multi,
          dir: 'rtl',
        },
      ),
      createField(label + ' · English', value.en, (v) => (value.en = v), {
        multi,
        dir: 'ltr',
      }),
    );
    target.append(fieldGroup);
  }
  function createVisibilityToggle(text, value, onChange) {
    const labelElement = createElement('label', 'check');
    const checkbox = createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = value;
    checkbox.onchange = () => {
      onChange(checkbox.checked);
      saveAndRender();
    };
    labelElement.append(checkbox, createElement('span', '', text));
    return labelElement;
  }
  function createPanel(title, subtitle) {
    const panelElement = createElement('section', 'panel');
    panelElement.append(createElement('h2', '', title));
    if (subtitle) {
      panelElement.append(createElement('p', 'muted', subtitle));
    }
    getElement('editor').append(panelElement);
    return panelElement;
  }
  function saveAndRender() {
    hasUnsavedChanges = true;
    saveChanges();
    renderPage();
  }
  // كل دالة تالية مسؤولة عن صفحة واحدة في لوحة التحكم.
  function renderStatistics() {
    const g = createElement('div', 'stats');
    const programs = siteSettings.sections
      .filter((s) => s.type === 'programs')
      .flatMap((s) => s.items);
    for (const [name, n, caption] of [
      [
        translateDashboard('أقسام الموقع'),
        siteSettings.sections.length,
        translateDashboard('محتوى قابل للتحرير'),
      ],
      [
        translateDashboard('برامج تدريبية'),
        programs.length,
        translateDashboard('بما فيها المسودات'),
      ],
      [
        translateDashboard('برامج ظاهرة'),
        siteSettings.sections
          .filter((s) => s.type === 'programs' && s.published)
          .flatMap((s) => s.items)
          .filter((p) => p.published).length,
        translateDashboard('ضمن أقسام ظاهرة'),
      ],
      [
        translateDashboard('أقسام ظاهرة'),
        siteSettings.sections.filter((s) => s.published).length,
        translateDashboard('في الصفحة الرئيسية'),
      ],
    ]) {
      const a = createElement('article', 'stat');
      a.append(
        createElement('span', '', name),
        createElement('strong', '', String(n)),
        createElement('small', '', caption),
      );
      g.append(a);
    }
    getElement('editor').append(g);
  }
  function renderOverview() {
    renderStatistics();
    const g = createElement('div', 'quick-grid');
    for (const [href, icon, title, body] of [
      [
        'programs.html',
        '▤',
        translateDashboard('برامجك، في مكان واحد'),
        translateDashboard('أضف البرامج وحرّر تفاصيلها وحالة ظهورها.'),
      ],
      [
        'content.html',
        '✳',
        translateDashboard('محتوى يصنع الفرق'),
        translateDashboard('عدّل الواجهة والأقسام، ورتّب قصتك كما تريد.'),
      ],
      [
        'identity.html',
        '◈',
        translateDashboard('هوية تشبه مدار تك'),
        translateDashboard('لوحة ألوان موحدة واسم ووصف للمؤسسة.'),
      ],
      [
        'contact.html',
        '↗',
        translateDashboard('تواصل أسهل'),
        translateDashboard('اضبط البريد وواتساب والعنوان.'),
      ],
    ]) {
      const a = createLink('', href, 'quick-card');
      a.append(
        createElement('span', 'quick-icon', icon),
        createElement('h2', '', title),
        createElement('p', 'muted', body),
        createElement('span', 'quick-arrow', '↗'),
      );
      g.append(a);
    }
    getElement('editor').append(g);
    const p = createPanel(
      translateDashboard('محتوى الموقع الآن'),
      translateDashboard('انتقل إلى صفحة المحتوى لتغيير ترتيب الأقسام أو ظهورها.'),
    );
    for (const s of siteSettings.sections) {
      const r = createElement('div', 'overview-row');
      r.append(
        createElement('strong', '', siteStore.translate(s.nav, dashboardLocale.language)),
        createElement(
          'span',
          'badge',
          s.published ? translateDashboard('ظاهر') : translateDashboard('مسودة'),
        ),
      );
      p.append(r);
    }
  }
  function renderIdentity() {
    const p = createPanel(
      translateDashboard('ألوان الهوية'),
      translateDashboard('تُطبّق الألوان بعد حفظها تلقائيًا، مع التحقق من تباين النص.'),
    );
    const g = createElement('div', 'color-grid');
    for (const [k, label] of [
      ['navy', translateDashboard('الكحلي')],
      ['white', translateDashboard('الأبيض')],
      ['lime', translateDashboard('الأخضر الليموني')],
    ])
      g.append(
        createField(label, siteSettings.colors[k], (v) => (siteSettings.colors[k] = v), {
          type: 'color',
        }),
      );
    p.append(g);
    const b = createPanel(translateDashboard('اسم المؤسسة ووصفها'));
    addBilingualFields(b, translateDashboard('اسم المؤسسة'), siteSettings.brand);
    addBilingualFields(b, translateDashboard('وصف التذييل'), siteSettings.tagline, true);
  }
  function renderContact() {
    const p = createPanel(
      translateDashboard('قنوات التواصل'),
      translateDashboard(
        'رقم واتساب دولي دون +. عند تركه فارغًا يستخدم نموذج التواصل البريد الإلكتروني.',
      ),
    );
    p.append(
      createField(
        translateDashboard('البريد الإلكتروني'),
        siteSettings.contact.email,
        (v) => (siteSettings.contact.email = v),
        {
          type: 'email',
          dir: 'ltr',
        },
      ),
      createField(
        translateDashboard('رقم واتساب'),
        siteSettings.contact.whatsapp,
        (v) => (siteSettings.contact.whatsapp = v),
        {
          type: 'tel',
          dir: 'ltr',
        },
      ),
      createField(
        translateDashboard('رابط Instagram'),
        siteSettings.contact.instagram,
        (v) => (siteSettings.contact.instagram = v),
        {
          type: 'url',
          dir: 'ltr',
        },
      ),
    );
    addBilingualFields(p, translateDashboard('عنوان التواصل'), siteSettings.contact.address);
  }
  // محرر القسم وبطاقاته، مستخدم في صفحتي البرامج والمحتوى.
  function createSectionEditor(section, index, openIds) {
    const details = createElement('details', 'section-editor');
    details.dataset.id = section.id;
    details.open = openIds.has(section.id);
    const summary = createElement('summary');
    summary.append(
      createElement(
        'strong',
        '',
        siteStore.translate(section.nav, dashboardLocale.language) ||
          translateDashboard('قسم جديد'),
      ),
      createElement(
        'span',
        'badge',
        section.published ? translateDashboard('ظاهر') : translateDashboard('مسودة'),
      ),
    );
    details.append(summary);
    const body = createElement('div', 'section-body');
    const actions = createElement('div', 'actions');
    actions.append(
      createVisibilityToggle(
        translateDashboard('إظهار القسم'),
        section.published,
        (v) => (section.published = v),
      ),
    );
    const up = createButton('↑', () => {
      [siteSettings.sections[index - 1], siteSettings.sections[index]] = [
        siteSettings.sections[index],
        siteSettings.sections[index - 1],
      ];
      saveAndRender();
    });
    up.disabled = index === 0;
    up.setAttribute('aria-label', translateDashboard('نقل القسم للأعلى'));
    const down = createButton('↓', () => {
      [siteSettings.sections[index + 1], siteSettings.sections[index]] = [
        siteSettings.sections[index],
        siteSettings.sections[index + 1],
      ];
      saveAndRender();
    });
    down.disabled = index === siteSettings.sections.length - 1;
    down.setAttribute('aria-label', translateDashboard('نقل القسم للأسفل'));
    actions.append(
      up,
      down,
      createButton(
        translateDashboard('حذف القسم'),
        () => {
          if (confirm(translateDashboard('حذف القسم وجميع بطاقاته؟'))) {
            siteSettings.sections.splice(index, 1);
            saveAndRender();
          }
        },
        'delete',
      ),
    );
    body.append(actions);
    addBilingualFields(body, translateDashboard('اسم القسم'), section.nav);
    addBilingualFields(body, translateDashboard('العنوان'), section.title, true);
    addBilingualFields(body, translateDashboard('الوصف'), section.body, true);
    if (section.type !== 'contact') {
      body.append(
        createElement(
          'h3',
          '',
          section.type === 'programs'
            ? translateDashboard('البرامج التدريبية')
            : translateDashboard('البطاقات'),
        ),
      );
      section.items.forEach((item, n) => {
        const card = createElement('article', 'item-editor');
        const tools = createElement('div', 'actions');
        tools.append(
          createElement(
            'strong',
            '',
            (section.type === 'programs'
              ? translateDashboard('برنامج ')
              : translateDashboard('بطاقة ')) +
              (n + 1),
          ),
          createVisibilityToggle(
            translateDashboard('ظاهر'),
            item.published,
            (v) => (item.published = v),
          ),
          createButton(
            translateDashboard('حذف'),
            () => {
              if (confirm(translateDashboard('حذف هذه البطاقة؟'))) {
                section.items.splice(n, 1);
                saveAndRender();
              }
            },
            'delete',
          ),
        );
        card.append(tools);
        addBilingualFields(card, translateDashboard('العنوان'), item.title);
        addBilingualFields(card, translateDashboard('المحتوى'), item.body, true);
        body.append(card);
      });
      const add = createButton(
        section.type === 'programs'
          ? translateDashboard('＋ إضافة برنامج')
          : translateDashboard('＋ إضافة بطاقة'),
        () => {
          section.items.push({
            id: 'item-' + crypto.randomUUID(),
            title: siteStore.pair('عنوان جديد', 'New title'),
            body: siteStore.pair('اكتب المحتوى.', 'Write your content.'),
            published: false,
          });
          saveAndRender();
        },
        'button secondary',
      );
      add.disabled = section.items.length >= 60;
      body.append(add);
    }
    details.append(body);
    return details;
  }
  function renderContentSections(openIds) {
    if (currentPage === 'content') {
      const h = createPanel(translateDashboard('الواجهة الرئيسية'));
      addBilingualFields(h, translateDashboard('عبارة قصيرة'), siteSettings.hero.eyebrow);
      addBilingualFields(
        h,
        translateDashboard('العنوان الرئيسي'),
        siteSettings.hero.title,
        true,
      );
      addBilingualFields(
        h,
        translateDashboard('الوصف الرئيسي'),
        siteSettings.hero.body,
        true,
      );
    }
    const contentPanel = createPanel(
      currentPage === 'programs'
        ? translateDashboard('إدارة البرامج التدريبية')
        : translateDashboard('إدارة أقسام الموقع'),
      translateDashboard(
        'الأقسام والبطاقات الجديدة تُضاف كمسودات؛ فعّل ظهورها عندما تكون جاهزة.',
      ),
    );
    const actions = createElement('div', 'add-section');
    const select = createElement('select');
    select.setAttribute('aria-label', translateDashboard('نوع القسم'));
    for (const [k, label] of currentPage === 'programs'
      ? [['programs', translateDashboard('مجموعة برامج')]]
      : [
          ['text', translateDashboard('قسم نصي')],
          ['cards', translateDashboard('خدمات')],
          ['about', translateDashboard('من نحن')],
          ['features', translateDashboard('مميزات')],
          ['contact', translateDashboard('تواصل')],
        ]) {
      const o = createElement('option', '', label);
      o.value = k;
      select.append(o);
    }
    const add = createButton(
      translateDashboard('＋ إضافة قسم'),
      () => {
        const s = {
          id: 'section-' + crypto.randomUUID(),
          type: select.value,
          nav: siteStore.pair('قسم جديد', 'New section'),
          title: siteStore.pair('عنوان جديد', 'New title'),
          body: siteStore.pair('وصف القسم.', 'Section description.'),
          published: false,
          items: [],
        };
        siteSettings.sections.push(s);
        openIds.add(s.id);
        hasUnsavedChanges = true;
        saveChanges();
        renderPage(openIds);
      },
      'button',
    );
    add.disabled = siteSettings.sections.length >= 30;
    actions.append(select, add);
    contentPanel.append(actions);
    let count = 0;
    siteSettings.sections.forEach((s, i) => {
      if ((currentPage === 'programs') === (s.type === 'programs')) {
        contentPanel.append(createSectionEditor(s, i, openIds));
        count++;
      }
    });
    if (!count) {
      contentPanel.append(
        createElement(
          'p',
          'empty',
          translateDashboard('لا توجد أقسام هنا بعد. أضف قسمًا للبدء.'),
        ),
      );
    }
  }
  function renderBackup() {
    const p = createPanel(
      translateDashboard('نسخة من عملك، دائمًا معك'),
      translateDashboard(
        'التصدير ينزّل ملف JSON للإعدادات. الاستيراد يستبدل بيانات هذا المتصفح فقط بعد تأكيدك.',
      ),
    );
    const actions = createElement('div', 'actions');
    actions.append(
      createButton(translateDashboard('تصدير الإعدادات ↓'), exportSettings, 'button'),
    );
    const input = createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.id = 'importFile';
    input.onchange = async () => {
      const f = input.files[0];
      if (!f) {
        return;
      }
      try {
        if (f.size > 1000000) {
          throw Error(translateDashboard('حجم الملف كبير.'));
        }
        const data = JSON.parse(await f.text());
        if (!siteStore.validate(data)) {
          throw Error(translateDashboard('صيغة الإعدادات غير صالحة.'));
        }
        if (!confirm(translateDashboard('استبدال البيانات الحالية؟'))) {
          return;
        }
        const old = siteSettings;
        siteSettings = data;
        isEditingBlocked = false;
        if (!saveChanges()) {
          siteSettings = old;
          return;
        }
        renderPage();
      } catch (e) {
        showError(translateDashboard('تعذّر الاستيراد: ') + e.message);
      } finally {
        input.value = '';
      }
    };
    const label = createElement(
      'label',
      'file-label',
      translateDashboard('استيراد ملف الإعدادات'),
    );
    label.htmlFor = input.id;
    actions.append(label, input);
    p.append(actions);
    const reset = createPanel(
      translateDashboard('استعادة المحتوى الافتراضي'),
      translateDashboard('صدّر نسخة أولًا إذا أردت الاحتفاظ بتعديلاتك.'),
    );
    reset.append(
      createButton(
        translateDashboard('استعادة المحتوى الافتراضي'),
        () => {
          if (
            confirm(
              translateDashboard('استبدال بيانات الموقع المحلية بالمحتوى الافتراضي؟'),
            )
          ) {
            const old = siteSettings;
            siteSettings = siteStore.defaults();
            isEditingBlocked = false;
            if (!saveChanges()) {
              siteSettings = old;
              return;
            }
            renderPage();
          }
        },
        'delete',
      ),
    );
  }
  function exportSettings() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(siteSettings, null, 2)], {
        type: 'application/json',
      }),
    );
    const downloadLink = createLink('', '', null);
    downloadLink.href = url;
    downloadLink.download = 'madar-site-settings.json';
    downloadLink.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  // اختيار الصفحة المطلوبة فقط، وليس إخفاء صفحات كاملة في HTML.
  function renderPage(openIds) {
    openIds =
      openIds ||
      new Set([...document.querySelectorAll('details[open]')].map((x) => x.dataset.id));
    getElement('editor').replaceChildren();
    if (currentPage === 'overview') {
      renderOverview();
    } else if (currentPage === 'identity') {
      renderIdentity();
    } else if (currentPage === 'contact') {
      renderContact();
    } else if (currentPage === 'backup') {
      renderBackup();
    } else {
      renderContentSections(openIds);
    }
    getElement('editor').disabled = isEditingBlocked;
    siteStore.apply(siteSettings, selectedTheme);
  }
  // ربط أحداث المستخدم والتنقل بين الصفحات.
  getElement('saveNow').onclick = saveChanges;
  getElement('exportDraft').onclick = exportSettings;
  getElement('theme').onclick = () => {
    selectedTheme = selectedTheme === 'dark' ? 'light' : 'dark';
    siteStore.setPref('theme', selectedTheme);
    siteStore.apply(siteSettings, selectedTheme);
    getElement('theme').setAttribute('aria-pressed', String(selectedTheme === 'dark'));
  };
  getElement('navToggle').onclick = () => {
    const open = document.body.classList.toggle('nav-open');
    getElement('navToggle').setAttribute('aria-expanded', String(open));
  };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.body.classList.remove('nav-open');
      getElement('navToggle').setAttribute('aria-expanded', 'false');
    }
  });
  getElement('editorForm').onsubmit = (e) => {
    e.preventDefault();
    saveChanges();
  };
  document.querySelectorAll('a[href]').forEach((a) =>
    a.addEventListener('click', (e) => {
      if (
        hasUnsavedChanges &&
        !saveChanges() &&
        !confirm(translateDashboard('التعديلات لم تُحفظ. هل تريد مغادرة الصفحة؟'))
      ) {
        e.preventDefault();
      }
    }),
  );
  window.addEventListener('beforeunload', (e) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
  // حماية التعديلات عند فتح اللوحة في أكثر من نافذة.
  window.addEventListener('storage', (e) => {
    if (e.key === 'madar.language') {
      dashboardLocale.refresh();
      renderPage();
      updateSaveStatus(
        translateDashboard(
          hasUnsavedChanges ? 'جارٍ حفظ التعديلات…' : 'جاهز · حفظ تلقائي',
        ),
      );
      return;
    }
    if (e.key !== siteStore.key && e.key !== null) {
      return;
    }
    if (hasUnsavedChanges) {
      isEditingBlocked = true;
      clearTimeout(autoSaveTimer);
      getElement('editor').disabled = true;
      showError(
        translateDashboard(
          'تغيّرت البيانات من نافذة أخرى. صدّر مسودتك من زر «تصدير المسودة» ثم أعد تحميل الصفحة.',
        ),
      );
      updateSaveStatus(translateDashboard('توقف الحفظ لتجنب استبدال تعديلاتك'));
      return;
    }
    try {
      siteSettings = siteStore.load();
      renderPage();
      updateSaveStatus(translateDashboard('تم تحميل التحديث من نافذة أخرى.'));
    } catch (_) {
      isEditingBlocked = true;
      getElement('editor').disabled = true;
      showError(translateDashboard('تعذّر قراءة البيانات الجديدة. أعد تحميل الصفحة.'));
    }
  });
  try {
    siteSettings = siteStore.load();
    updateSaveStatus(translateDashboard('جاهز · حفظ تلقائي'));
  } catch (_) {
    siteSettings = siteStore.defaults();
    isEditingBlocked = true;
    showError(
      translateDashboard(
        'تعذّر قراءة التخزين؛ لم تُستبدل بياناتك. تحقق من إعدادات المتصفح.',
      ),
    );
    updateSaveStatus(translateDashboard('تعذّر تحميل البيانات'));
  }
  renderPage();
  getElement('theme').setAttribute('aria-pressed', String(selectedTheme === 'dark'));
})();
