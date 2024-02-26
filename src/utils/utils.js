import dayjs from 'dayjs';

export function calculateDiference(h1,h2) {
    var hora1 = new Date("1970-01-01T" + h1 + "Z");
    var hora2 = new Date("1970-01-01T" + h2 + "Z");
    var diferenciaMs = hora2.getTime() - hora1.getTime();

    var minutos = (Math.floor(Math.abs(diferenciaMs) % (1000 * 60 * 60)) / (1000 * 60));
    var horas = (Math.floor(Math.abs(diferenciaMs) / (1000 * 60 * 60)));

    var diferenciaHoraStr = pad(horas, 2) + ":" + pad(minutos, 2);
    diferenciaHoraStr = ((diferenciaMs < 0 || diferenciaHoraStr === "00:00") ? "" : "-") + diferenciaHoraStr

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
        cell.removeAttribute("id");
        var text = cell.textContent.trim();
        if (text.startsWith("-")) {
            cell.setAttribute("id", 'red-text');
        }
    });

}

export function formatDate(dateStr) {
    const date = dayjs(dateStr);
    const formattedDate = date.locale('en').$set({
        $D: date.date(),
        $H: 0,
        $L: 'en',
        $M: date.month() + 1,
        $W: date.day(),
        $d: new Date(dateStr + 'T00:00:00'),
        $isDayjsObject: true,
        $m: 0,
        $ms: 0,
        $s: 0,
        $u: undefined,
        $x: {},
        $y: date.year()
    });
    console.log(formattedDate)
    return formattedDate;
}
