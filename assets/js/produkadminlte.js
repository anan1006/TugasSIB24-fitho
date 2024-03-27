fetch("https://api.jikan.moe/v4/top/anime")
   .then((response) => response.json())
   .then((res) => {
      let datas = res.data;
      let barisData = document.getElementById("data-row");

      datas.forEach((anime) => {
         barisData.innerHTML += `
            <tr>
               <td>${anime.rank}</td>
               <td><img src="${anime.images.webp.image_url}" style="height:200px;object-fit:cover;"></img></td>
               <td>${anime.title} <br> ${anime.title_japanese}</td>
               <td>${anime.episodes}</td>
               <td>${anime.genres.map((e) => e.name).join(", ")}</td>
               <td>${anime.synopsis.substring(0, 100)}</td>
            </tr>
         `;
      });

      $("#example1")
         .DataTable({
            responsive: false,
            lengthChange: false,
            autoWidth: false,
            buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
         })
         .buttons()
         .container()
         .appendTo("#example1_wrapper .col-md-6:eq(0)");
   });
