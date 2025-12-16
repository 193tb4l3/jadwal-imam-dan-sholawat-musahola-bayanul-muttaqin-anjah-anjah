document.addEventListener("DOMContentLoaded", function () {
    // 1. DOM Elements
    const container = document.getElementById("jadwal-container");
    const searchInput = document.getElementById("searchInput");
    const exportExcelBtn = document.getElementById("exportExcelBtn");
    const exportPdfBtn = document.getElementById("exportPdfBtn");
    const exportTableBody = document.querySelector("#exportTable tbody");
    
    // 2. Data Definition
    const imamList = ["Sudiarti", "Satudi S.Pdi", "Muhammad Nurul Azman", "Senan S.Pdi", "Wahadi S.Pd", "Sesuai Jadwal Yang Di Tempelkan Di Musholla"];
    const sholawatList = ["Sahuidin", "Sopian Hadi", "Mizanul Khairi", "Ujiadi", "Kertidep", "Supendra"];
    
    // PERBAIKAN: Malam ke-1 (Index 0) sudah diisi. Malam ke-5 (Index 4) sekarang kosong.
    const jajanList = [
        ["Suhaini", "Siti Aminiah", "Ema Meliani"], // Malam ke-1 (INDEX 0)
        ["Nila Puspawati", "Rayuni", "Susi"], 
        ["Seri Safaatun", "Suwarni", "Mery"], 
        ["Sarkip", "Kartini", "Sugianep"], 
        ["Lisda", "Irtip", "Ayu"],
        ["Rismah", "Merhamah", "Yurni"], 
        ["Maynep", "Martini", "Diya"], 
        ["Asmuni", "Tina", "Farida"], ["Foziah", "Umul Uadyani", "Nurmatp"], ["Lisda", "Irtip", "Ayu"], 
        ["Riani", "Seri Natip", "Widia"], ["Sirniwati", "Siti Umroh", "Satip"], ["Nurmini", "Sumanim", "Desi"],
        ["Nila Puspawati", "Rayuni", "Susi"], ["Seri Safaatun", "Suwarni", "Mery"], ["Sarkip", "Kartini", "Sugianep"],
        ["Suhaini", "Siti Aminiah", "Ema Meliani"], ["Rismah", "Merhamah", "Yurni"], ["Maynep", "Martini", "Diya"], 
        ["Asmuni", "Tina", "Farida"], ["Foziah", "Umul Uadyani", "Nurmatp"], ["Lisda", "Irtip", "Ayu"], 
        ["Riani", "Seri Natip", "Widia"], ["Sirniwati", "Siti Umroh", "Satip"], ["Nurmini", "Sumanim", "Desi"],
        ["Nila Puspawati", "Rayuni", "Susi"], ["Seri Safaatun", "Suwarni", "Mery"], ["Sarkip", "Kartini", "Sugianep"],
        ["Suhaini", "Siti Aminiah", "Ema Meliani"], ["Rismah", "Merhamah", "Yurni"], ["Maynep", "Martini", "Diya"],
        ["Seri Safaatun", "Suwarni", "Mery"]
    ];

    let jadwalCards = "";
    let jadwalTableRows = "";

    // 3. Generate Cards and Table Rows simultaneously
    for (let i = 0; i < 31; i++) {
        const malamKe = i + 1;
        const imam = imamList[i % imamList.length];
        const sholawat = sholawatList[i % sholawatList.length];
        const jajan = jajanList[i].join(", ");

        // Generate Card HTML
        jadwalCards += `
            <div class="col-md-4 mb-4 jadwal-card">
                <div class="card text-center p-3">
                    <div class="card-body">
                        <h5 class="card-title text-primary">Malam ke-${malamKe}</h5>
                        <p class="card-text"><strong>Imam:</strong> ${imam}</p>
                        <p class="card-text"><strong>Sholawat:</strong> ${sholawat}</p>
                        <p class="card-text"><strong>Sesedak Mengaji:</strong> ${jajan}</p>
                    </div>
                </div>
            </div>`;
        
        // Generate Table Row HTML (untuk export)
        jadwalTableRows += `
            <tr>
                <td>${malamKe}</td>
                <td>${imam}</td>
                <td>${sholawat}</td>
                <td>${jajan}</td>
            </tr>`;
    }
    
    // Insert HTML into DOM
    container.innerHTML = jadwalCards;
    exportTableBody.innerHTML = jadwalTableRows; // Mengisi tabel ekspor

    // 4. Export Excel Function (Menggunakan TSV untuk rapi di Excel)
    function exportExcel() {
        if (typeof saveAs !== 'function') {
            alert("GAGAL EKSPOR EXCEL: Library FileSaver.js tidak dapat dimuat. Pastikan koneksi internet Anda baik.");
            return;
        }

        const table = document.getElementById("exportTable");
        
        // Gunakan Tabulator (\t) sebagai pemisah
        let csv = [];
        const header = Array.from(table.tHead.rows[0].cells).map(cell => cell.innerText);
        csv.push(header.join('\t')); 
        
        for (let i = 0; i < table.tBodies[0].rows.length; i++) {
            const row = table.tBodies[0].rows[i];
            const rowData = Array.from(row.cells).map(cell => cell.innerText);
            csv.push(rowData.join('\t'));
        }
        
        const csvString = csv.join('\n');
        // Gunakan type text/csv;charset=utf-8 untuk encoding
        const blob = new Blob(["\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' }); 
        
        // Simpan dengan ekstensi .xls agar Excel membukanya sebagai tabel
        saveAs(blob, 'Jadwal_Ramadhan_Excel.xls'); 
    }

    // 5. Export PDF Function (Menggunakan jsPDF autoTable untuk tampilan tabel rapi)
    function exportPDF() {
        if (typeof jspdf === 'undefined' || typeof window.jspdf.AcroForm === 'undefined') {
            alert("GAGAL EKSPOR PDF: Library jsPDF atau autoTable tidak dapat dimuat. Pastikan koneksi internet Anda baik.");
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4');
        
        // Header untuk PDF
        doc.setFontSize(14);
        doc.text("Jadwal Imam, Sholawat, dan Sesedak Mengaji", doc.internal.pageSize.getWidth() / 2, 40, { align: "center" });
        doc.setFontSize(10);
        doc.text("Ramadhan 2025 - Musholla Bayanul Muttaqin Rempek Darussalam", doc.internal.pageSize.getWidth() / 2, 55, { align: "center" });

        // Gunakan autoTable pada tabel HTML
        doc.autoTable({
            html: '#exportTable',
            startY: 70, 
            theme: 'striped',
            headStyles: { fillColor: [66, 139, 202] }, // Warna header biru
            styles: { fontSize: 8, cellPadding: 3 },
            columnStyles: {
                // Atur lebar kolom agar rata
                0: { cellWidth: 50 },
                1: { cellWidth: 120 },
                2: { cellWidth: 120 },
                3: { cellWidth: 'auto' },
            }
        });

        // Download file
        doc.save('Jadwal_Ramadhan.pdf');
    }
    
    // 6. Attach Event Listeners
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', exportExcel);
    }
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', exportPDF); 
    }
    
    // Search Filter (Fungsi Asli)
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