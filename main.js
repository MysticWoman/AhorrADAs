const operaciones = []  

const arrayGanancias = operaciones.filter(operacion => operacion.type === "Ganancia") 
const totalGanancias = arrayGanancias.reduce((accumulator, currentValue) => accumulator + currentValue.num, 0); 

const arrayGastos = operaciones.filter(operacion => operacion.type === "Gastos") 
const totalGastos = arrayGastos.reduce((acc, cv) => acc + cv.num, 0);

let categorias = ["Comida", "Educación", "Salidas", "Servicios", "Trabajo", "Transporte"]  

categorias.forEach((categoria) => document.querySelector("#filtro-category").innerHTML += `<option value="">${categoria}</option>`)

document.querySelector("#gainings").innerHTML += `<span>${totalGanancias}</span>` 
document.querySelector("#expenses").innerHTML += `<span>${totalGastos}</span>` 
document.querySelector("#total").innerHTML += `<span>${totalGanancias - totalGastos}</span>`

// boton abrir nueva operacion //
const $btnViewOperation = document.querySelector("#viewOperation")
$btnViewOperation.addEventListener("click", () => {
        $sectionNewOperation.classList.remove("is-hidden")
        $sectionHome.classList.add("is-hidden")
});

const $sectionHome = document.querySelector("#balanceHome")

// boton cancelar nueva operacion //
const $btnViewHome = document.querySelector("#viewHome")
$btnViewHome.addEventListener("click", () => {
    $sectionNewOperation.classList.add("is-hidden")
    $sectionHome.classList.remove("is-hidden")
});

// boton aceptar nueva operacion //
const $btnViewHomeAcept = document.querySelector("#viewHomeAcept")
$btnViewHomeAcept.addEventListener("click", () => {
    $sectionNewOperation.classList.add("is-hidden")
    $sectionHome.classList.remove("is-hidden")
});

// boton categorias //

const $sectionNewOperation = document.querySelector("#sectionNewOperation")     
const $inputDate = document.querySelector("#inputDate")     
const $containDate = document.querySelector(".contain-date")