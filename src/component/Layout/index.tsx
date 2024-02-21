import Sidebar from "../Sidebar"

const Layout = ({ children }: any) => {
    return (
        <div className="flex h-full w-full">
            <Sidebar />
            <div className="flex flex-col w-full ">
                <div className="h-16 bg-blue-500 w-full flex items-center justify-center font-semibold text-2xl">Employee Role Management</div>
                <main className=" bg-gray-200 flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout