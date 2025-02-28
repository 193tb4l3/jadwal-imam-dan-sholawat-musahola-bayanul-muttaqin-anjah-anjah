document.addEventListener("DOMContentLoaded", function() {
    let container = document.getElementById("jadwal-container");
    let searchInput = document.getElementById("searchInput");
    let jadwal = "";
    let imamList = ["Sudiarti", "Satudi S.Pdi", "Muhammad Nurul Azman", "Senan S.Pdi", "Wahadi S.Pd", "tim safar/yang bersedia"];
    let sholawatList = ["Sahuidin", "Sopian Hadi", "Mizanul Khairi", "Ujiadi", "Kertidep", "Supendra"];
    let jajanList = ["Nila Puspawati, Rayuni, Susi", "Seri Safaatun, Suwarni, Mery", "Sarkip, Kartini, Sugianep"];

    for (let i = 0; i < 30; i++) {
        let imam = imamList[i % imamList.length];
        let sholawat = sholawatList[i % sholawatList.length];
        let jajan = jajanList[i % jajanList.length];

        jadwal += `
            <div class="col-md-4 mb-4 jadwal-card">
                <div class="card text-center p-3">
                    <div class="card-body">
                        <h5 class="card-title text-primary">Malam ke-${i + 1}</h5>
                        <p class="card-text"><strong>Imam:</strong> ${imam}</p>
                        <p class="card-text"><strong>Sholawat:</strong> ${sholawat}</p>
                        <p class="card-text"><strong>Sesedak Mengaji:</strong> ${jajan}</p>
                    </div>
                </div>
            </div>`;
    }
    container.innerHTML = jadwal;

    searchInput.addEventListener("keyup", function () {
        let filter = searchInput.value.toLowerCase();
        let cards = document.querySelectorAll(".jadwal-card");

        cards.forEach(card => {
            let text = card.innerText.toLowerCase();
            if (text.includes(filter)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

