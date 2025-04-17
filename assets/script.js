let isAdmin = false;

// Buka akses admin (tombol rahasia)
function cekAdmin() {
  const pass = prompt("Masukkan password admin:");
  if (pass === "zerlotz123") { // Ganti dengan password lo
    isAdmin = true;
    tampilkanRiwayat(); // Tampilkan ulang biar tombol muncul
  }
}

// Simpan transaksi baru
function tambahTransaksi(game, jumlah, harga, status, idPlayer) {
  const transaksiLama = JSON.parse(localStorage.getItem("riwayatTransaksi")) || [];
  const transaksiBaru = {
    game: game,
    jumlah: jumlah,
    harga: harga,
    status: status,
    idPlayer: idPlayer,
    waktu: new Date().toLocaleString()
  };
  transaksiLama.push(transaksiBaru);
  localStorage.setItem("riwayatTransaksi", JSON.stringify(transaksiLama));
}

// Ubah status transaksi
function ubahStatusTransaksi(index, statusBaru) {
  const transaksi = JSON.parse(localStorage.getItem("riwayatTransaksi")) || [];
  if (transaksi[index]) {
    transaksi[index].status = statusBaru;
    localStorage.setItem("riwayatTransaksi", JSON.stringify(transaksi));
    tampilkanRiwayat();
  }
}

// Tampilkan transaksi ke halaman
function tampilkanRiwayat() {
  const data = JSON.parse(localStorage.getItem("riwayatTransaksi")) || [];
  const container = document.getElementById("riwayat-container");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p class="no-transaksi">Kamu sama sekali belum beli di sini.</p>`;
    return;
  }

  data.reverse().forEach((trx, i) => {
    const indexAsli = data.length - 1 - i;
    const item = document.createElement("div");
    item.className = "riwayat-item";
    item.innerHTML = `
      <strong>${trx.game}</strong><br>
      Jumlah: ${trx.jumlah}<br>
      Harga: Rp${trx.harga}<br>
      ID: ${trx.idPlayer || '-'}<br>
      Status: <span class="${trx.status.toLowerCase()}">${trx.status}</span><br>
      <small>${trx.waktu}</small>
    `;

    // Tombol admin (jika belum sukses)
    if (isAdmin && trx.status !== "Sukses") {
      const btn = document.createElement("button");
      btn.textContent = "Konfirmasi Sukses";
      btn.onclick = () => ubahStatusTransaksi(indexAsli, "Sukses");
      item.appendChild(btn);
    }

    container.appendChild(item);
  });
} 

fetch('../backend/riwayat_transaksi.php')
  .then(res => res.json())
  .then(data => {
    // proses sama seperti tadi...
  });
  
  // assets/script.js

document.addEventListener("DOMContentLoaded", function () {
  fetch("../backend/riwayat_transaksi.php")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("riwayat-container");
      if (!data.length) {
        container.innerHTML = "<p>Belum ada transaksi</p>";
        return;
      }

      data.reverse().forEach(transaksi => {
        const div = document.createElement("div");
        div.classList.add("transaksi-item");
        div.innerHTML = `
          <p><strong>${transaksi.nickname}</strong> beli <strong>${transaksi.item}</strong> di game <strong>${transaksi.game}</strong></p>
          <p>Status: <span style="color:${transaksi.status === 'sukses' ? 'green' : 'orange'}">${transaksi.status}</span></p>
          <hr/>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error("Gagal ambil data:", error);
    });
});