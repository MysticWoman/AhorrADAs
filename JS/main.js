const operations = []  

const arrayGainings = operations.filter(operation => operation.type === "Gainings") 
const totalGainings = arrayGainings.reduce((accumulator, currentValue) => accumulator + currentValue.num, 0); 

const arrayExpensas = operations.filter(operation => operation.type === "Expenses") 
const totalExpenses = arrayExpensas.reduce((acc, cv) => acc + cv.num, 0);

let categories = []  

categories.forEach((category) => document.querySelector("#filter-category").innerHTML += `<option value="">${categoria}</option>`)

document.querySelector("#gainings").innerHTML += `<span>${totalGainings}</span>` 
document.querySelector("#expenses").innerHTML += `<span>${totalExpenses}</span>` 
document.querySelector("#total").innerHTML += `<span>${totalGainings - totalExpenses}</span>`

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
const $sectionReports = document.querySelector("#section-reports")
const $btnReports = document.querySelector("#viewReports")
$btnReports.addEventListener("click", () => {
  $sectionReports.classList.remove("is-hidden")
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

const resetVewOperation = () => {
  $('#description-input').value = ''
  $('#amount').value = 0
  $('#type-operation').value = 'expense'
  $('#date-input').valueAsDate = new Date()
} 