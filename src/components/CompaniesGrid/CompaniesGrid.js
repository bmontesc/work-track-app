import React, { useState } from "react";
import {Dropdown, Button, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TasksPerCompany from '../CompanyTasks/CompanyTasks';
import { getDataPerCompany } from '../../api/data';
const { Title } = Typography;

const items = [
    {
      label: 'SOCIEDAD 162 S.L.',
      key: 162,
    },
    {
      label: 'SOCIEDAD 169 S.L.',
      key: 169,
    },
    {
      label: 'SOCIEDAD 214 S.L.',
      key: 214,
    },
    {
      label: 'SOCIEDAD 275 S.L.',
      key: 275,
    },
];

const CompanyGrid = () => {

    const [company, setCompany] = useState();
    const [companyCode, setCompanyCode] = useState();

    const handleMenuClick = (e) => {
        setCompany((items.find(item => item.key === Number(e.key))).label)
        setCompanyCode(Number(e.key))
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px' }}>
                <Title level={4}>
                    Selecciona la empresa: 
                    <Dropdown menu={menuProps}>
                        <Button>
                            <Space>
                                {company}
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </Title>
                <Button>
                    Ver/Editar información de la empresa
                </Button>
            </div>
            {getDataPerCompany(companyCode).map(task_type => <TasksPerCompany key={task_type.type} {...task_type}/>)}
        </>
    )
}

export default CompanyGrid;
