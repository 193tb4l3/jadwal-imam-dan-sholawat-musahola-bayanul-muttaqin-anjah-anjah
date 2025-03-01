document.addEventListener("DOMContentLoaded", function() {
    let container = document.getElementById("jadwal-container");
    let searchInput = document.getElementById("searchInput");
    let jadwal = "";
    let imamList = ["Sudiarti", "Satudi S.Pdi", "Muhammad Nurul Azman", "Senan S.Pdi", "Wahadi S.Pd", "Opsional siapa yang mau"];
    let sholawatList = ["Sahuidin", "Sopian Hadi", "Mizanul Khairi", "Ujiadi", "Kertidep", "Supendra"];
    let jajanList = ["Nila Puspawati, Rayuni, Susi", "Seri Safaatun, Suwarni, Mery", "Sarkip, Kartini, Sugianep"];
    let keutamaanList = [
        "يَخْرُجُ الْمُؤْمِنُ مِنْ ذَنْبِهِ فِى اَوَّلِ لَيْلَةٍ كَيَوْمِ وَلَدَتْهُ اُمُّهُ - Pada malam pertama, dosa orang mukmin akan diampuni seperti saat baru lahir.",
        "وَفِى اللَّيْلَةِ الثَّانِيَةِ يُغْفَرُ لَهُ وَلِأَبَوَيْهِ اِنْ كَانَا مُؤْمِنَيْنِ - Pada malam kedua, orang yang shalat tarawih akan diampuni dosanya serta dosa kedua orang tuanya jika keduanya mukmin.",
        "وَفِى اللَّيْلَةِ الثَّالِثَةِ يُنَادِيْ مَلَكٌ مِنْ تَحْتِ الْعَرْشِ اِسْتَأْنِفِ الْعَمَلَ غَفَرَ اللهُ مَا تَقَدَّمَ مِنْ ذَنْبِكَ - Malaikat berseru bahwa Allah telah mengampuni dosanya."
    ];
    
    for (let i = 0; i < 30; i++) {
        let imam = imamList[i % imamList.length];
        let sholawat = sholawatList[i % sholawatList.length];
        let jajan = jajanList[i % jajanList.length];
        let keutamaan = keutamaanList[i % keutamaanList.length];
        
        jadwal += `
            <div class="col-md-4 mb-4 jadwal-card">
                <div class="card text-center p-3">
                    <div class="card-body">
                        <h5 class="card-title text-primary">Malam ke-${i + 1}</h5>
                        <p class="card-text"><strong>Imam:</strong> ${imam}</p>
                        <p class="card-text"><strong>Sholawat:</strong> ${sholawat}</p>
                        <p class="card-text"><strong>Sesedak Mengaji:</strong> ${jajan}</p>
                        <p class="card-text text-success"><strong>Keutamaan:</strong> ${keutamaan}</p>
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
