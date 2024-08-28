const graphoModal = async (title) => {

    document.body.style.overflow = 'hidden';
    document.getElementById("grapho-modal-container").style.display = "flex"
    document.getElementById("grapho-modal-container").style.marginTop = window.scrollY+"px"
    document.getElementById("grapho-modal-title").textContent = title;

    document.getElementById("grapho-modal-close-button").addEventListener('click', function() {
        document.getElementById("grapho-modal-container").style.display = 'none';
        if(instance_chart){
            instance_chart.destroy();
        }
        document.body.style.overflow = 'auto';
    });
}

// Donde lo saque: https://www.youtube.com/watch?v=4PiiSUxcalg

const RegresionLineal = async (x, y, xPredict) => {
    if (x.length !== y.length) {throw new Error('Both arrays gotta have same lenght');}
    if (x.length < 2) {throw new Error('Its necessary have at least two numbers in both arrays');}
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    const n = x.length;
    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumXX += x[i] * x[i];
    }
    const meanX = sumX / n;
    const meanY = sumY / n;
    const m = (sumXY - n * meanX * meanY) / (sumXX - n * meanX * meanX);
    const b = meanY - m * meanX;
    const yPredict = (m * xPredict + b).toFixed(2);
    return parseFloat(yPredict);
}

const PredecirAño = async (x, y) => {
    const mesesDelAño = 12;
    const xPredict = [];
    const datosFaltantes = [];
    for (let i = x.length + 1; i <= mesesDelAño; i++) {xPredict.push(i);}
    for (let i = 0; i < xPredict.length; i++) {
        const yPred = await RegresionLineal(x, y, xPredict[i]);
        datosFaltantes.push({ mes: xPredict[i], prediccion: yPred });
    }
    return datosFaltantes;
};

const x = [1, 2, 3, 4, 5, 6];
const y = [17, 18, 22, 33, 39, 12];

PredecirAño(x, y).then(pito => {
    console.log(pito);
});