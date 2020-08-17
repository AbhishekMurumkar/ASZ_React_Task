import React, { useState } from 'react';
import { Modal } from 'antd';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import './CustModal.css';

const CustModal = (props) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    let resp = props.inputFields;
    
    const handleOk = () => {
        setConfirmLoading(true);
        let res = {
            type: props.active,
            resp
        }
        setTimeout(() => {
            setConfirmLoading(false);
            props.inputData(res);
            props.hide();
        }, 2000);
    };

    const changeHandler = (event) => {
        resp[event.target.name].value = event.target.value;
    }
    
    return (
        <>
            <Modal
                title="Create New User"
                visible={props.show}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={props.hide}
            >
                {
                    Object.keys(resp).map((item, index) => {
                        return (
                            <TextField
                                key={index}
                                label={`${item}:`}
                                name={item}
                                required
                                onChange={changeHandler}
                                autoComplete="off"
                                placeholder={resp[item].placeholder}
                                className="CustModalInput"
                            />
                        )
                    })
                }
            </Modal>
        </>
    );
}

export default CustModal;