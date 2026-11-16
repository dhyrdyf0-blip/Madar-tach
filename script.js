(function(){
  'use strict';
  const S=window.MadarSite, $=id=>document.getElementById(id);
  let language=S.pref('language','ar')==='en'?'en':'ar';
  let theme=S.pref('theme',window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  let site;
  const ui={ar:{home:'الرئيسية',more:'اكتشف البرامج',contact:'تواصل معنا',learn:'اعرف المزيد',space:'خانيونس · تعلّم وتدريب وعمل مشترك',tag:'فضولك بداية كل فرصة ✳',strip:['تعلّم بالتطبيق','مساحات للعمل والتواصل','معرفة تصنع فرصًا'],dashboard:'لوحة التحكم',name:'الاسم',email:'البريد الإلكتروني',phone:'رقم الهاتف',message:'رسالتك',send:'إرسال عبر واتساب ↗',emailSend:'تجهيز رسالة بريد ↗',formNote:'سنفتح تطبيق التواصل لتراجع رسالتك وترسلها بنفسك.',emailReady:'تم تجهيز الرسالة في تطبيق البريد. أكمل الإرسال هناك.',popup:'تعذّر فتح نافذة واتساب؛ اسمح بالنوافذ المنبثقة ثم حاول مجددًا.',dark:'تفعيل الوضع الداكن',light:'تفعيل الوضع الفاتح',menu:'فتح القائمة',nav:'التنقل الرئيسي',skip:'انتقل للمحتوى',empty:'سيتم الإعلان عن برامج جديدة قريبًا.',copyright:'جميع الحقوق محفوظة',section:'قسم',loadError:'تعذّر قراءة تعديلات المتصفح. نعرض المحتوى الافتراضي دون تغيير بياناتك.'},en:{home:'Home',more:'Explore programs',contact:'Get in touch',learn:'Learn more',space:'Khan Younis · Learn, train & cowork',tag:'Curiosity is where opportunity begins ✳',strip:['Learn by doing','A space to work & connect','Knowledge into opportunity'],dashboard:'Dashboard',name:'Name',email:'Email address',phone:'Phone number',message:'Your message',send:'Continue on WhatsApp ↗',emailSend:'Prepare an email ↗',formNote:'Your messaging app will open so you can review and send your message.',emailReady:'Your message is ready in your email app. Complete sending it there.',popup:'WhatsApp could not open. Allow pop-ups and try again.',dark:'Enable dark mode',light:'Enable light mode',menu:'Open navigation',nav:'Main navigation',skip:'Skip to content',empty:'New programs will be announced soon.',copyright:'All rights reserved',section:'Section',loadError:'Could not read local edits. Showing default content without overwriting your data.'}};
  const t=p=>S.translate(p,language);
  const node=(tag,className,text)=>{const e=document.createElement(tag);if(className)e.className=className;if(text!==undefined)e.textContent=text;return e;};
  const link=(text,href,className)=>{const e=node('a',className,text);e.href=href;return e;};
  const published=()=>site.sections.filter(s=>s.published);
  const firstType=type=>published().find(s=>s.type===type);
  const contactHref=()=>{const s=firstType('contact');return s?'#'+s.id:'mailto:'+site.contact.email;};
  function notice(text){$('siteNotice').textContent=text;$('siteNotice').hidden=!text;}
  function contactDetails(){const d=node('div','contact-details');d.append(link(site.contact.email,'mailto:'+site.contact.email),node('span','',t(site.contact.address)));return d;}
  function contactForm(sectionId){
    const form=node('form','contact-form');form.id=sectionId+'-form';
    for(const [id,type] of [['name','text'],['email','email'],['phone','tel'],['message','textarea']]){
      const label=node('label','',ui[language][id]);label.htmlFor=sectionId+'-'+id;
      const input=node(type==='textarea'?'textarea':'input');input.id=sectionId+'-'+id;input.name=id;input.required=true;input.maxLength=id==='message'?2000:180;
      if(type==='textarea')input.rows=4;else input.type=type;
      if(id!=='message')input.autocomplete=id==='phone'?'tel':id;
      form.append(label,input);
    }
    const whatsapp=/^\d{8,15}$/.test(site.contact.whatsapp);
    const send=node('button','button',ui[language][whatsapp?'send':'emailSend']);send.type='submit';
    const result=node('p','form-feedback');result.setAttribute('role','status');result.hidden=true;
    form.append(send,node('p','muted',ui[language].formNote),result);
    form.addEventListener('submit',event=>{
      event.preventDefault();if(!form.reportValidity())return;
      const data=new FormData(form);if(['name','email','phone','message'].some(k=>!data.get(k).trim())){form.reportValidity();return;}const message=['name','email','phone','message'].map(k=>ui[language][k]+': '+data.get(k).trim()).join('\n');
      if(whatsapp){const opened=window.open('https://wa.me/'+site.contact.whatsapp+'?text='+encodeURIComponent(message),'_blank');if(opened)opened.opener=null;result.textContent=opened?ui[language].formNote:ui[language].popup;}
      else {window.location.href='mailto:'+encodeURIComponent(site.contact.email)+'?subject='+encodeURIComponent(language==='ar'?'استفسار من موقع مدار تك':'Madar Tech website inquiry')+'&body='+encodeURIComponent(message);result.textContent=ui[language].emailReady;}
      result.hidden=false;
    });
    return form;
  }
  function sectionView(s,index){
    const section=node('section','content-section'+(s.type==='features'?' feature-section':index%2===0?' soft':''));section.id=s.id;
    const wrap=node('div','wrap');section.append(wrap);
    const heading=node('div',s.type==='contact'?'contact-copy':'');
    const kicker=node('span','section-kicker',String(index+1).padStart(2,'0')+' / '+t(s.nav));
    const title=node('h2','',t(s.title)), body=node('p','',t(s.body));heading.append(kicker,title,body);
    const items=s.items.filter(i=>i.published);
    if(s.type==='about'){
      const grid=node('div','about-grid');heading.className='about-body';const values=node('div','about-values');
      items.forEach((item,i)=>{const v=node('article','value');const content=node('div');content.append(node('h3','',t(item.title)),node('p','',t(item.body)));v.append(node('span','value-num',String(i+1).padStart(2,'0')),content);values.append(v);});grid.append(heading,values);wrap.append(grid);
    }else if(s.type==='contact'){
      const grid=node('div','contact-grid');heading.append(contactDetails());grid.append(heading,contactForm(s.id));wrap.append(grid);
    }else if(s.type==='text'){
      heading.className='text-section';wrap.append(heading);
      items.forEach(i=>{const v=node('article','value');const content=node('div');content.append(node('h3','',t(i.title)),node('p','',t(i.body)));v.append(content);wrap.append(v);});
    }else{
      const head=node('div','section-heading');const left=node('div');left.append(kicker,title);head.append(left,body);wrap.append(head);
      const grid=node(s.type==='features'?'ul':'div',s.type==='programs'?'program-grid':s.type==='features'?'feature-grid':'cards-grid');
      const icons=['⌘','◈','▤','✳'];
      items.forEach((item,i)=>{
        if(s.type==='features'){const li=node('li');const d=node('div');d.append(node('strong','',t(item.title)));if(t(item.body))d.append(node('p','',t(item.body)));li.append(node('span','check','✓'),d);grid.append(li);return;}
        const card=node('article',s.type==='programs'?'program-card':'service-card');
        if(s.type==='programs'){
          const art=node('div','program-art');art.setAttribute('aria-hidden','true');art.append(node('small','','MADAR / '+String(i+1).padStart(2,'0')),node('span','',['</>','AI','⌘'][i%3]));
          const info=node('div','program-info');info.append(node('h3','',t(item.title)),node('p','',t(item.body)),link(ui[language].learn,contactHref(),'text-link'));card.append(art,info);
        }else {const icon=node('span','service-icon',icons[i%icons.length]);icon.setAttribute('aria-hidden','true');card.append(icon,node('h3','',t(item.title)),node('p','',t(item.body)));}
        grid.append(card);
      });
      wrap.append(grid);if(!items.length && s.type==='programs')wrap.append(node('p','empty',ui[language].empty));
    }
    return section;
  }
  function render(){
    S.apply(site,theme);document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';
    document.title=t(site.brand)+' | '+t(site.hero.eyebrow);
    document.querySelector('meta[name=description]').content=t(site.hero.body);
    $('language').textContent=language==='ar'?'English':'العربية';$('language').lang=language==='ar'?'en':'ar';
    $('theme').textContent=theme==='dark'?'☀':'◐';$('theme').setAttribute('aria-label',ui[language][theme==='dark'?'light':'dark']);$('theme').setAttribute('aria-pressed',String(theme==='dark'));
    $('skip').textContent=ui[language].skip;$('menuBtn').setAttribute('aria-label',ui[language].menu);$('menu').setAttribute('aria-label',ui[language].nav);
    $('menu').replaceChildren(link(ui[language].home,'#home'),...published().map(s=>link(t(s.nav),'#'+s.id)));
    for(const key of ['eyebrow','title','body'])$('hero'+key[0].toUpperCase()+key.slice(1)).textContent=t(site.hero[key]);
    const program=firstType('programs');$('heroActions').replaceChildren(...(program?[link(ui[language].more,'#'+program.id,'button')]:[]),link(ui[language].contact,contactHref(),'button secondary'));
    $('heroNote').textContent=ui[language].space;$('sceneTag').textContent=ui[language].tag;
    $('identityStrip').replaceChildren(...ui[language].strip.map(text=>node('span','',text)));
    $('sections').replaceChildren(...published().map(sectionView));
    $('footerTagline').textContent=t(site.tagline);$('dashboardLink').textContent=ui[language].dashboard;
    $('footerEmail').textContent=site.contact.email;$('footerEmail').href='mailto:'+site.contact.email;
    $('instagram').href=/^https:\/\/(www\.)?instagram\.com\//i.test(site.contact.instagram)?site.contact.instagram:'https://www.instagram.com/';
    $('footerAddress').textContent=t(site.contact.address);$('copyright').textContent='© '+new Date().getFullYear()+' '+t(site.brand)+' · '+ui[language].copyright;
  }
  function reload(){try{site=S.load();notice('');}catch(_){site=S.defaults();notice(ui[language].loadError);}render();}
  $('language').onclick=()=>{language=language==='ar'?'en':'ar';S.setPref('language',language);render();};
  $('theme').onclick=()=>{theme=theme==='dark'?'light':'dark';S.setPref('theme',theme);S.apply(site,theme);$('theme').setAttribute('aria-pressed',String(theme==='dark'));$('theme').setAttribute('aria-label',ui[language][theme==='dark'?'light':'dark']);$('theme').textContent=theme==='dark'?'☀':'◐';};
  $('menuBtn').onclick=()=>{$('menuBtn').setAttribute('aria-expanded',String($('menu').classList.toggle('open')));};
  $('menu').addEventListener('click',e=>{if(e.target.closest('a')){$('menu').classList.remove('open');$('menuBtn').setAttribute('aria-expanded','false');}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('menu').classList.remove('open');$('menuBtn').setAttribute('aria-expanded','false');}});
  window.addEventListener('storage',e=>{if(e.key===S.key || e.key===null)reload();});
  window.addEventListener('madar:change',reload);
  reload();
})();
