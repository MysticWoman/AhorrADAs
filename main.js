const operaciones = []  

let categorias = ["Comida", "Educación", "Salidas", "Servicios", "Trabajo", "Transporte"]  

const arrayGanancias = operaciones.filter(operacion => operacion.type === "Ganancia") 
const totalGanancias = arrayGanancias.reduce((accumulator, currentValue) => accumulator + currentValue.num, 0); 

const arrayGastos = operaciones.filter(operacion => operacion.type === "Gastos") 
const totalGastos = arrayGastos.reduce((acc, cv) => acc + cv.num, 0);

document.querySelector("#gainings").innerHTML += `<span>${totalGanancias}</span>` 
document.querySelector("#expenses").innerHTML += `<span>${totalGastos}</span>` 
document.querySelector("#total").innerHTML += `<span>${totalGanancias - totalGastos}</span>`  

categorias.forEach((categoria) => document.querySelector("#filtro-category").innerHTML += `<option value="">${categoria}</option>`)

// ------------------Nueva operacion------------------------

const nuevaOperacion = []
