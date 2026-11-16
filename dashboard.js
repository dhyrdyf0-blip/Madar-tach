(function(){
  'use strict';
  const S=window.MadarSite,$=id=>document.getElementById(id);
  let site, timer=null, dirty=false, conflict=false, ready=true, fieldId=0;
  let theme=S.pref('theme','light');
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  function status(text){$('saveStatus').textContent=text;}
  function error(text){$('error').textContent=text;$('error').hidden=!text;}
  function validColors(){return S.contrast(site.colors.navy,site.colors.white)>=4.5 && S.contrast(site.colors.navy,site.colors.lime)>=4.5;}
  function save(){
    clearTimeout(timer);timer=null;
    if(!ready || conflict){status('الحفظ متوقف؛ راجع التنبيه.');return false;}
    if(!validColors()){error('اختر ألوانًا بتباين أوضح: يلزم أن تكون قراءة النص الكحلي واضحة فوق الأبيض والأخضر (نسبة 4.5 على الأقل). لم تُحفظ الألوان الجديدة.');status('لم يتم حفظ التغيير؛ الألوان بحاجة لتعديل.');return false;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contact.email) || (site.contact.whatsapp && !/^\d{8,15}$/.test(site.contact.whatsapp))){error('تحقق من البريد الإلكتروني ورقم واتساب الدولي (8 إلى 15 رقمًا، أو اترك الرقم فارغًا).');status('بيانات التواصل بحاجة لتعديل؛ لم يتم الحفظ.');return false;}
    try{S.save(site);dirty=false;error('');status('✓ تم الحفظ تلقائيًا في هذا المتصفح · '+new Date().toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'}));S.apply(site,theme);return true;}
    catch(_){error('تعذّر الحفظ. التعديلات ما زالت في هذه الصفحة؛ صدّر نسخة احتياطية قبل إغلاقها وتحقق من إعدادات التخزين.');status('لم يتم الحفظ');return false;}
  }
  function schedule(){dirty=true;status('تعديلات غير محفوظة…');clearTimeout(timer);timer=setTimeout(save,450);}
  function mutate(change){if(!ready||conflict)return;change();dirty=true;renderSections();save();}
  function button(text,cls,action){const b=node('button',cls,text);b.type='button';b.onclick=action;return b;}
  function inputField(label,value,onInput,{multiline=false,type='text',help='',dir}={}){
    const field=node('label','field',label),input=node(multiline?'textarea':'input');input.id='edit-'+(++fieldId);input.value=value;input.maxLength=multiline?6000:300;
    if(multiline)input.rows=3;else input.type=type;
    if(dir)input.dir=dir;
    input.addEventListener('input',()=>{onInput(input.value);schedule();});field.append(input);
    if(help)field.append(node('span','field-help',help));return field;
  }
  function pairFields(target,label,pair,multiline=false){
    const wrap=node('div','pair');
    wrap.append(inputField(label+' · العربية',pair.ar,v=>pair.ar=v,{multiline,dir:'rtl'}),inputField(label+' · English',pair.en,v=>pair.en=v,{multiline,dir:'ltr'}));target.append(wrap);
  }
  function checkbox(text,checked,change){const l=node('label','check-label');const i=node('input');i.type='checkbox';i.checked=checked;i.onchange=()=>change(i.checked);l.append(i,node('span','',text));return l;}
  function renderGeneral(){
    $('colors').replaceChildren();
    for(const [key,name] of [['navy','الكحلي / النص الأساسي'],['white','الأبيض / الخلفية'],['lime','الأخضر / لون التمييز']])$('colors').append(inputField(name,site.colors[key],v=>site.colors[key]=v,{type:'color',help:site.colors[key]}));
    $('brandFields').replaceChildren();pairFields($('brandFields'),'اسم المؤسسة',site.brand);pairFields($('brandFields'),'وصف التذييل',site.tagline);
    $('contactFields').replaceChildren();
    $('contactFields').append(inputField('البريد الإلكتروني',site.contact.email,v=>site.contact.email=v,{type:'email',dir:'ltr'}),inputField('رقم واتساب',site.contact.whatsapp,v=>site.contact.whatsapp=v.replace(/\D/g,''),{dir:'ltr',help:'رقم دولي دون +، مثال: 970… اتركه فارغًا لاستخدام البريد.'}),inputField('رابط Instagram',site.contact.instagram,v=>site.contact.instagram=v,{type:'url',dir:'ltr'}));
    pairFields($('contactFields'),'العنوان',site.contact.address);
    $('heroFields').replaceChildren();pairFields($('heroFields'),'العبارة القصيرة',site.hero.eyebrow);pairFields($('heroFields'),'العنوان الرئيسي',site.hero.title,true);pairFields($('heroFields'),'الوصف الرئيسي',site.hero.body,true);
  }
  function renderSections(){
    const openIds=new Set([...document.querySelectorAll('.section-editor[open]')].map(e=>e.dataset.id));
    $('sectionEditors').replaceChildren();$('sectionCount').textContent=site.sections.filter(s=>s.published).length+' ظاهر / '+site.sections.length+' قسم';
    site.sections.forEach((section,index)=>{
      const details=node('details','section-editor');details.dataset.id=section.id;details.open=openIds.has(section.id);
      const summary=node('summary');summary.append(node('strong','',section.nav.ar||'قسم دون عنوان'),node('small','',section.published?'ظاهر في الموقع':'مسودة'));details.append(summary);
      const body=node('div','section-body'),actions=node('div','section-actions');
      actions.append(checkbox('إظهار القسم في الموقع',section.published,v=>mutate(()=>section.published=v)));
      const up=button('↑ للأعلى','small-button',()=>mutate(()=>{[site.sections[index-1],site.sections[index]]=[site.sections[index],site.sections[index-1]];}));up.disabled=index===0;
      const down=button('↓ للأسفل','small-button',()=>mutate(()=>{[site.sections[index+1],site.sections[index]]=[site.sections[index],site.sections[index+1]];}));down.disabled=index===site.sections.length-1;
      actions.append(up,down,button('حذف القسم','delete',()=>{if(confirm('حذف قسم «'+section.nav.ar+'» ومحتواه؟'))mutate(()=>site.sections.splice(index,1));}));body.append(actions);
      pairFields(body,'اسم القسم في القائمة',section.nav);
      pairFields(body,'عنوان القسم',section.title,true);pairFields(body,'وصف القسم',section.body,true);
      if(section.type!=='contact'){
        body.append(node('h3','',section.type==='programs'?'البرامج التدريبية':'بطاقات القسم'));
        section.items.forEach((item,itemIndex)=>{
          const box=node('div','item-editor');box.append(node('h4','',(section.type==='programs'?'البرنامج ':'البطاقة ')+(itemIndex+1)));
          const itemActions=node('div','card-actions');itemActions.append(checkbox('ظاهر',item.published,v=>mutate(()=>item.published=v)),button('حذف','delete',()=>{if(confirm('حذف هذه البطاقة؟'))mutate(()=>section.items.splice(itemIndex,1));}));box.append(itemActions);
          pairFields(box,'العنوان',item.title);pairFields(box,'المحتوى',item.body,true);body.append(box);
        });
        const add=button(section.type==='programs'?'＋ إضافة برنامج':'＋ إضافة بطاقة','button secondary',()=>mutate(()=>section.items.push({id:'item-'+crypto.randomUUID(),title:S.pair('عنوان جديد','New title'),body:S.pair('اكتب المحتوى هنا.','Write your content here.'),published:false})));
        add.disabled=section.items.length>=60;body.append(add);
      }
      details.append(body);$('sectionEditors').append(details);
    });
    if(!site.sections.length)$('sectionEditors').append(node('p','empty','لا توجد أقسام. أضف قسمًا من الأعلى.'));
    $('addSection').disabled=site.sections.length>=30;
  }
  $('editorForm').addEventListener('submit',e=>{e.preventDefault();save();});
  $('addSection').onclick=()=>{
    const id='section-'+crypto.randomUUID();
    mutate(()=>site.sections.push({id,type:$('newType').value,nav:S.pair('قسم جديد','New section'),title:S.pair('عنوان القسم الجديد','A new section'),body:S.pair('اكتب وصف القسم هنا.','Write a description here.'),published:false,items:[]}));
    const details=[...document.querySelectorAll('.section-editor')].find(e=>e.dataset.id===id);if(details){details.open=true;details.scrollIntoView({behavior:'smooth',block:'start'});}
  };
  $('saveNow').onclick=save;
  $('theme').onclick=()=>{theme=theme==='dark'?'light':'dark';S.setPref('theme',theme);S.apply(site,theme);$('theme').setAttribute('aria-pressed',String(theme==='dark'));};
  $('export').onclick=()=>{
    const blob=new Blob([JSON.stringify(site,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=node('a');a.href=url;a.download='madar-site-settings.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  $('import').onchange=async()=>{
    const file=$('import').files[0];if(!file)return;
    try{
      if(file.size>1000000)throw Error('الملف كبير جدًا.');
      const data=JSON.parse(await file.text());if(!S.validate(data))throw Error('صيغة ملف الإعدادات غير صالحة.');
      if(!confirm('استبدال محتوى هذا المتصفح بمحتوى الملف؟'))return;
      const previous=site;site=data;ready=true;conflict=false;
      if(!save()){site=previous;return;}
      $('editorFields').disabled=false;renderGeneral();renderSections();
    }catch(e){error('تعذّر الاستيراد: '+e.message);}finally{$('import').value='';}
  };
  $('reset').onclick=()=>{
    if(!confirm('استعادة المحتوى الافتراضي؟ التعديلات المحلية ستُستبدل. يُفضّل تصدير نسخة أولًا.'))return;
    const previous=site;site=S.defaults();ready=true;conflict=false;
    if(!save()){site=previous;return;}
    $('editorFields').disabled=false;renderGeneral();renderSections();
  };
  window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden && dirty && !conflict)save();});
  window.addEventListener('storage',e=>{
    if(e.key!==S.key && e.key!==null)return;
    if(dirty){conflict=true;clearTimeout(timer);error('تغيّر المحتوى من نافذة أخرى أثناء تعديلك. صدّر تعديلاتك الحالية ثم أعد تحميل الصفحة لتجنّب استبدال تغييرات النافذة الأخرى.');status('توقف الحفظ بسبب تعديل متزامن');$('editorFields').disabled=true;return;}
    try{site=S.load();renderGeneral();renderSections();S.apply(site,theme);status('تم تحميل التحديث من النافذة الأخرى.');}
    catch(_){ready=false;$('editorFields').disabled=true;error('تعذّر قراءة التحديث. بياناتك لم تُستبدل؛ أعد تحميل الصفحة.');}
  });
  try{site=S.load();status('جاهز · التغييرات تُحفظ تلقائيًا');}
  catch(_){site=S.defaults();ready=false;$('editorFields').disabled=true;status('تعذّر قراءة التخزين');error('تعذّر قراءة بيانات المتصفح أو البرامج القديمة. لم يتم استبدالها. تحقق من التخزين، أو استورد نسخة صحيحة، أو اختر استعادة المحتوى الافتراضي.');}
  S.apply(site,theme);$('theme').setAttribute('aria-pressed',String(theme==='dark'));renderGeneral();renderSections();
})();
