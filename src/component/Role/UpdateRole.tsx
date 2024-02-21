import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Select, TextInput } from "@mantine/core";
import roleToOptionFormatter from "../../utils/roleToOptionFormatter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { hideEdit, toggleEdit } from "../../state/roleEditSlice";
import * as yup from 'yup'


const UpdateRole = ({ id }: {
    id: string
}) => {
    const [isRoot, setIsRoot] = useState<any>(null)

    const schema = yup.object().shape({
        name: yup.string().required("Role Name is required"),
        description: yup.string().required("Role Description is required"),
        parentId: !isRoot
            ? yup.string().required("Parent ID is required")
            : yup.string(),
    }).required();


    const disptch = useDispatch()
    const edit = useSelector((state: RootState) => state.roleEditState.edit)

    const [role, setRole] = useState<any>();
    const [roles, setRoles] = useState<any>([]);
    const { control, register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema),

    });


    useEffect(() => {
        axios.get(`http://localhost:3000/role/isRoot/${Number(id)}`).then(({ data }: any) => {
            setIsRoot(data)
        })
    }, [id])

    const onSubmit: any = (data: any) => {
        axios
            .patch(`http://localhost:3000/role/${id}`, data)
            .then(() => {
                toast.success("Successfully edited");
                disptch(toggleEdit);
            })
            .catch((error) => {
                toast.error("Error editing role");
                console.error("Error editing role:", error);
            });
    };

    useEffect(() => {
        if (Number(id)) {
            axios.get(`http://localhost:3000/role/${Number(id)}`).then(({ data }) => {
                setRole(data);
            }).catch(({ response: { data } }) => {
                console.log(data)
                if (data.statusCode === 409) toast.error(data.message)
            });
        }
    }, [id]);

    useEffect(() => {
        axios.get("http://localhost:3000/role").then(({ data }) => {
            setRoles(roleToOptionFormatter(data));
        }).catch(() => { toast.error("Failed to fetch Roles") });
    }, []);



    if (!edit) return null
    return (

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3 p-4 border w-full mt-8 shadow bg-white">
            <h2 className="px-5 py-1.5 border-b mb-4 text-xl font-semibold">Update Roles</h2>
            <div className="flex flex-col mx-8 gap-y-3 w-1/3">
                <TextInput
                    label="Role Name"
                    placeholder="CEO"
                    {...register("name")}
                    defaultValue={role?.name}
                    className="w-4/5"
                    error={errors?.name?.message}
                />
                <TextInput
                    label="Description"
                    placeholder="Chief Executive Officer"
                    {...register("description")}
                    className="w-4/5"
                    defaultValue={role?.description}
                    error={errors?.description?.message}

                />

                {!isRoot ? <Controller
                    name="parentId"
                    control={control}
                    defaultValue={roles.find((singleRole: any) => Number(singleRole?.value) === role?.parent_id)?.value}
                    render={({ field }) => (
                        <Select
                            label="Reports to"
                            placeholder="Pick a role to report to..."
                            data={roles}
                            value={field.value}
                            onChange={(selected) => {
                                console.log(selected)
                                return field.onChange(selected)
                            }}
                            className="w-4/5"
                            error={errors?.parentId && <p>{errors?.parentId.message}</p>}
                        />
                    )}
                />
                    : null}

                <div className="flex items-center justify-end ">
                    <Button
                        variant="filled"
                        color="red"
                        classNames={{ root: "bg-red-500 self-end mr-4 mt-4" }}
                        type="button"
                        onClick={() => disptch(hideEdit())}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="filled"
                        color="blue"
                        classNames={{ root: "bg-blue-500 self-end mr-24 mt-4" }}
                        type="submit"
                    >
                        Update
                    </Button>
                </div>
            </div>
        </form>

    )
}

export default UpdateRole