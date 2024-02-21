import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { toggleEdit } from "../../state/roleEditSlice";

const RoleDetail = ({ id }: { id: any }) => {

    const dispatch = useDispatch();
    const edit = useSelector((state: RootState) => state.roleEditState.edit)

    const [role, setRole] = useState<any>([]);
    useEffect(() => {
        if (Number(id)) {
            axios.get(`http://localhost:3000/role/${Number(id)}`).then(({ data }) => {
                setRole(data);
            }).catch(err => toast.error("Something Went Wrong"));
        }
    }, [id]);
    let { name, description } = role


    const handleDelete = () => {
        setShowDeleteModal(true);
    };


    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false);



    const performDelete = () => {
        axios.delete(`http://localhost:3000/role/${id}`).then(() => {
            toast.success("Role Successfully deleted");
            navigate("/");
        }).catch(({ response: { data } }) => {
            if (data.statusCode === 409) toast.error(data.message)
        });;
    };

    return (
        <div className="p-4 rounded bg-white ">
            <h1 className="text-xl font-semibold mb-4">Role Detail</h1>
            <div className="mb-2">
                <span className="font-semibold">Name:</span> {name}
            </div>
            <div className="mb-4">
                <span className="font-semibold">Description:</span> {description}
            </div>
            {!edit && <div className="flex justify-end">
                <button
                    onClick={() => dispatch(toggleEdit())}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete
                </button>


                {/* Confirmation dialog */}
                {showDeleteModal && (
                    <Modal
                        opened={showDeleteModal}
                        size="xl"
                        onClose={() => setShowDeleteModal(false)}
                        title="Confirmation"
                        centered

                    >
                        <div>
                            {role.children && role.children.length > 0
                                ? <p className="text-red-700">You can not delete a role that has childrens. Please Delete childrens first</p>
                                : <p>Are you sure you want to delete this role</p>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '20px' }} className={"flex items-center justify-end"} >
                            {(!role.children || role.children.length === 0) && <Button color="red" onClick={performDelete} variant="filled"
                                classNames={{ root: "bg-red-500 self-end" }}>
                                Delete
                            </Button>}
                            <Button onClick={() => setShowDeleteModal(false)} style={{ marginLeft: '10px' }} variant="filled"
                                color="blue"
                                classNames={{ root: "bg-blue-500 self-end" }}>
                                {role.children && role.children.length > 0 ? 'Okay' : 'Cancel'}
                            </Button>
                        </div>
                    </Modal>
                )}
            </div>}
        </div>
    );
};


export default RoleDetail