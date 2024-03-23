// Create Data
// document.getElementById("productForm").addEventListener("submit", function (event) {
//    event.preventDefault(); // Menghentikan perilaku default form

//    // Mendapatkan nilai dari form
//    const nama_produk = document.getElementById("nama_produk").value;
//    const jumlah = parseInt(document.getElementById("jumlah").value);
//    const harga = parseInt(document.getElementById("harga").value);

//    // Membuat objek produk_baru dari nilai-nilai form
//    const produk_baru = {
//       nama_produk: nama_produk,
//       jumlah: jumlah,
//       harga: harga,
//    };

//    // Kirim data produk baru ke API
//    fetch(url, {
//       method: "POST",
//       headers: {
//          "Content-Type": "application/json", //memberi tahu server jenis konten yang dikirimkan dalam permintaan : JSON
//       },
//       body: JSON.stringify(produk_baru), //mengkonversi data menjadi string JSON
//    })
//       .then((response) => response.json())
//       .then((data) => {
//          console.log("Data produk baru berhasil ditambahkan:", data);
//          // Refresh data
//          getData();
//       });
// });
let apiKey = "c7f06fb80f3a47c7a73343be3a73201a";
let url = `https://crudcrud.com/api/${apiKey}/products`;

getData();

// Read Data
function getData() {
   fetch(url)
      .then((res) => res.json())
      .then((res) => {
         // console.log(res[0]);
         let dataProduct = document.getElementById("dataProduct");
         let formTitle = document.getElementById("form-title");
         let buttonProduk = document.getElementById("buttonProduk");
         buttonProduk.innerHTML = `<button class="btn-daftar" type="button" onclick="tambahData()">Submit</button>`;
         formTitle.innerHTML = "Tambah Produk";
         let nomor = 1;
         dataProduct.innerHTML = "";
         res.forEach((element) => {
            dataProduct.innerHTML += ` <tr>
                                          <td class="no-tabel">${nomor}</td>
                                          <td>${element.nama_produk}</td>
                                          <td>${element.jumlah}</td>
                                          <td>${element.harga.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                                          <td>
                                             <div class="" style="display:flex;gap:10px">
                                                <button class="update-data btn-daftar" id="updateProduk" onclick="showData('${element._id}')" style="text-decoration:none">Update</button>
                                                <button class="delete-data btn-reset" id="deleteProduk" onclick="deleteProduk('${element._id}')" style="text-decoration:none">Delete</button>
                                             </div>
                                          </td>
                                       </tr>`;
            nomor++;
         });
      });
}

// Add Data
function tambahData() {
   // Mendapatkan nilai dari form
   const nama_produk = document.getElementById("nama_produk").value;
   const jumlah = parseInt(document.getElementById("jumlah").value);
   const harga = parseInt(document.getElementById("harga").value);

   // Membuat objek produk_baru dari nilai-nilai form
   const produk_baru = {
      nama_produk: nama_produk,
      jumlah: jumlah,
      harga: harga,
   };

   // Kirim data produk baru ke API
   fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json", //memberi tahu server jenis konten yang dikirimkan dalam permintaan : JSON
      },
      body: JSON.stringify(produk_baru), //mengkonversi data menjadi string JSON
   })
      .then((response) => response.json())
      .then((data) => {
         console.log("Data produk baru berhasil ditambahkan:", data);
         // Refresh data
         getData();
      });
}

function deleteProduk(id) {
   fetch(url + "/" + id, {
      method: "DELETE",
   })
      .then((response) => {
         if (response.ok) {
            // Jika penghapusan berhasil, panggil fungsi getData kembali untuk memperbarui tampilan
            getData();
         } else {
            // Jika terjadi kesalahan dalam penghapusan, tampilkan pesan kesalahan
            console.error("Gagal menghapus produk");
         }
      })
      .catch((error) => console.error("Error:", error));
}

function showData(id) {
   let formTitle = document.getElementById("form-title");
   formTitle.innerHTML = "Update Produk";
   fetch(url + "/" + id)
      .then((response) => {
         if (!response.ok) {
            throw new Error("Respon jaringan tidak baik");
         }
         return response.json();
      })
      .then((data) => {
         let buttonProduk = document.getElementById("buttonProduk");
         let idProduk = id;
         buttonProduk.innerHTML = `<button class="btn-daftar" type="submit" id="updateButton" data-id="${idProduk}">Update</button>`; //onclick="updateProduk('${idProduk}')"
         document.getElementById("nama_produk").value = data.nama_produk;
         document.getElementById("jumlah").value = data.jumlah;
         document.getElementById("harga").value = data.harga;

         // Tambahkan event listener ke tombol "Update"
         document.getElementById("updateButton").addEventListener("click", async function (event) {
            //event.preventDefault(); // Mencegah perilaku default dari tombol submit
            const idProduk = this.getAttribute("data-id"); // Mendapatkan ID produk dari atribut data-id
            await updateData(idProduk); // Memanggil fungsi updateData dengan ID produk yang sesuai
         });
      });
}

// Update Data
function updateData(idProduk) {
   // Mendapatkan nilai dari form yang akan diupdate
   const nama_produk = document.getElementById("nama_produk").value;
   const jumlah = parseInt(document.getElementById("jumlah").value);
   const harga = parseInt(document.getElementById("harga").value);

   // Membuat objek data baru
   const data_update = {
      nama_produk: nama_produk,
      jumlah: jumlah,
      harga: harga,
   };

   // Kirim permintaan PUT ke API
   fetch(url + "/" + idProduk, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data_update),
   })
      .then((response) => {
         if (!response.ok) {
            throw new Error("Gagal melakukan permintaan PUT");
         }
         return response.json();
      })
      .then((data) => {
         console.log("Data produk berhasil diupdate:", data);
         // Refresh data
         getData();
      })
      .catch((error) => {
         console.error("Terjadi kesalahan saat mengirim permintaan PUT:", error);
      });
}
