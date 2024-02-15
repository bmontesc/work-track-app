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
                    date: object.date,
                    block: false,
                    priority: 0,
                    company_number: object.code,
                    company_name: object.name,
                    xd: true,
                    tasks: [
                        {
                            type: object.type,
                            status: object.status,
                            accountant_code: object.reference,
                            estimated_time: object.estimated_time,
                            used_time: object.used_time,
                            diference: "0",
                            finish_date: object.finish_date
                        }
                    ]
                }
                last_plan_id = object.plan_id
                globalPlan.push(globalPlanItem)
            } else {
                const task = {
                    type: object.type,
                    status: object.status,
                    accountant_code: object.reference,
                    estimated_time: object.estimated_time,
                    used_time: object.used_time,
                    diference: 0,
                    finish_date: object.finish_date
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