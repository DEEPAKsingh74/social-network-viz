import { useRef, useEffect } from 'react';
import { Network, type Edge, type Node, type Options } from 'vis-network/standalone/esm/vis-network';

interface NetworkGraphProps {
    nodes: Node[],
    edges: Edge[],
    options: Options
}


const NetworkGraph = ({ nodes, edges, options }: NetworkGraphProps) => {
    const containerRef = useRef(null);
    const networkRef = useRef<Network | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            const data = { nodes, edges };
            networkRef.current = new Network(containerRef.current, data, options);
        }

        return () => {
            if (networkRef.current) {
                networkRef.current.destroy();
            }
        };
    }, [nodes, edges, options]);


    return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default NetworkGraph;
