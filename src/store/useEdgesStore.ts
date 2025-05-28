import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Edge } from "vis-network";

interface EdgeList {
    edges: Edge[];
    addEdge: (edge: Edge) => void;
    removeEdge: (id: Edge["id"]) => void;
    isFollowing: (from: number, to: number) => boolean;
    clearEdges: () => void;
}

export const useEdgesStore = create<EdgeList>()(
    persist(
        (set, get) => ({
            edges: [],
            addEdge: (edge) =>
                set((state) => {
                    if (!edge.id) {
                        console.warn("Missing edge ID:", edge);
                    }
                    const exists = state.edges.some((e) => e.id === edge.id);
                    if (exists) return state;
                    return { edges: [...state.edges, edge] };
                }),
            isFollowing: (from, to) =>
                get().edges.some((edge) => edge.from === from && edge.to === to),
            removeEdge: (id) =>
                set((state) => ({
                    edges: state.edges.filter((edge) => edge.id !== id),
                })),
            clearEdges: () => set({ edges: [] }),
        }),
        {
            name: "edges-list-store",
        }
    )
);
