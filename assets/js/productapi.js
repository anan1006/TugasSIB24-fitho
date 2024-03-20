let url = "https://crudcrud.com/api/9420ffc7b41849c0a3008f2b31af9bc0/products";

// Read Data
function getData() {
   fetch(url)
      .then((res) => res.json())
      .then((res) => {
         // console.log(res[0]);
         let dataProduct = document.getElementById("dataProduct");
         let nomor = 1;
         dataProduct.innerHTML = "";
         res.forEach((element) => {
            dataProduct.innerHTML += ` <tr>
                                          <td class="no-tabel">${nomor}</td>
                                          <td>${element.nama_produk}</td>
                                          <td>${element.jumlah}</td>
                                          <td>${element.harga}</td>
                                          <td>
                                             <div class="" style="display:flex;gap:10px">
                                                <a href="" class="update-data btn-daftar" id="updateProduk" data-produkid="${element._id}" style="text-decoration:none">Update</a>
                                                <a href="" class="delete-data btn-reset" id="deleteProduk" data-produkid="${element._id} style="text-decoration:none">Delete</a>
                                             </div>
                                          </td>
                                       </tr>`;
            nomor++;
         });
      });
}

// Create Data
document.getElementById("productForm").addEventListener("submit", function (event) {
   event.preventDefault(); // Menghentikan perilaku default form

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
});

getData();
