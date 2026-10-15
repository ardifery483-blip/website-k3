
        const toast = document.getElementById("toast");
        let toastTimer;
        function showToast(message) {
            toast.textContent = message;
            toast.classList.add("show");
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
        }

        document.querySelectorAll("[data-toast]").forEach((element) => {
            element.addEventListener("click", (event) => {
                if (element.tagName === "A") event.preventDefault();
                showToast(element.dataset.toast);
            });
        });

        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                document.querySelector(".nav-link.active")?.classList.remove("active");
                document.querySelector(".nav-link.active")?.removeAttribute("aria-current");
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
                document.getElementById("breadcrumb").textContent = link.dataset.page;
                if (window.innerWidth <= 780) closeMenu();
                if (link.dataset.page !== "Dashboard") showToast(`Menu ${link.dataset.page} dipilih`);
            });
        });

        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("overlay");
        function closeMenu() {
            sidebar.classList.remove("open");
            overlay.classList.remove("show");
        }
        document.getElementById("menuToggle").addEventListener("click", () => {
            sidebar.classList.toggle("open");
            overlay.classList.toggle("show");
        });
        overlay.addEventListener("click", closeMenu);

        document.getElementById("exportButton").addEventListener("click", () => {
            const rows = [
                ["Kategori", "Nilai", "Periode"],
                ["Hari tanpa kecelakaan", "128 hari", "Oktober 2025"],
                ["Total insiden bulan ini", "4 insiden", "Oktober 2025"],
                ["Kepatuhan inspeksi", "92%", "Oktober 2025"],
                ["Karyawan terlatih", "86%", "Oktober 2025"],
                ["Kepatuhan K3L", "88%", "Oktober 2025"]
            ];
            const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\r\n");
            const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "laporan-k3l-oktober-2025.csv";
            anchor.click();
            URL.revokeObjectURL(url);
            showToast("Laporan K3L berhasil diekspor");
        });

        document.getElementById("chartPeriod").addEventListener("change", (event) => {
            showToast(event.target.value === "12" ? "Menampilkan tren 12 bulan terakhir" : "Menampilkan tren 6 bulan terakhir");
        });

        const now = new Date();
        const dateFormatter = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        document.getElementById("topDate").textContent = dateFormatter.format(now);