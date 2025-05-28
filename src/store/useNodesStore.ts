import type { Node } from "vis-network";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NodesList {
    nodes: Node[];
    addNode: (node: Node) => void;
    removeNode: (id: Node["id"]) => void;
    updateNode: (node: Node) => void;
    colorClosestNodes: (ids: Node["id"][]) => void;
    resetNodeColors: () => void;
    clearNodes: () => void;
}

export const useNodesStore = create<NodesList>()(
    persist(
        (set) => ({
            nodes: [],
            addNode: (node) =>
                set((state) => {
                    const exists = state.nodes.some((n) => n.id === node.id);
                    if (exists) return state; // avoid duplicates
                    return { nodes: [...state.nodes, node] };
                }),

            removeNode: (id) =>
                set((state) => ({
                    nodes: state.nodes.filter((node) => node.id !== id),
                })),

            updateNode: (updatedNode) =>
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === updatedNode.id ? { ...node, ...updatedNode } : node
                    ),
                })),

            colorClosestNodes: (ids) =>
                set((state) => {
                    const idSet = new Set(ids);
                    return {
                        nodes: state.nodes.map((node) =>
                            idSet.has(node.id)
                                ? {
                                    ...node,
                                    color: {
                                        background: 'green',
                                        border: 'darkgreen',
                                        highlight: {
                                            background: 'lightgreen',
                                            border: 'green',
                                        },
                                    },
                                }
                                : node
                        ),
                    };
                }),

            resetNodeColors: () =>
                set((state) => ({
                    nodes: state.nodes.map((node) => ({
                        ...node,
                        color: undefined, // or set to default if needed
                    })),
                })),



            clearNodes: () => set({ nodes: [] }),
        }),
        {
            name: "nodes-list-store",
        }
    )
);



/**
 * 
 * {
  id: string | number,       // Required: Unique identifier for the node
  label?: string,            // Text label shown on the node
  title?: string,            // Tooltip text (on hover)
  group?: string,            // Group name (for styling multiple nodes at once)
  x?: number,                // Initial x-position
  y?: number,                // Initial y-position
  physics?: boolean,         // Whether physics engine affects the node
  hidden?: boolean,          // Hide the node
  shape?: string,            // Node shape (see below)
  size?: number,             // Node size (default is 25)
  color?: string | Object,   // Node color (can be an object)
  borderWidth?: number,      // Width of node border
  borderWidthSelected?: number, // Border width when selected
  font?: Object,             // Font settings (see below)
  image?: string,            // URL for image (used with 'image' shape)
  brokenImage?: string,      // Fallback image if image fails
  shapeProperties?: Object,  // Shape customization (e.g., borderRadius)
  scaling?: Object,          // For size scaling
  shadow?: boolean | Object, // Shadow effect
  icon?: Object              // Font Awesome or custom icons
}

 */