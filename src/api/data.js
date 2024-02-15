export function mapPlanToColumn(data_array) {
  let dataSource = []
  data_array.forEach(item => {
      dataSource.push({
      key: item.date + '-' + item.company_number,
      date: item.date,
      block: item.block,
      priority: item.priority,
      company_number: item.company_number,
      company_name: item.company_name,
      xd: item.xd,
      sit_ext: item.tasks.find(task => task.type === 'Extracts')?.status,
      con_ext: item.tasks.find(task => task.type === 'Extracts')?.accountant_code,
      te_ext: item.tasks.find(task => task.type === 'Extracts')?.estimated_time,
      ti_ext: item.tasks.find(task => task.type === 'Extracts')?.used_time,
      tp_ext: item.tasks.find(task => task.type === 'Extracts')?.diference,
      exit_ext: item.tasks.find(task => task.type === 'Extracts')?.finish_date,
      sit_iva: item.tasks.find(task => task.type === 'VAT')?.status,
      con_iva: item.tasks.find(task => task.type === 'VAT')?.accountant_code,
      te_iva: item.tasks.find(task => task.type === 'VAT')?.estimated_time,
      ti_iva: item.tasks.find(task => task.type === 'VAT')?.used_time,
      tp_iva: item.tasks.find(task => task.type === 'VAT')?.diference,
      exit_iva: item.tasks.find(task => task.type === 'VAT')?.finish_date,
      sit_inm: item.tasks.find(task => task.type === 'Fixed Assets')?.status,
      con_inm: item.tasks.find(task => task.type === 'Fixed Assets')?.accountant_code,
      te_inm: item.tasks.find(task => task.type === 'Fixed Assets')?.estimated_time,
      ti_inm: item.tasks.find(task => task.type === 'Fixed Assets')?.used_time,
      tp_inm: item.tasks.find(task => task.type === 'Fixed Assets')?.diference,
      exit_inm: item.tasks.find(task => task.type === 'Fixed Assets')?.finish_date,
      sit_acc: item.tasks.find(task => task.type === 'Accountable')?.status,
      con_acc: item.tasks.find(task => task.type === 'Accountable')?.accountant_code,
      te_acc: item.tasks.find(task => task.type === 'Accountable')?.estimated_time,
      ti_acc: item.tasks.find(task => task.type === 'Accountable')?.used_time,
      tp_acc: item.tasks.find(task => task.type === 'Accountable')?.diference,
      exit_acc: item.tasks.find(task => task.type === 'Accountable')?.finish_date,
      ended: null,
      total_time: null,
      accountant_revisor: '',
      prev_accountant_revisor: ''
    })
  })
  return dataSource
}

export function getDataPerEmployee(employeeCode) {
  let dataSourceEmployee = [];
  let taskType = ['extracts', 'vat', 'fixed assets', 'Accountable']
  
  taskType.forEach((task_type) => {
    let categoryTask = dataSourceEmployee.map((item) => ({
      date: item.date,
      block: item.block,
      priority: item.priority,
      company_number: item.company_number,
      company_name: item.company_name,
      xd: item.xd,
      sit: item.tasks.find(task => task.type === task_type)?.status,
      con: item.tasks.find(task => task.type === task_type)?.accountant_code,
      te: item.tasks.find(task => task.type === task_type)?.estimated_time,
      ti: item.tasks.find(task => task.type === task_type)?.used_time,
      tp: item.tasks.find(task => task.type === task_type)?.diference,
      exit: item.tasks.find(task => task.type === task_type)?.finish_date,
    }))
    categoryTask = categoryTask.filter((task) => task.con === employeeCode)
    dataSourceEmployee.push({type: task_type, tasks: categoryTask})
  })
  return dataSourceEmployee
}

export function getDataPerCompany(companyCode) {
  let dataSourceCompany = [];
  let taskType = ['extracts', 'vat', 'fixed assets', 'Accountable']
  
  taskType.forEach((task_type) => {
    let categoryTask = dataSourceCompany.map((item) => ({
      date: item.date,
      block: item.block,
      priority: item.priority,
      company_number: item.company_number,
      xd: item.xd,
      sit: item.tasks.find(task => task.type === task_type)?.status,
      con: item.tasks.find(task => task.type === task_type)?.accountant_code,
      te: item.tasks.find(task => task.type === task_type)?.estimated_time,
      ti: item.tasks.find(task => task.type === task_type)?.used_time,
      tp: item.tasks.find(task => task.type === task_type)?.diference,
      exit: item.tasks.find(task => task.type === task_type)?.finish_date,
    }))
    categoryTask = categoryTask.filter((task) => task.company_number === companyCode)
    dataSourceCompany.push({type: task_type, tasks: categoryTask})
  })
  return dataSourceCompany
}