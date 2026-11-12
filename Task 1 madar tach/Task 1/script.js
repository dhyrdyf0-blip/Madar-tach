// رقم واتساب: بالصيغة الدولية بدون + (غيّره لرقم مدار تك الحقيقي)
var whatsappNumber = "970XXXXXXXXX";


// ===== 1) القائمة المتنقلة (الموبايل) =====
var menuBtn = document.getElementById("menuBtn");   // زر ☰
var menu = document.getElementById("menu");         // القائمة

// عند الضغط على الزر: أظهر القائمة أو أخفها
menuBtn.addEventListener("click", function () {
  menu.classList.toggle("show");
});

// عند الضغط على أي رابط: أغلق القائمة
var links = document.querySelectorAll("#menu a");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    menu.classList.remove("show");
  });
}


// ===== 2) نموذج التواصل =====
var form = document.getElementById("contactForm");
var error = document.getElementById("error");

form.addEventListener("submit", function (event) {
  event.preventDefault();                           // لا تعيد تحميل الصفحة

  // اقرأ القيم من الحقول
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var message = document.getElementById("message").value;

  // تأكد أن الحقول ليست فارغة
  if (name == "" || email == "" || phone == "" || message == "") {
    error.textContent = "من فضلك املأ جميع الحقول";
    return;                                         // أوقف الكود هنا
  }

  error.textContent = "";                           // امسح رسالة الخطأ

  // جهّز نص الرسالة
  var text = "الاسم: " + name + "\n" +
             "البريد: " + email + "\n" +
             "الهاتف: " + phone + "\n" +
             "الرسالة: " + message;

  // افتح واتساب مع الرسالة
  var url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);
  window.open(url, "_blank");

  form.reset();                                     // فرّغ النموذج
});
