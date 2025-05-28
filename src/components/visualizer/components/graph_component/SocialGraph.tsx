
import type { Options } from "vis-network";
import { useEdgesStore } from "../../../../store/useEdgesStore";
import { useNodesStore } from "../../../../store/useNodesStore";
import NetworkGraph from "./NetworkGraph";

const SocialGraph = () => {

    const { nodes } = useNodesStore();
    const { edges } = useEdgesStore();

    const options: Options = {
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 20,
                vadjust: 0,
                align: "center"
            },
            color: {
                background: "#007bff",
                border: "#0056b3"
            }
        },
        edges: {
            width: 2,
        },
        physics: {
            enabled: true,
        },
        layout: {
            improvedLayout: true,
        },
    };


    return (
        <div>

            <NetworkGraph
                nodes={nodes}
                edges={edges}
                options={options}
            />

        </div>
    )
}

export default SocialGraph