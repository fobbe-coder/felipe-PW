
function areaTriangulo(base, altura) {
    return (base * altura) / 2;
}

function areaRetangulo(largura, altura) {
    return largura * altura;
}

function areaCirculo(raio) {
    return Math.PI * raio * raio;
}

function areaQuadrado(lado) {
    return lado * lado;
}

console.log("Área do Triângulo:", areaTriangulo(10, 5));
console.log("Área do Retângulo:", areaRetangulo(8, 4));
console.log("Área do Círculo:", areaCirculo(3).toFixed(2));
console.log("Área do Quadrado:", areaQuadrado(6));