import React from 'react';
import { Link, usePage } from '@inertiajs/react'

export const AdminSidebar = () => {
    const { url, component } = usePage()
    return (
        <>
            <aside className="w-64 bg-gray-800 text-white p-4">
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/dashboard" className={url === "/dashboard" ?  "block px-4 py-2 rounded bg-gray-700 hover:bg-gray-700":"block px-4 py-2 rounded hover:bg-gray-700"} >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/customer" className={url === "/customer" ?  "block px-4 py-2 rounded bg-gray-700 hover:bg-gray-700":"block px-4 py-2 rounded hover:bg-gray-700"} >
                                Customer
                            </Link>
                           
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}