import { calculateDiference } from '../utils/utils'

const apiUrl = 'https://backend-work-track-app.vercel.app/api';

export const getGlobalPlan = (year, quarter) => {
    return fetch(`${apiUrl}/tasks/year/${year}/quarter/${quarter}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudieron obtener los datos del plan');
            }
            return response.json();
    })
    .then(data=>{
        const globalPlan = []
        let last_plan_id = -1
        data.forEach( object => {
            if (object.plan_id !== last_plan_id){
                const globalPlanItem = {
                    plan_id: object.plan_id,
                    date: object.date !== null ? object.date.split('T')[0] : '',
                    block: false,
                    priority: 0,
                    company_number: object.code,
                    company_name: object.name,
                    xd: true,
                    tasks: [
                        {
                            type: object.type,
                            status: object.status === 'Not Planned' ? 'NP' : (object.status === 'Blocked' ? 'B' : ''),
                            accountant_code: object.reference,
                            estimated_time: object.estimated_time !== '00:00:00' ? (`${object.estimated_time.split(':')[0]}:${object.estimated_time.split(':')[1]}`) : '',
                            used_time: object.used_time !== '00:00:00' ? (`${object.used_time.split(':')[0]}:${object.used_time.split(':')[1]}`) : '',
                            diference: object.used_time !== '00:00:00' ? calculateDiference(object.estimated_time, object.used_time) : '',
                            finish_date: object.finish_date !== null ? object.finish_date.split('T')[0] : ''
                        }
                    ]
                }
                last_plan_id = object.plan_id
                globalPlan.push(globalPlanItem)
            } else {
                const task = {
                    type: object.type,
                    status: object.status === 'Not Planned' ? 'NP' : (object.status === 'Blocked' ? 'B' : ''),
                    accountant_code: object.reference,
                    estimated_time: object.estimated_time !== '00:00:00' ? (`${object.estimated_time.split(':')[0]}:${object.estimated_time.split(':')[1]}`) : '',
                    used_time: object.used_time !== '00:00:00' ? (`${object.used_time.split(':')[0]}:${object.used_time.split(':')[1]}`) : '',
                    diference: object.used_time !== '00:00:00' ? calculateDiference(object.estimated_time, object.used_time) : '',
                    finish_date: object.finish_date !== null ? object.finish_date.split('T')[0] : ''
                }
                last_plan_id = object.plan_id
                const planIndex = globalPlan.findIndex(plan => plan.plan_id === object.plan_id)
                globalPlan[planIndex].tasks.push(task)
            }
        })
        return globalPlan
    })
    .catch(error => {
        console.error('Error en la solicitud:', error.message);
        throw error;
      });
}

export const getAccountantList = () => {
    return fetch(`${apiUrl}/accountants`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudieron obtener los datos del plan');
            }
            return response.json();
    })
    .then(data=>{
        let accountantList = []
        data.forEach(object => {
            accountantList.push({
                id: object.id,
                name: object.name,
                first_surname: object.first_surname,
                second_surname: object.second_surname,
                full_name: `${object.name} ${object.first_surname} ${object.second_surname}`,
                reference: object.reference,
                address: object.address,
                city: object.city,
                zip_code: object.zip_code,
                phone_number: object.phone_number,
                email: object.email
            })})
        return accountantList
    })
    .catch(error => {
        console.error('Error en la solicitud:', error.message);
        throw error;
    });
}

export const getTasksPerAccId = (accId) => {
    return fetch(`${apiUrl}/tasks/accountants/${accId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudieron obtener los datos del plan');
            }
            return response.json();
    })
    .then(data=>{
        const tasksList = [{type: 'extracts', tasks:[]},{type: 'vat', tasks:[]},{type: 'fixed assets', tasks:[]},{type: 'accountable', tasks:[]}];
        data.forEach(object => {
            let t = 0
            t = object.type === 'Extracts' ? 0 : (object.type === 'VAT'? 1 : (object.type === 'Accountable'? 3 : 2))
            tasksList[t].tasks.push({
                date: object.date !== null ? object.date.split('T')[0] : '',
                block: false,
                priority: 0,
                company_number: object.code,
                company_name: object.name,
                xd: true,
                status: object.status === 'Not Planned' ? 'NP' : (object.status === 'Blocked' ? 'B' : ''),
                estimated_time: object.estimated_time !== '00:00:00' ? object.estimated_time : '',
                used_time: object.used_time !== '00:00:00' ? object.used_time : '',
                diference: object.used_time !== '00:00:00' ? calculateDiference(object.estimated_time, object.used_time) : '',
                finish_date: object.finish_date !== null ? object.finish_date.split('T')[0] : ''})})
        return tasksList
    })
    .catch(error => {
        console.error('Error en la solicitud:', error.message);
        throw error;
    });
}

export const getCompaniesList = () => {
    return fetch(`${apiUrl}/companies`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudieron obtener los datos del plan');
            }
            return response.json();
    })
    .then(data=>{
        let companyList = []
        data.forEach(object => {
            companyList.push({
                id: object.id,
                name: object.name,
                code: object.code,
                address: object.address,
                zip_code: object.zip_code,
                city: object.city,
                phone: object.phone,
                email: object.email,
                contact_person: object.contact_person
            })})
        return companyList
    })
    .catch(error => {
        console.error('Error en la solicitud:', error.message);
        throw error;
    });
}

export const getTasksPerComId = (comId) => {
    return fetch(`${apiUrl}/tasks/companies/${comId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudieron obtener los datos del plan');
            }
            return response.json();
    })
    .then(data=>{
        const tasksList = [{type: 'extracts', tasks:[]},{type: 'vat', tasks:[]},{type: 'fixed assets', tasks:[]},{type: 'accountable', tasks:[]}];
        data.forEach(object => {
            let t = 0
            t = object.type === 'Extracts' ? 0 : (object.type === 'VAT'? 1 : (object.type === 'Accountable'? 3 : 2))
            tasksList[t].tasks.push({
                date: object.date !== null ? object.date.split('T')[0] : '',
                block: false,
                priority: 0,
                xd: true,
                status: object.status === 'Not Planned' ? 'NP' : (object.status === 'Blocked' ? 'B' : ''),
                accountant_code: object.reference,
                estimated_time: object.estimated_time !== '00:00:00' ? object.estimated_time : '',
                used_time: object.used_time !== '00:00:00' ? object.used_time : '',
                diference: object.used_time !== '00:00:00' ? calculateDiference(object.estimated_time, object.used_time) : '',
                finish_date: object.finish_date !== null ? object.finish_date.split('T')[0] : ''})})
        return tasksList
    })
    .catch(error => {
        console.error('Error en la solicitud:', error.message);
        throw error;
    });
}

export const getEmployeeRanking = (quarter, year) => {
    return fetch(`${apiUrl}/rankings/year/${year}/quarter/${quarter}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudieron obtener los datos del plan');
            }
            return response.json();
    })
    .then(data => data.map(item => ({name: item.name, Porcentaje: item.diff_percent_time})))
    .catch(error => {
        console.error('Error en la solicitud:', error.message);
        throw error;
    });
}