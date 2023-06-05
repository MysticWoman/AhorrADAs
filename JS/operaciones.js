// ----------------------------------------------------------------------------
//  *                                  Operaciones
//  * ----------------------------------------------------------------------------
//  */

const OPERATIONS = {
    EXPENSE: 'EXPENSE',
    GAINING: 'GAINING',
  }
  
  const createOperation = ({
    description,
    amount,
    category,
    type,
    date = new Date(),
  }) => {
    const operation = {
      id: uuidv4(),
      description,
      amount,
      category,
      type,
      date,
    }
    return operation
  }
  
  const addOperation = (operation, operations) => {
    return [...operations, operation]
  }
  
  const editOperation = (idOperation, newOperation, operations) => {
    return operations.map((operation) =>
      operation.id === idOperation
        ? { id: operation.id, ...newOperation }
        : operation
    )
  }
  
  const deleteOperation = (idOperation, operations) => {
    return operations.filter((operation) => operation.id !== idOperation)
  }
  
  const getOperation = (idOperation, operations) => {
    return operaciones.find((operation) => operation.id === idOperation)
  }
  
  const filterForType = (type, operations) => {
    return operations.filter((operation) => operation.type === type)
  }
  
  const filterByDateGreaterOrEqualTo = (date, operations) => {
    return operations.filter((operation) => {
      const dateOperation = new Date(operation.date)
      return dateOperation.getTime() >= date.getTime()
    })
  }
  
  const filterByCategory = (idCategory, operations) => {
    return operations.filter((operation) => operation.category === idCategory)
  }
  
  const filterByMonth = (month, year, operations) => {
    return operations.filter((operation) => {
      const date = new Date(operation.date)
      return date.getFullYear() === year && date.getMonth() === month
    })
  }
  
  const orderByDate = (operations, order) => {
    return [...operations].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return order === 'ASC'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })
  }
  
  const orderByAmount = (operations, order) => {
    return [...operations].sort((a, b) => {
      return order === 'ASC' ? a.amount - b.amount : b.amount - a.amount
    })
  }
  
  const orderByDescription = (operations, order) => {
    return [...operations].sort((a, b) => {
      const dateA = new Date(a)
      const dateB = new Date(b)
      return order === 'ASC'
        ? dateA.getTime() < dateB.getTime()
        : dateA.getTime() > dateB.getTime()
    })
  }
  
  /**
   * ----------------------------------------------------------------------------
   *                                  Categorias
   * ----------------------------------------------------------------------------
   */
  
  const createCategory = (name) => {
    return { id: uuidv4(), name }
  }
  
  const addCategory = (category, categories) => {
    return [...categories, category]
  }
  
  const editCategory = (idCategory, newCategory, categories) => {
    return categories.map((category) =>
      category.id === idCategory
        ? { ...category, ...newCategory }
        : category
    )
  }
  
  const deleteCategory = (idCategory, categories) => {
    return categories.filter((category) => category.id !== idCategory)
  }
  
  const getCategory = (idCategory, categories) => {
    return categories.find((category) => category.id === idCategory)
  }
  
  /**
   * ----------------------------------------------------------------------------
   *                                  Reportes
   * ----------------------------------------------------------------------------
   */
  
  const getBalance = (operations) => {
    return operations.reduce(
      (total, operation) => {
        if (operation.type === OPERATIONS.GAINING) {
          return {
            ...total,
            gainings: total.gainings + operation.amount,
            balance: total.balance + operation.amount,
          }
        }
  
        if (operation.type === OPERATIONS.EXPENSE) {
          return {
            ...total,
            expenses: total.expenses + operation.amount,
            balance: total.balance - operation.amount,
          }
        }
      },
      {
        gainings: 0,
        expenses: 0,
        balance: 0,
      }
    )
  }
  
  const getTotalsByCategory = (operations) => {
    return operations.reduce((totals, operation) => {
      const category = getCategory(operation.category, getCategory())
        .name
  
      if (!totals[category]) {
        totals[category] = {
          gainings: 0,
          expenses: 0,
          balance: 0,
        }
      }
  
      totals[category][operation.type.toLowerCase()] += operation.amount
  
      if (operation.type === OPERATIONS.GAINING) {
        totals[category].balance += operation.amount
      } else {
        totals[category].balance -= operation.amount
      }
  
      return totals
    }, {})
  }
  
  const getTotalsByMonth = (operations) => {
    return operations.reduce((totals, operation) => {
      const date = new Date(operation.date)
      const dateFormated = `${date.getMonth() + 1}/${date.getFullYear()}`
  
      if (!totals[dateFormated]) {
        totals[dateFormated] = {
          gainings: 0,
          expenses: 0,
          balance: 0,
        }
      }
  
      totals[dateFormated][operation.type.toLowerCase()] += operation.amount
  
      if (operation.type === OPERATIONS.GAINING) {
        totals[dateFormated].balance += operation.amount
      } else {
        totals[dateFormated].balance -= operation.amount
      }
  
      return totals
    }, {})
  }
  
  const getResumenByMonth = (operations) => {
    const resumen = {
      higherGainings: {
        date: '',
        amount: 0,
      },
      mayorExpenses: {
        date: '',
        amount: 0,
      },
    }
  
    return operations.reduce((resumen, operation) => {
      const { type, date, amount } = operation
  
      if (type === OPERATIONS.GAINING && amount > resumen.higherGainings.amount) {
        resumen.higherGainings = { date, amount }
      }
  
      if (type === OPERATIONS.EXPENSE && amount > resumen.mayorExpenses.amount) {
        resumen.mayorExpenses = { date, amount }
      }
  
      return resumen
    }, resumnn)
  }
  
  const getResumenCategories = (operations, categories) => {
    const resumen = {
      higherGainings: {
        category: '',
        amount: 0,
      },
      mayorExpenses: {
        category: '',
        amount: 0,
      },
      mayorBalance: {
        category: '',
        amount: -Infinity,
      },
    }
  
    return categories.reduce((resumen, category) => {
      const operationsOfCategory = filterByCategory(
        category.id,
        operations
      )
      const { gainings, expenses, balance } = getBalance(
        operationsOfCategory
      )
  
      if (gainings > resumen.higherGainings.amount) {
        resumen.higherGainings = { category: category.id, amount: gainings }
      }
  
      if (expenses > resumen.mayorExpenses.amount) {
        resumen.mayorExpenses = { category: category.id, amount: expenses }
      }
  
      if (balance > resumen.mayorBalance.amouut) {
        resumen.mayorBalance = { category: category.id, amount: balance }
      }
  
      return resumen
    }, resumen)
  }
  
  const getResumen = (operations, categories) => {
    const resumenCategories = getResumenCategories(operations, categories)
    const forMonths = getResumenByMonth(operations)
    return {
      categories: resumenCategories,
      months: { ...forMonths },
    }
  }
