import { Autocomplete, AutocompleteProps, Button, Select, TextInput } from "@mantine/core";
import axios from "axios";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { ToastContentProps, toast } from "react-toastify";
import { TbPlus } from "react-icons/tb";

const schema = yup.object({
    name: yup.string().required("Role Name is required"),
    parentId: yup.string().required("Parent ID is required"),
    description: yup.string().required("Role Description is required"),
}).required()


const roleToOptionFormatter = (roles: { id: number; name: string; description: string }[]) => {
    const updatedRoles: any = roles.map((role: { id: number; name: string; description: string }) => ({
        value: role.id.toString(),
        label: role.name,
    }));

    return updatedRoles;
};

export default function NewRole() {
    const navigate = useNavigate()
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit: any = (data: any) => {
        console.log(data)
        return axios.post("http://localhost:3000/role", data)
            .then(() => {
                toast.success("New Role Added Successfully!");
                navigate('/')
            })
            .catch(({ response: { data } }) => {
                console.log(data)
                if (data.statusCode === 409) toast.error(data.message)
            });
    };

    const [roles, setRoles] = useState<any>([]);




    useEffect(() => {
        axios.get("http://localhost:3000/role").then(({ data }) => {
            setRoles(roleToOptionFormatter(data));
        }).catch(() => { toast.error("Failed To fetch Roles") });
    }, []);

    return (
        <div className="mt-10 ml-10">
            <header className="py-4 px-3 h-20 bg-white text-2xl flex items-center font-bold mb-10 gap-x-4"><TbPlus size={30} /> Add a New  Employe Roles for Perago</header>

            <form onSubmit={handleSubmit(onSubmit)
            } className="flex flex-col mx-8 gap-y-3 p-4 border w-1/3 mt-8 shadow bg-white">
                <h2 className="px-5 py-1.5 border-b mb-4 text-xl font-semibold">Role</h2>
                <div className="flex flex-col mx-8 gap-y-3 w-full">
                    <TextInput
                        label="Role Name"
                        placeholder="CEO"
                        {...register("name")} // Updated field name for role name
                        className="w-4/5"
                        error={errors.name?.message}

                    />
                    <TextInput
                        label="Description"
                        placeholder="Chief Executive Officer"
                        {...register("description")} // Updated field name for description
                        className="w-4/5"
                        error={errors.description?.message}
                    />



                    <Controller
                        name="parentId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                label="Reports to"
                                placeholder="Pick a role to report to..."
                                data={roles}
                                value={field.value}
                                onChange={(selected) => field.onChange(selected)}
                                className="w-4/5"
                                error={errors.parentId && <p>{errors.parentId.message}</p>}
                            />
                        )}
                    />

                    <Button
                        variant="filled"
                        color="blue"
                        classNames={{ root: "bg-blue-500 w-1/5 self-end mr-24 mt-4" }}
                        type="submit" // Add type attribute for the submit button
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}
