import { SettingFilled } from '@ant-design/icons'
import AppHeader from '../Header/Header';
import {Spin} from 'antd'

export const Loading = () => (
    <>
        <AppHeader />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding:'50px' }}>
            <Spin 
                indicator={
                    <SettingFilled 
                        style={{
                            fontSize: 50,
                            color: "#00529b"
                        }}
                    spin />
                }
            />
        </div>
    </> 
)