import React, { useState } from 'react';

const EditModal = ({ isOpen, closeModal,FuncCall, title, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-2/5 p-6 relative">
                        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                        <form onSubmit={FuncCall}>
                            <div className="mb-6">{children}</div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 mx-2"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditModal;
