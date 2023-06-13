import React from 'react'
import StudentList from '../pages/StudentList'
import { Route, Routes } from 'react-router-dom'
import StudentAdd from '../pages/StudentAdd'
import { ToastContainer } from 'react-toastify'

export default function Dashboard() {
    return (
        <div>
            <ToastContainer position='bottom-right' />
            <Routes>
                <Route exact path='/' Component={StudentAdd} />
                <Route exact path='/list' Component={StudentList} />
            </Routes>
        </div>
    )
}
