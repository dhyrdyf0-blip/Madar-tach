/* Shared site model: browser-local editing, bilingual text, and legacy program migration. */
(function () {
  'use strict';
  const key = 'madar.site.v2';
  const pair = (ar, en) => ({ar, en});
  const card = (id, ar, en, da, de) => ({id, title:pair(ar,en), body:pair(da,de), published:true});
  const defaults = {
    version:2,
    colors:{navy:'#03213D',white:'#FFFFFF',lime:'#D5E159'},
    brand:pair('مدار تك','Madar Tech'),
    tagline:pair('مساحة للتعلّم، التطور، وصناعة الفرص.','A space to learn, grow, and create opportunities.'),
    contact:{email:'madartech1@gmail.com',whatsapp:'',instagram:'https://www.instagram.com/madar_tech0',address:pair('خانيونس – بجانب المحكمة الشرعية.','Khan Younis – next to the Sharia Court.')},
    hero:{eyebrow:pair('تعلّم. تواصل. انطلق.','LEARN. CONNECT. GROW.'),title:pair('مساحتك للتعلّم،\nوصناعة الفرص.','Your space to learn.\nYour place to grow.'),body:pair('في مدار تك، نربط المعرفة بالتطبيق. بيئة تعليمية وتدريبية في خانيونس تساعدك على تطوير مهاراتك، واكتشاف إمكاناتك، وبناء خطوتك القادمة.','At Madar Tech, knowledge meets practice. Discover a learning and training space in Khan Younis to develop your skills, explore your potential, and take your next step.')},
    sections:[
      {id:'about',type:'about',nav:pair('من نحن','About'),title:pair('نتعلم اليوم،\nلنصنع فرص الغد.','Learning today.\nCreating tomorrow.'),body:pair('مؤسسة تعليمية وتدريبية تجمع بين المعرفة الأكاديمية والتطبيق العملي، من خلال برامج وأنشطة تساعد الطلاب والخريجين والشباب على مواكبة متطلبات سوق العمل.','An education and training organization bringing academic knowledge into practice through programs and activities for students, graduates, and young people.'),published:true,items:[card('vision','رؤيتنا','Our vision','جيل يمتلك المعرفة والمهارة والقدرة على صناعة الفرص.','A generation equipped with the knowledge and skills to create opportunities.'),card('mission','رسالتنا','Our mission','فرص تعليم وتدريب تساعدك على تحويل المعرفة إلى تطبيق عملي.','Learning opportunities that help you turn knowledge into practical experience.')]},
      {id:'services',type:'cards',nav:pair('خدماتنا','Services'),title:pair('مكان واحد.\nإمكانات أكثر.','One space.\nMore possibilities.'),body:pair('كل ما تحتاجه للتعلّم والعمل وتبادل الأفكار.','Everything you need to learn, work, and exchange ideas.'),published:true,items:[card('training','التدريب والتطوير','Training & development','برامج تقنية ومهنية تجمع بين التعلّم والتطبيق.','Technical and professional programs built around learning by doing.'),card('cowork','مساحات العمل المشتركة','Coworking spaces','مساحة للطلاب والمستقلين وأصحاب المشاريع لإنجاز أعمالهم.','A place for students, freelancers, and founders to get things done.'),card('rooms','القاعات التدريبية','Training rooms','قاعات للدورات والاجتماعات والفعاليات التعليمية.','Rooms for training courses, meetings, and educational events.'),card('activities','الأنشطة التعليمية','Learning activities','لقاءات ومبادرات لتبادل المعرفة والخبرات.','Meetups and initiatives for sharing knowledge and experience.')]},
      {id:'programs',type:'programs',nav:pair('البرامج','Programs'),title:pair('مهارة جديدة،\nبداية مختلفة.','A new skill.\nA fresh start.'),body:pair('اختر مسارك، وابدأ رحلتك في عالم التقنية.','Find your path and start your journey into technology.'),published:true,items:[card('frontend','تطوير واجهات المواقع','Front-End Development','تعلّم أساسيات تطوير واجهات المواقع الإلكترونية.','Learn the fundamentals of building web interfaces.'),card('ai','الذكاء الاصطناعي','Artificial Intelligence','اكتشف أدوات الذكاء الاصطناعي وتطبيقاتها العملية.','Explore AI tools and their practical applications.'),card('digital','المهارات الرقمية','Digital Skills','طوّر مهاراتك الرقمية واستخدامك للأدوات التقنية.','Build your digital skills and confidence with technology.')]},
      {id:'why',type:'features',nav:pair('لماذا مدار تك؟','Why Madar?'),title:pair('بيئة التعلّم\nتصنع الفرق.','The right environment\nmakes a difference.'),body:pair('مساحة تساعدك على التركيز، وفريق يدعم خطوتك القادمة.','A space to focus, with support for your next step.'),published:true,items:[card('environment','بيئة تعليمية محفزة','An inspiring environment','',''),card('internet','إنترنت مستقر','Reliable internet','',''),card('power','كهرباء متوفرة','Available electricity','',''),card('practice','معرفة وتطبيق','Knowledge into practice','',''),card('network','تواصل وتبادل خبرات','Connections & shared experience','',''),card('guidance','دعم وتوجيه','Support & guidance','','')]},
      {id:'contact',type:'contact',nav:pair('تواصل معنا','Contact'),title:pair('خطوتك القادمة\nتبدأ بمحادثة.','Your next step\nstarts with a conversation.'),body:pair('عندك استفسار عن برامجنا أو خدماتنا؟ فريق مدار تك جاهز يساعدك.','Questions about our programs or services? The Madar Tech team is here to help.'),published:true,items:[]}
    ]
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  const text = p => p && typeof p.ar==='string' && typeof p.en==='string' && p.ar.length<=6000 && p.en.length<=6000;
  const hex = s => typeof s==='string' && /^#[0-9a-f]{6}$/i.test(s);
  const safeId = id => typeof id==='string' && /^[a-z][a-z0-9-]{0,79}$/.test(id);
  const kinds = ['about','cards','programs','features','text','contact'];
  function validate(s) {
    return !!(s && s.version===2 && s.colors && ['navy','white','lime'].every(k=>hex(s.colors[k])) && text(s.brand) && text(s.tagline) && s.hero && ['eyebrow','title','body'].every(k=>text(s.hero[k])) && s.contact && ['email','whatsapp','instagram'].every(k=>typeof s.contact[k]==='string' && s.contact[k].length<=300) && text(s.contact.address) && Array.isArray(s.sections) && s.sections.length<=30 && new Set(s.sections.map(x=>x.id)).size===s.sections.length && s.sections.every(x=>safeId(x.id) && !['home','main','menu'].includes(x.id) && kinds.includes(x.type) && typeof x.published==='boolean' && ['nav','title','body'].every(k=>text(x[k])) && Array.isArray(x.items) && x.items.length<=60 && new Set(x.items.map(i=>i.id)).size===x.items.length && x.items.every(i=>safeId(i.id) && text(i.title) && text(i.body) && typeof i.published==='boolean')));
  }
  function initial() {
    const s=clone(defaults), raw=localStorage.getItem('madar.programs.v1');
    if(raw!==null) {
      const old=JSON.parse(raw);
      if(!Array.isArray(old) || !old.every(p=>p && typeof p.id==='string' && typeof p.title==='string' && typeof p.description==='string' && ['published','draft'].includes(p.status))) throw Error('بيانات البرامج القديمة غير صالحة؛ لم يتم استبدالها.');
      s.sections.find(x=>x.type==='programs').items=old.map((p,i)=>({id:'legacy-'+i,title:pair(p.title,p.title),body:pair(p.description,''),published:p.status==='published'}));
    }
    return s;
  }
  function load() {const raw=localStorage.getItem(key), s=raw===null?initial():JSON.parse(raw);if(!validate(s)) throw Error('بيانات الموقع غير صالحة؛ لم يتم استبدالها.');return s;}
  function save(s) {if(!validate(s))throw Error('تعذّر حفظ بيانات غير صالحة.');localStorage.setItem(key,JSON.stringify(s));window.dispatchEvent(new Event('madar:change'));}
  function pref(k,fallback) {try{return localStorage.getItem('madar.'+k)||fallback;}catch(_){return fallback;}}
  function setPref(k,value){try{localStorage.setItem('madar.'+k,value);}catch(_){} }
  function apply(s, theme) {
    const root=document.documentElement;
    for(const [k,v] of Object.entries(s.colors))root.style.setProperty('--'+k,v);
    root.dataset.theme=theme==='dark'?'dark':'light';
  }
  function translate(p,language){return p[language]||p.ar||p.en;}
  function contrast(a,b) {
    const lum=h=>{const rgb=h.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
    const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);
  }
  window.MadarSite={key,defaults:()=>clone(defaults),load,save,validate,clone,pair,kinds,pref,setPref,apply,translate,contrast};
})();
