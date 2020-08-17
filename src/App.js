import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Space } from 'antd';
import { DefaultButton } from 'office-ui-fabric-react';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import './App.css'
import * as Main from './lang/main';
import Modal from './Components/Modal/CustModal';

const App = () => {
  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <span className="AppNameColor">{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: text => <span className="AppNameColor">{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <span className="AppRowActionColor" onClick={(e) => { deleteUser(record.key, e) }} data-id={record.key}>Delete</span>
        </Space>
      ),
    }
  ];

  const todoColumns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action'
    },
    {
      title: 'DateAdded',
      key: 'dateAdded',
      dataIndex: 'dateAdded'
    }
  ];

  const dispatch = useDispatch();
  const usersList = useSelector(state => state.usersList);
  const todoList = useSelector(state => state.todoList);
  const [activeTab, setActiveTab] = useState('Todo');
  const [showModal, setShowModal] = useState(false);
  const [showModalFields, setShowModalFields] = useState('');

  const addTodo = (data) => dispatch({ type: 'Add_NEW_TODO', newTodo: data });
  const addUser = (data) => dispatch({ type: 'Add_NEW_USER', newUser: data });
  const updateUsers = (data) => dispatch({ type: 'UPDATE_USER', Users: data });

  const handleResponse = (respData) => {
    if (respData.type === "Users") {
      let temp = {
        key: Math.floor(Math.random() * (1000000 - 1 + 1) + 1),
        name: respData.resp.Name.value,
        email: respData.resp.Email.value
      }
      addUser(temp);
      setShowModalFields('');
    }
    else if (respData.type === "Todo") {
      let temp = {
        key: Math.floor(Math.random() * (100000000000 - 1 + 1) + 1),
        action: respData.resp.ToDo.value,
        dateAdded: new Date().toLocaleString()
      }
      console.log(temp);
      addTodo(temp);
      setShowModalFields('');
    }
    else {
      //...
    }
  }

  const deleteUser = (key, event) => {
    console.log(key);
    let data = usersList.filter(item => item.key !== key);
    updateUsers(data);
  }

  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Todos" key="1">
          <p className="AppUser">
            <DefaultButton
              text="Create Todo"
              onClick={() => {
                setActiveTab('Todo');
                setShowModal(true);
                setShowModalFields(Main.todoInputFields);
              }}
              className="AppUserBtn"
            />
          </p>
          <Table columns={todoColumns} dataSource={todoList} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <p className="AppUser">
            <DefaultButton
              text="Create User"
              onClick={() => {
                setActiveTab('Users');
                setShowModal(true);
                setShowModalFields(Main.userInputFields);
              }}
              className="AppUserBtn"
            />
          </p>
          <Table columns={userColumns} dataSource={usersList} />
        </Tabs.TabPane>
      </Tabs>
      <Modal
        show={showModal}
        active={activeTab}
        hide={() => setShowModal(false)}
        inputFields={showModalFields}
        inputData={(respData) => handleResponse(respData)}
      />
    </div>
  );
}

export default App;
