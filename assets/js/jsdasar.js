// SAPAAN
alert("Selamat datang di website sederhana ku");
const nama = prompt("Kalau boleh tahu, siapa nama kamu?");
const sapaan = document.getElementById("sapaan");
sapaan.innerHTML = `Selamat datang, ${nama ? `${nama[0].toUpperCase() + nama.slice(1).toLowerCase()}!` : `Orang asing!`}`;

// CEK TIPE DATA
document.getElementById("cekButton").addEventListener("click", function () {
   let data = document.getElementById("input-field").value;
   if (data) {
      let hasil = document.getElementById("hasil");
      let dataType = typeof JSON.parse(data);
      hasil.innerHTML = `Hasil : Tipe data dari ${data} adalah ${dataType}`;
   } else {
      hasil.innerHTML = `Hasil : `;
   }
});

// OPERASI ARITMATIKA
document.getElementById("operasikan").addEventListener("click", function () {
   let angka1 = parseFloat(document.getElementById("angka1").value);
   let angka2 = parseFloat(document.getElementById("angka2").value);
   let operand = document.getElementById("operand").value;
   let hasilOperasi;

   switch (operand) {
      case "+":
         hasilOperasi = angka1 + angka2;
         break;
      case "-":
         hasilOperasi = angka1 - angka2;
         break;
      case "*":
         hasilOperasi = angka1 * angka2;
         break;
      case "/":
         hasilOperasi = angka1 / angka2;
         break;
      case "**":
         hasilOperasi = Math.pow(angka1, angka2);
         break;
      case "%":
         hasilOperasi = angka1 % angka2;
         break;
      default:
         hasilOperasi = "Tidak valid";
   }
   if (isNaN(hasilOperasi)) {
      document.getElementById("hasilOperasi").textContent = `Hasil : ${angka1} ${operand} ${angka2} = Tidak dapat dioperasikan. Operand Harus Angka`;
   } else {
      document.getElementById("hasilOperasi").textContent = `Hasil : ${angka1} ${operand} ${angka2} = ${hasilOperasi}`;
   }
});

// LOOPING
document.getElementById("loop").addEventListener("click", function () {
   let banyakLooping = document.getElementById("n-looping").value;
   let hasil = document.getElementById("hasilLooping");
   hasil.innerHTML = ``;
   for (let index = 0; index < banyakLooping; index++) {
      hasil.innerHTML += `<li>Looping ke ${index + 1}</li>`;
   }
});

// LOGIC OPERATOR
document.getElementById("logic").addEventListener("click", function () {
   let bool1 = document.getElementById("bool1").value;
   let bool2 = document.getElementById("bool2").value;
   let operand = document.getElementById("logicOperand").value;
   let hasilOperasi;

   // Ubah nilai input menjadi nilai boolean
   bool1 = bool1 === "true";
   bool2 = bool2 === "true";

   switch (operand) {
      case "&&":
         hasilOperasi = bool1 && bool2;
         document.getElementById("hasilLogic").textContent = `Hasil : ${bool1} ${operand} ${bool2} = ${hasilOperasi}`;
         break;
      case "||":
         hasilOperasi = bool1 || bool2;
         document.getElementById("hasilLogic").textContent = `Hasil : ${bool1} ${operand} ${bool2} = ${hasilOperasi}`;
         break;
      case "!":
         document.getElementById("hasilLogic").textContent = `Hasil : ${operand} ${bool1} = ${!bool1}  dan  ${operand} ${bool2} = ${!bool2}`;
         break;
      default:
         hasilOperasi = "Tidak valid";
         document.getElementById("hasilLogic").textContent = `Hasil : ${bool1} ${operand} ${bool2} = ${hasilOperasi}`;
   }
});

// Responsive Nav
const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
   menuList.classList.toggle("hidden");
});
