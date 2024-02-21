import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Button } from "@mantine/core";
import { IoMdArrowBack } from "react-icons/io";
import RoleDetail from "../component/Role/RoleDetail";
import UpdateRole from "../component/Role/UpdateRole";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { hideEdit } from "../state/roleEditSlice";




export default function Role() {
    const edit = useSelector((state: RootState) => state.roleEditState.edit)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();


    return (
        <div className="p-4">
            <header className="py-4 px-3 h-20 bg-white text-2xl flex items-center justify-between font-bold mb-10 gap-x-4">
                <div className="flex items-center gap-x-3">
                    <Button
                        color="blue"
                        size="xs"
                        leftIcon={<IoMdArrowBack />}
                        className="bg-blue-600"
                        onClick={() => {
                            navigate(-1);
                            dispatch(hideEdit())
                        }}
                    >
                        Back
                    </Button> Employe Roles Detail
                </div>
                {edit && "Editing...."}

            </header>
            {!edit && <RoleDetail id={id} />}
            <UpdateRole id={id as string} />
        </div>
    );
}



