import React from 'react';
import { AdminLayout } from '../Layout/AdminLayout.jsx';
const Customer = () => {
    return (
        <AdminLayout>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Customer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Cards */}
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="text-lg font-semibold">Card 1</h3>
                        <p className="text-gray-600">This is a description.</p>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="text-lg font-semibold">Card 2</h3>
                        <p className="text-gray-600">This is a description.</p>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="text-lg font-semibold">Card 3</h3>
                        <p className="text-gray-600">This is a description.</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
export default Customer;