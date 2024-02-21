import React from 'react';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen">
            <div className="py-4 px-6">
                <h2 className="text-2xl font-semibold">Sidebar</h2>
            </div>
            <nav>
                <ul className="space-y-2 mt-6">
                    <li>
                        <a
                            href="/"
                            className="block py-2 px-4 hover:bg-gray-700 transition duration-200"
                        >
                            Role
                        </a>
                    </li>
                    <li>
                        <a
                            href="/new-role"
                            className="block py-2 px-4 hover:bg-gray-700 transition duration-200"
                        >
                            New Role
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
