import React, { useState,useEffect  } from 'react';
import { AdminLayout } from '../../Layout/AdminLayout.jsx';
import AddModal from '../../Components/Modals/AddModal';
import EditModal from '../../Components/Modals/EditModal';
import DeleteModal from '../../Components/Modals/DeleteModal';
import ViewModal from '../../Components/Modals/ViewModal';
import axios from 'axios';
const Customer = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    const [content,setContent] = useState({
        data:[],
        total:0,
        page:1,
        rows:10,
        search:"",
    });
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);
    const closeEditModal = () => setIsEditModalOpen(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const [customer, setCustomer] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact_number: ''
    });

    const handleFilterChange = (e)=> {
        const { name, value } = e.target;
        setContent((prevContent) => ({
            ...prevContent,
            [name]: value
          }));
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [name]: value
        });
    };
    useEffect(() => {
        GetData();
    }, [content.rows]);
    useEffect(() => {
        GetData();
    }, [content.search]);

    const GetData = ()=>{
        axios.post( "api/customer/all" , {  
            rows: content.rows,
            search: content.search,
            page: content.page,
        })
        .then(res => {
            setContent((prevContent) => ({
                ...prevContent,
                data: res.data.data,
                total:res.data.total,
              }));
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach(field => {
                    Swal.close();
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: `${validationErrors[field].join(', ')}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
          })
    }

    const ClearData = () => {
        setCustomer({
            ...customer,
            first_name: '',
            last_name: '',
            email: '',
            contact_number: ''
        });
        openAddModal();
    }
    const HandleAddCustomer = (e) => {
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
              Swal.showLoading();
            },
        });
        axios.post( "api/customer/add" , {  
        first_name: customer.first_name,
        last_name: customer.last_name,
        email:customer.email,
        contact_number:customer.contact_number,
        })
        .then(res => {
        const obj = JSON.parse(res.data)
        if (res.data = 1) {
            Swal.close();
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully added!",
            showConfirmButton: false,
            timer: 1000
            });
            closeAddModal();
            GetData();
            setCustomer({
            ...customer,
            first_name: '',
            last_name: '',
            email: '',
            contact_number: ''
        });
        } 
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
            const validationErrors = error.response.data.errors;
            Object.keys(validationErrors).forEach(field => {
            Swal.close();
            Swal.fire({
                position: "center",
                icon: "warning",
                title: `${validationErrors[field].join(', ')}`,
                showConfirmButton: false,
                timer: 1500
            });
            });
        } else {
            console.error('An error occurred:', error.response || error.message);
        }
        })
    }

    const HandleGetCustomer = (id,modalFunc)=>{
        axios.get( "api/customer/view/"+id )
          .then(res => {
              const customer = JSON.parse(res.data.customer)
              modalFunc();
              setCustomer({
                ...customer,
                id:customer.id,
                first_name: customer.first_name,
                last_name: customer.last_name,
                email: customer.email,
                contact_number: customer.contact_number
            });
          })
          .catch(function (error) {
              if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach(field => {
                Swal.close();
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: `${validationErrors[field].join(', ')}`,
                  showConfirmButton: false,
                  timer: 1500
                });
              });
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
          })
    }
    const HandleEditCustomer = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
              Swal.showLoading();
            },
        });
        axios.post( "api/customer/edit" , {  
        id: customer.id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        email:customer.email,
        contact_number:customer.contact_number,
        })
        .then(res => {
            const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully updated!",
                showConfirmButton: false,
                timer: 1000
                });
                closeEditModal();
                GetData();
            
            } 
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
            const validationErrors = error.response.data.errors;
            Object.keys(validationErrors).forEach(field => {
            Swal.close();
            Swal.fire({
                position: "center",
                icon: "warning",
                title: `${validationErrors[field].join(', ')}`,
                showConfirmButton: false,
                timer: 1500
            });
            });
        } else {
            console.error('An error occurred:', error.response || error.message);
        }
        })
    }
    const HandleDeleteCustomer = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
              Swal.showLoading();
            },
        });
        axios.post( "api/customer/delete" , {  
        id: customer.id,
        })
        .then(res => {
            const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully deleted!",
                showConfirmButton: false,
                timer: 1000
                });
                closeDeleteModal();
                GetData();
            } 
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach(field => {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: `${validationErrors[field].join(', ')}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                });
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
        })
    }
    return (
        <AdminLayout>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Customers</h2>
                <div className="p-6 bg-gray-100 h-auto">
                    <div className="flex justify-start">
                        <input type="text" name="search" id="search" className="rounded-lg w-1/5" placeholder="search ..."  value={content.search} onChange={handleFilterChange} />
                        <select name="rows" className="rounded-lg mx-2" id="rows" value={content.rows} onChange={handleFilterChange}>
                            <option value="10">10 rows</option>
                            <option value="30">30 rows</option>
                            <option value="50">50 rows</option>
                        </select>
                    </div>
                    <div className="flex justify-end my-2">
                        <button
                            onClick={() =>ClearData()}
                            className="bg-blue-700 text-white px-3.5 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                        Add
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full bg-white border border-gray-300 rounded shadow">
                            <thead className="bg-gray-200">
                                <tr className="">
                                    <th className="px-4 py-2 border-b text-start">#</th>
                                    <th className="px-4 py-2 border-b text-start">First Name</th>
                                    <th className="px-4 py-2 border-b text-start">Last Name</th>
                                    <th className="px-4 py-2 border-b text-start">Email Address</th>
                                    <th className="px-4 py-2 border-b text-start">Contact Number</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.data.map((row, index) => (
                                    <tr key={index} className="text-start">
                                        <td className="px-4 py-2 border-b">{index+1 + (content.page - 1) * content.rows}</td>
                                        <td className="px-4 py-2 border-b">{row.first_name}</td>
                                        <td className="px-4 py-2 border-b">{row.last_name}</td>
                                        <td className="px-4 py-2 border-b">{row.email}</td>
                                        <td className="px-4 py-2 border-b">{row.contact_number}</td>
                                        <td className="px-4 py-2 border-b gap-2 text-center">
                                            <button className="px-3 py-2 text-white bg-blue-700 rounded-lg mx-1" onClick={() => HandleGetCustomer(row.id,openViewModal)}>
                                                View
                                            </button>
                                            <button className="px-3 py-2 text-white bg-green-700 rounded-lg mx-1" onClick={() => HandleGetCustomer(row.id,openEditModal)}>
                                                Edit
                                            </button>
                                            <button className="px-3 py-2 text-white bg-red-700 rounded-lg mx-1" onClick={() => HandleGetCustomer(row.id,openDeleteModal)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center">

                        </div>
                    </div>
                </div>
                <AddModal isOpen={isAddModalOpen} closeModal={closeAddModal} FuncCall={HandleAddCustomer} title="Add customer">
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                            First Name <span className="text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={customer.first_name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter firstname"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                            Last Name <span className="text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={customer.last_name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter lastname"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-700">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={customer.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            id="contact_number"
                            name="contact_number"
                            value={customer.contact_number}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="09876543210"
                        />
                    </div>

                </AddModal>
                <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal} FuncCall={HandleEditCustomer} title="Edit customer">
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                            First Name <span className="text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={customer.first_name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter firstname"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                            Last Name <span className="text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={customer.last_name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter lastname"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-700">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={customer.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            id="contact_number"
                            name="contact_number"
                            value={customer.contact_number}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="09876543210"
                        />
                    </div>
                </EditModal>
                <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} FuncCall={HandleEditCustomer} title="View customer">
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                            First Name <span className="text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={customer.first_name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-200"
                            placeholder="Enter firstname"
                            required
                            disabled
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                            Last Name <span className="text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={customer.last_name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-200"
                              placeholder="Enter lastname"
                            required
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-700">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={customer.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-200"
                            placeholder="Enter email"
                            required
                            disabled
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            id="contact_number"
                            name="contact_number"
                            value={customer.contact_number}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-200"
                            placeholder="09876543210"
                            disabled
                        />
                    </div>
                </ViewModal>
                <DeleteModal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} FuncCall={HandleDeleteCustomer} title="Delete customer">
                    <div className="text-center mt-5 text-red-600">Are you sure you want to delete this?</div>
                </DeleteModal>

            </div>
        </AdminLayout>
    );
};
export default Customer;