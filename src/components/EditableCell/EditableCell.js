import React from 'react';
import { Checkbox, DatePicker, Form, Input, InputNumber, Select } from 'antd';

export const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'date' 
                      ? <DatePicker /> 
                      : ( inputType === 'number' 
                      ? <InputNumber style={{ width: 45 }}/> 
                      : ( inputType === 'checkbox' 
                      ?  <Checkbox />
                      : <Select />));
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            // rules={[
            //   {
            //     required: true,
            //     message: `Por favor, introduce ${title}`,
            //   },
            // ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
};