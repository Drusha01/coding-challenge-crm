import { Link } from '@inertiajs/react'
import React from 'react';
import { AdminHeader } from '../Components/AdminHeader.jsx';
import { AdminSidebar } from '../Components/AdminSidebar.jsx';
export const AdminLayout = ({children}) => {
  return (
    <>
        <div className="min-h-screen flex flex-col">
            <AdminHeader/>
            <div className="flex flex-1">
                <AdminSidebar/>
                <main className="flex-1 p-6 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    </>
  )
}