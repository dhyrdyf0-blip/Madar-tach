"use strict";
const $ = id => document.getElementById(id);
let programs = [];
let editing = null;
let storageReady = true;
try { programs = MadarPrograms.load(); } catch (_) {
  storageReady = false;
  $("feedback").textContent = "تعذّر قراءة البيانات المحلية. تأكد من السماح بالتخزين وفتح الموقع عبر Live Server. لم يتم استبدال بياناتك.";
  $("programForm").querySelector("button[type=submit]").disabled = true;
}
function notify(message) { $("feedback").textContent = message; }
function persist(next) {
  if (!storageReady) return false;
  try { MadarPrograms.save(next); programs = next; render(); return true; }
  catch (_) { notify("تعذّر الحفظ في المتصفح. لم يتم حفظ التغيير؛ تحقق من إعدادات التخزين."); return false; }
}
function reset() { editing = null; $("programForm").reset(); $("editorTitle").textContent = "إضافة برنامج جديد"; }
function render() {
  $("total").textContent = programs.length;
  $("published").textContent = programs.filter(p => p.status === "published").length;
  $("drafts").textContent = programs.filter(p => p.status === "draft").length;
  const query = $("search").value.trim().toLocaleLowerCase();
  const filtered = programs.filter(p => p.title.toLocaleLowerCase().includes(query) && ($("filter").value === "all" || p.status === $("filter").value));
  $("rows").replaceChildren(); $("empty").hidden = filtered.length > 0;
  filtered.forEach(p => {
    const row = document.createElement("tr");
    const details = document.createElement("td");
    const title = document.createElement("strong"); title.dir = "auto"; title.textContent = p.title;
    const desc = document.createElement("p"); desc.textContent = p.description; details.append(title, desc);
    const state = document.createElement("td"); const badge = document.createElement("span"); badge.className = "badge " + p.status; badge.textContent = p.status === "published" ? "ظاهر في الموقع" : "مسودة"; state.append(badge);
    const actions = document.createElement("td"); const group = document.createElement("div"); group.className = "row-actions";
    const edit = document.createElement("button"); edit.textContent = "تعديل"; edit.className = "secondary"; edit.setAttribute("aria-label", "تعديل " + p.title);
    edit.onclick = () => { editing = p.id; $("title").value = p.title; $("description").value = p.description; $("status").value = p.status; $("editorTitle").textContent = "تعديل البرنامج"; $("editor").scrollIntoView({ behavior: "smooth" }); $("title").focus({ preventScroll: true }); };
    const remove = document.createElement("button"); remove.textContent = "حذف"; remove.className = "delete"; remove.setAttribute("aria-label", "حذف " + p.title);
    remove.onclick = () => { if (confirm('حذف البرنامج «' + p.title + '»؟') && persist(programs.filter(item => item.id !== p.id))) { if (editing === p.id) reset(); notify("تم حذف البرنامج من هذا المتصفح."); } };
    group.append(edit, remove); actions.append(group); row.append(details, state, actions); $("rows").append(row);
  });
}
$("programForm").addEventListener("submit", e => {
  e.preventDefault();
  const title = $("title").value.trim(), description = $("description").value.trim();
  if (!title || !description) { notify("اكتب اسم البرنامج ووصفه."); return; }
  const item = { id: editing || crypto.randomUUID(), title, description, status: $("status").value };
  const next = editing ? programs.map(p => p.id === editing ? item : p) : [...programs, item];
  if (persist(next)) { reset(); notify("تم الحفظ محليًا. ستظهر البرامج المنشورة في الموقع على المتصفح نفسه."); }
});
$("cancel").onclick = reset;
$("newProgram").onclick = reset;
$("search").addEventListener("input", render);
$("filter").addEventListener("change", render);
window.addEventListener("storage", e => { if (e.key === MadarPrograms.key || e.key === null) { try { programs = MadarPrograms.load(); reset(); render(); notify("تم تحديث القائمة من نافذة أخرى."); } catch (_) { notify("تعذّر قراءة التحديث من النافذة الأخرى. أعد تحميل الصفحة قبل التعديل."); storageReady = false; } } });
render();
