const operaciones = []  

const arrayGanancias = operaciones.filter(operacion => operacion.type === "Ganancia") 
const totalGanancias = arrayGanancias.reduce((accumulator, currentValue) => accumulator + currentValue.num, 0); 

const arrayGastos = operaciones.filter(operacion => operacion.type === "Gastos") 
const totalGastos = arrayGastos.reduce((acc, cv) => acc + cv.num, 0);

let categorias = []  

categorias.forEach((categoria) => document.querySelector("#filtro-category").innerHTML += `<option value="">${categoria}</option>`)

document.querySelector("#gainings").innerHTML += `<span>${totalGanancias}</span>` 
document.querySelector("#expenses").innerHTML += `<span>${totalGastos}</span>` 
document.querySelector("#total").innerHTML += `<span>${totalGanancias - totalGastos}</span>`

// boton abrir nueva operacion //
const $sectionHome = document.querySelector("#balanceHome")
const $btnViewOperation = document.querySelector("#viewOperation")
$btnViewOperation.addEventListener("click", () => {
        $sectionNewOperation.classList.remove("is-hidden")
        $sectionHome.classList.add("is-hidden")
});

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
const $sectionNewCategories = document.querySelector("#sectionNewCategories")     
const $inputDate = document.querySelector("#inputDate")     
const $containDate = document.querySelector(".contain-date")

const $btnViewCategories = document.querySelector("#viewCategories")
$btnViewCategories.addEventListener("click", () => {
        $sectionNewCategories.classList.remove("is-hidden")
        $sectionHome.classList.add("is-hidden")
});

// boton reportes
const $sectionReportes = document.querySelector("#section-reportes")
const $btnReportes = document.querySelector("#viewReportes")
$btnReportes.addEventListener("click", () => {
  $sectionReportes.classList.remove("is-hidden")
  $sectionHome.classList.add("is-hidden")
});

// MENU del boton editar o eliminar categorias

const $sectionEditCategories = document.querySelector("#sectionEditCategories")

const $btnEditCategories = document.querySelector("#edit-categories")
$btnEditCategories.addEventListener("click", () => {
        $sectionEditCategories.classList.remove("is-hidden")
        $sectionHome.classList.add("is-hidden")
        $sectionNewCategories.classList.add("is-hidden")
});

const reiniciarVistaOperacion = () => {
  $('#descripcion-input').value = ''
  $('#monto').value = 0
  $('#tipo-operacion').value = 'GASTO'
  $('#fecha-input').valueAsDate = new Date()
} 