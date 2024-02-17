export function calculateDiference(h1,h2) {
    var hora1 = new Date("1970-01-01T" + h1 + "Z");
    var hora2 = new Date("1970-01-01T" + h2 + "Z");
    var diferenciaMs = hora2.getTime() - hora1.getTime();

    var segundos = (Math.floor(Math.abs(diferenciaMs)  % (1000 * 60)) / 1000);
    var minutos = (Math.floor(Math.abs(diferenciaMs) % (1000 * 60 * 60)) / (1000 * 60));
    var horas = (Math.floor(Math.abs(diferenciaMs) / (1000 * 60 * 60)));

    var diferenciaHoraStr = pad(horas, 2) + ":" + pad(minutos, 2) + ":" + pad(segundos, 2);
    diferenciaHoraStr = ((diferenciaMs < 0 || diferenciaHoraStr === "00:00:00") ? "" : "-") + diferenciaHoraStr

    function pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    return diferenciaHoraStr;
}

export function findElementsStartingWithHyphen() {
    var cells = document.querySelectorAll('table td');
   
    cells.forEach(function(cell) {
        var text = cell.textContent.trim();
        if (text.startsWith("-")) {
            cell.setAttribute("id", 'red-text');
        }
    });
}
