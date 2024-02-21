import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store';
import { toggleNodeExpansion } from '../../state/treeSlice';
import { MdOutlineCircle } from 'react-icons/md'

interface TreeNodeProps {
    node: TreeNodeData;
}

export interface TreeNodeData {
    id: number
    name: string;
    children: TreeNodeData[];
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
    const router = useNavigate()
    const dispatch = useDispatch();

    // Access the expanded state from Redux using useSelector
    const collapsed = useSelector<RootState, boolean>((state) => state.treeState[node.id] || false);


    const toggleExpand = () => {
        // Dispatch the toggleNodeExpansion action with the node ID
        dispatch(toggleNodeExpansion(node.id));
    };

    const handleNodeClick = (id: number) => {
        router(`/role/${id}`)
    };

    return (
        <div className="pl-2 relative">
            <div className="flex items-center gap-x-2" >
                {node.children.length > 0 ? (
                    <span onClick={toggleExpand}>
                        {collapsed ? <AiOutlinePlusSquare /> : <AiOutlineMinusSquare />}
                    </span>
                ) : <MdOutlineCircle />}
                <span onClick={() => handleNodeClick(node.id)} className="cursor-pointer bg-white mb-2 py-1 px-3 w-[300px] border shadow text-sm font-semibold flex items-center gap-x-8">{node.name}{node.children.length > 0 && <span className="font-normal bg-green-400 text-white px-3 py-0.5 rounded-md">{node.children.length}</span>}</span>
            </div>
            {!collapsed && (
                <div className="pl-8">
                    {node.children.map((childNode, index) => (
                        <div key={index}>
                            <div className="absolute left-3.5 top-7 bottom-0 w-0.5 bg-gray-400"></div>
                            <TreeNode node={childNode} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

interface TreeProps {
    data: TreeNodeData;
}

const Tree: React.FC<TreeProps> = ({ data }) => {
    return (
        <div>
            <TreeNode node={data} />
        </div>
    );
};

export default Tree;


