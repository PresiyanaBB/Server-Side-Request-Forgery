let adminUnlocked = false;

function showProduct() {
    document.getElementById('productSection').style.display = "block";
    document.getElementById('adminSection').style.display = "none";
}

function showAdmin() {
    if (!adminUnlocked) {
        alert("Достъпът е отказан. Не притежавате необходимите права за достъп до администраторския панел.");
        return;
    }
    document.getElementById('productSection').style.display = "none";
    document.getElementById('adminSection').style.display = "block";
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('navProduct').addEventListener('click', showProduct);
    document.getElementById('navAdmin').addEventListener('click', showAdmin);

    document.getElementById('checkStockBtn').addEventListener('click', function () {
        document.getElementById('requestPanel').style.display = "block";
    });

    document.getElementById('stockForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const stockApiInput = document.getElementById('stockApi');
        const stockApiValue = stockApiInput.value.trim();
        const responseArea = document.getElementById('responseArea');

        responseArea.innerHTML = "";

        if (stockApiValue === "http://localhost/admin") {
            adminUnlocked = true;
            responseArea.innerHTML = '<div class="alert alert-success">Отключен достъп! Пренасочване към администраторския панел...</div>';
            setTimeout(() => { showAdmin(); }, 1500);

        } else if (stockApiValue === "http://localhost/admin/delete?username=carlos") {
            if (adminUnlocked) {
                responseArea.innerHTML = '<div class="alert alert-success">SSRF атаката е успешна! Потребителят "carlos" беше изтрит.</div>';
            } else {
                responseArea.innerHTML = '<div class="alert alert-danger">Грешка: Първо трябва да отключите администраторския панел.</div>';
            }

        } else {
            responseArea.innerHTML = '<div class="alert alert-info">Наличност: 42 телевизора. Последни бройки!</div>';
        }
    });
});
