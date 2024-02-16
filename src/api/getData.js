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
                            estimated_time: object.estimated_time !== '00:00:00' ? object.estimated_time : '',
                            used_time: object.used_time !== '00:00:00' ? object.used_time : '',
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
                    estimated_time: object.estimated_time !== '00:00:00' ? object.estimated_time : '',
                    used_time: object.used_time !== '00:00:00' ? object.used_time : '',
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

export const getTasksPerAccId = (accId) => {
    return fetch(`${apiUrl}/tasks/accountants/${accId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudieron obtener los datos del plan');
            }
            return response.json();
    })
    .then(data=>{ data.map(object => {
            const accTasks = {
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
                finish_date: object.finish_date !== null ? object.finish_date.split('T')[0] : ''
            }
            return accTasks
        })
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
    .then(data=>{data.map(object => {
            console.log(object)
            const accountant = {
                id: object.id,
                name: `${object.name} ${object.first_surname} ${object.second_surname}`}
            console.log(accountant)
            return accountant
        })
    })
    .catch(error => {
        console.error('Error en la solicitud:', error.message);
        throw error;
      });
}
