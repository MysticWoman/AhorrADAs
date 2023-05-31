// ----------------------------------------------------------------------------
//  *                                  Operaciones
//  * ----------------------------------------------------------------------------
//  */

const OPERACIONES = {
    GASTO: 'GASTO',
    GANANCIA: 'GANANCIA',
  }
  
  const crearOperacion = ({
    descripcion,
    monto,
    categoria,
    tipo,
    fecha = new Date(),
  }) => {
    const operacion = {
      id: uuidv4(),
      descripcion,
      monto,
      categoria,
      tipo,
      fecha,
    }
    return operacion
  }
  
  const agregarOperacion = (operacion, operaciones) => {
    return [...operaciones, operacion]
  }
  
  const editarOperacion = (idOperacion, operacionNueva, operaciones) => {
    return operaciones.map((operacion) =>
      operacion.id === idOperacion
        ? { id: operacion.id, ...operacionNueva }
        : operacion
    )
  }
  
  const eliminarOperacion = (idOperacion, operaciones) => {
    return operaciones.filter((operacion) => operacion.id !== idOperacion)
  }
  
  const obtenerOperacion = (idOperacion, operaciones) => {
    return operaciones.find((operacion) => operacion.id === idOperacion)
  }
  
  const filtrarPorTipo = (tipo, operaciones) => {
    return operaciones.filter((operacion) => operacion.tipo === tipo)
  }
  
  const filtrarPorFechaMayorOIgualA = (fecha, operaciones) => {
    return operaciones.filter((operacion) => {
      const fechaOperacion = new Date(operacion.fecha)
      return fechaOperacion.getTime() >= fecha.getTime()
    })
  }
  
  const filtrarPorCategoria = (idCategoria, operaciones) => {
    return operaciones.filter((operacion) => operacion.categoria === idCategoria)
  }
  
  const filtrarPorMes = (mes, anio, operaciones) => {
    return operaciones.filter((operacion) => {
      const fecha = new Date(operacion.fecha)
      return fecha.getFullYear() === anio && fecha.getMonth() === mes
    })
  }
  
  const ordernarPorFecha = (operaciones, orden) => {
    return [...operaciones].sort((a, b) => {
      const fechaA = new Date(a.fecha)
      const fechaB = new Date(b.fecha)
      return orden === 'ASC'
        ? fechaA.getTime() - fechaB.getTime()
        : fechaB.getTime() - fechaA.getTime()
    })
  }
  
  const ordernarPorMonto = (operaciones, orden) => {
    return [...operaciones].sort((a, b) => {
      return orden === 'ASC' ? a.monto - b.monto : b.monto - a.monto
    })
  }
  
  const ordernarPorDescripcion = (operaciones, orden) => {
    return [...operaciones].sort((a, b) => {
      const fechaA = new Date(a)
      const fechaB = new Date(b)
      return orden === 'ASC'
        ? fechaA.getTime() < fechaB.getTime()
        : fechaA.getTime() > fechaB.getTime()
    })
  }
  
  /**
   * ----------------------------------------------------------------------------
   *                                  Categorias
   * ----------------------------------------------------------------------------
   */
  
  const crearCategoria = (nombre) => {
    return { id: uuidv4(), nombre }
  }
  
  const agregarCategoria = (categoria, categorias) => {
    return [...categorias, categoria]
  }
  
  const editarCategoria = (idCategoria, categoriaNueva, categorias) => {
    return categorias.map((categoria) =>
      categoria.id === idCategoria
        ? { ...categoria, ...categoriaNueva }
        : categoria
    )
  }
  
  const eliminarCategoria = (idCategoria, categorias) => {
    return categorias.filter((categoria) => categoria.id !== idCategoria)
  }
  
  const obtenerCategoria = (idCategoria, categorias) => {
    return categorias.find((categoria) => categoria.id === idCategoria)
  }
  
  /**
   * ----------------------------------------------------------------------------
   *                                  Reportes
   * ----------------------------------------------------------------------------
   */
  
  const obtenerBalance = (operaciones) => {
    return operaciones.reduce(
      (total, operacion) => {
        if (operacion.tipo === OPERACIONES.GANANCIA) {
          return {
            ...total,
            ganancias: total.ganancias + operacion.monto,
            balance: total.balance + operacion.monto,
          }
        }
  
        if (operacion.tipo === OPERACIONES.GASTO) {
          return {
            ...total,
            gastos: total.gastos + operacion.monto,
            balance: total.balance - operacion.monto,
          }
        }
      },
      {
        ganancias: 0,
        gastos: 0,
        balance: 0,
      }
    )
  }
  
  const obtenerTotalesPorCategoria = (operaciones) => {
    return operaciones.reduce((totales, operacion) => {
      const categoria = obtenerCategoria(operacion.categoria, obtenerCategorias())
        .nombre
  
      if (!totales[categoria]) {
        totales[categoria] = {
          ganancia: 0,
          gasto: 0,
          balance: 0,
        }
      }
  
      totales[categoria][operacion.tipo.toLowerCase()] += operacion.monto
  
      if (operacion.tipo === OPERACIONES.GANANCIA) {
        totales[categoria].balance += operacion.monto
      } else {
        totales[categoria].balance -= operacion.monto
      }
  
      return totales
    }, {})
  }
  
  const obtenerTotalesPorMes = (operaciones) => {
    return operaciones.reduce((totales, operacion) => {
      const fecha = new Date(operacion.fecha)
      const fechaFormateada = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`
  
      if (!totales[fechaFormateada]) {
        totales[fechaFormateada] = {
          ganancia: 0,
          gasto: 0,
          balance: 0,
        }
      }
  
      totales[fechaFormateada][operacion.tipo.toLowerCase()] += operacion.monto
  
      if (operacion.tipo === OPERACIONES.GANANCIA) {
        totales[fechaFormateada].balance += operacion.monto
      } else {
        totales[fechaFormateada].balance -= operacion.monto
      }
  
      return totales
    }, {})
  }
  
  const obtenerResumenMeses = (operaciones) => {
    const resumen = {
      mayorGanancia: {
        fecha: '',
        monto: 0,
      },
      mayorGasto: {
        fecha: '',
        monto: 0,
      },
    }
  
    return operaciones.reduce((resumen, operacion) => {
      const { tipo, fecha, monto } = operacion
  
      if (tipo === OPERACIONES.GANANCIA && monto > resumen.mayorGanancia.monto) {
        resumen.mayorGanancia = { fecha, monto }
      }
  
      if (tipo === OPERACIONES.GASTO && monto > resumen.mayorGasto.monto) {
        resumen.mayorGasto = { fecha, monto }
      }
  
      return resumen
    }, resumen)
  }
  
  const obtenerResumenCategorias = (operaciones, categorias) => {
    const resumen = {
      mayorGanancia: {
        categoria: '',
        monto: 0,
      },
      mayorGasto: {
        categoria: '',
        monto: 0,
      },
      mayorBalance: {
        categoria: '',
        monto: -Infinity,
      },
    }
  
    return categorias.reduce((resumen, categoria) => {
      const operacionesDeCategoria = filtrarPorCategoria(
        categoria.id,
        operaciones
      )
      const { ganancias, gastos, balance } = obtenerBalance(
        operacionesDeCategoria
      )
  
      if (ganancias > resumen.mayorGanancia.monto) {
        resumen.mayorGanancia = { categoria: categoria.id, monto: ganancias }
      }
  
      if (gastos > resumen.mayorGasto.monto) {
        resumen.mayorGasto = { categoria: categoria.id, monto: gastos }
      }
  
      if (balance > resumen.mayorBalance.monto) {
        resumen.mayorBalance = { categoria: categoria.id, monto: balance }
      }
  
      return resumen
    }, resumen)
  }
  
  const obtenerResumen = (operaciones, categorias) => {
    const resumenCategorias = obtenerResumenCategorias(operaciones, categorias)
    const porMeses = obtenerResumenMeses(operaciones)
    return {
      categorias: resumenCategorias,
      meses: { ...porMeses },
    }
  }
  
  // Por categoría - Por fecha
  // Por período
  // Por cuenta