/* Shared local program data. No server or authentication is provided. */
(function () {
  'use strict';

  const storageKey = 'madar.programs.v1';
  const defaults = [
    {
      id: 'frontend',
      title: 'Front-End Development',
      description: 'تعلم أساسيات تطوير واجهات المواقع الإلكترونية.',
      status: 'published',
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      description: 'التعرف على أدوات الذكاء الاصطناعي وتطبيقاتها العملية.',
      status: 'published',
    },
    {
      id: 'digital',
      title: 'Digital Skills',
      description: 'تطوير المهارات الرقمية واستخدام الأدوات التقنية.',
      status: 'published',
    },
  ];
  function isValidProgramList(items) {
    return (
      Array.isArray(items) &&
      items.every(
        (p) =>
          p &&
          typeof p.id === 'string' &&
          typeof p.title === 'string' &&
          typeof p.description === 'string' &&
          ['draft', 'published'].includes(p.status),
      ) &&
      new Set(items.map((p) => p.id)).size === items.length
    );
  }
  function loadPrograms() {
    const raw = localStorage.getItem(storageKey);
    if (raw === null) {
      return defaults.map((p) => ({
        ...p,
      }));
    }
    const items = JSON.parse(raw);
    if (!isValidProgramList(items)) {
      throw new Error('Invalid program data');
    }
    return items;
  }
  function savePrograms(items) {
    if (!isValidProgramList(items)) {
      throw new Error('Invalid program data');
    }
    localStorage.setItem(storageKey, JSON.stringify(items));
  }
  window.MadarPrograms = {
    key: storageKey,
    load: loadPrograms,
    save: savePrograms,
  };
  function renderPrograms() {
    const target = document.querySelector('#programs .row');
    if (!target) {
      return;
    }
    let items;
    try {
      items = loadPrograms();
    } catch (_) {
      return;
    } // Retain original cards if storage is unavailable.
    target.replaceChildren();
    items
      .filter((p) => p.status === 'published')
      .forEach((p) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        const card = document.createElement('div');
        card.className = 'card';
        const body = document.createElement('div');
        body.className = 'card-body';
        const title = document.createElement('h3');
        title.className = 'card-title';
        title.dir = 'auto';
        title.textContent = p.title;
        const desc = document.createElement('p');
        desc.className = 'card-text';
        desc.textContent = p.description;
        const link = document.createElement('a');
        link.href = '#contact';
        link.className = 'btn btn-dark-blue';
        link.textContent = 'اعرف المزيد';
        body.append(title, desc, link);
        card.append(body);
        col.append(card);
        target.append(col);
      });
    if (!target.children.length) {
      const empty = document.createElement('p');
      empty.textContent = 'سيتم الإعلان عن برامج جديدة قريبًا.';
      target.append(empty);
    }
  }
  renderPrograms();
  window.addEventListener('storage', (e) => {
    if (e.key === storageKey || e.key === null) {
      renderPrograms();
    }
  });
})();
